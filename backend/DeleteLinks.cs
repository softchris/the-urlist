using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DataContracts;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using System;
using System.Threading.Tasks;
using System.IO;
using Newtonsoft.Json;
using Microsoft.Azure.Documents.Linq;

namespace LinkyLink
{
    public static partial class LinkOperations
    {
        [FunctionName(nameof(DeleteLink))]
        public static async Task<IActionResult> DeleteLink(
            [HttpTrigger(AuthorizationLevel.Function, "DELETE", Route = "links/{vanityUrl}")] HttpRequest req,
            [CosmosDB(
                databaseName: "linkylinkdb",
                collectionName: "linkbundles",
                ConnectionStringSetting = "LinkLinkConnection",
                SqlQuery = "SELECT * FROM linkbundles lb WHERE lb.vanityUrl = {vanityUrl}"
            )] IEnumerable<Document> documents,
            [CosmosDB(ConnectionStringSetting = "LinkLinkConnection")] DocumentClient docClient,
            string vanityUrl,
            ILogger log)
        {
            if (!documents.Any())
            {
                log.LogInformation($"Bundle for {vanityUrl} not found.");
                return new NotFoundResult();
            }

            Document doc = documents.Single();
            RequestOptions reqOptions = new RequestOptions { PartitionKey = new PartitionKey(vanityUrl) };

            try
            {
                await docClient.DeleteDocumentAsync(doc.SelfLink, reqOptions);
            }
            catch (Exception ex)
            {
                log.LogError(ex, ex.Message);
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
            return new NoContentResult();
        }

        [FunctionName(nameof(DeleteLinks))]
        public static async Task<IActionResult> DeleteLinks(
           [HttpTrigger(AuthorizationLevel.Function, "DELETE", Route = "links")] HttpRequest req,
           [CosmosDB(ConnectionStringSetting = "LinkLinkConnection")] DocumentClient docClient,
           ILogger log)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            IEnumerable<string> vanityUrls = JsonConvert.DeserializeObject<IEnumerable<string>>(requestBody);

            string queryValues = string.Join(",", vanityUrls.Select(url => $"\"{url}\""));
            string sql = $"SELECT c._self, c.vanityUrl from c WHERE c.vanityUrl IN ({queryValues}) ";

            try
            {
                FeedOptions feedOpts = new FeedOptions { EnableCrossPartitionQuery = true };
                Uri collUri = UriFactory.CreateDocumentCollectionUri("linkylinkdb", "linkbundles");
                var docQuery = docClient.CreateDocumentQuery(collUri, sql, feedOpts).AsDocumentQuery();

                while (docQuery.HasMoreResults)
                {
                    var docs = await docQuery.ExecuteNextAsync();
                    foreach (var doc in docs)
                    {
                        RequestOptions reqOptions = new RequestOptions { PartitionKey = new PartitionKey(doc.vanityUrl) };
                        await docClient.DeleteDocumentAsync(doc._self, reqOptions);
                    }
                }
            }
            catch (Exception ex)
            {
                log.LogError(ex, ex.Message);
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
            return new NoContentResult();
        }
    }
}