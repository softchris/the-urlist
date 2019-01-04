using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using OpenGraphNet;
using System.Net;
using System.Linq;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace LinkyLink
{
    public static partial class LinkOperations
    {
        [FunctionName(nameof(ValidatePage))]
        public static async Task<IActionResult> ValidatePage(
            [HttpTrigger(AuthorizationLevel.Function, "POST", Route = "validatePage")] HttpRequest req,
            ILogger log)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

            dynamic data = JsonConvert.DeserializeObject(requestBody);
            if (data is JArray)
            {
                // expecting a JSON array of objects with url(string), id(string)
                try
                {
                    IEnumerable<OpenGraphResult> result = await GetMultipleGraphResults(data);
                    return new OkObjectResult(result);
                }
                catch { }
            }
            else if (data is JObject)
            {
                // expecting a JSON object with url(string), id(string)
                try
                {
                    OpenGraphResult result = await GetGraphResult(data);
                    return new OkObjectResult(result);
                }
                catch (WebException ex)
                {
                    ProblemDetails problemDetails = new ProblemDetails
                    {
                        Title = "Could not validate link",
                        Detail = ex.Message,
                        Status = StatusCodes.Status400BadRequest,
                        Type = "/linkylink/clientissue",
                        Instance = req.Path
                    };
                    return new BadRequestObjectResult(problemDetails);
                }
            }
            //TOOD: this is temporary
            return new BadRequestResult();
        }

        public static async Task<OpenGraphResult> GetGraphResult(dynamic singleLinkItem)
        {
            string url = singleLinkItem.url, id = singleLinkItem.id;
            if (!string.IsNullOrEmpty(url) && !string.IsNullOrEmpty(id))
            {
                try
                {
                    var uriLink = new Uri(url,);
                    OpenGraph graph = await OpenGraph.ParseUrlAsync(uriLink);
                    return new OpenGraphResult(id, graph);
                }
                catch (Exception ex)
                {
                    return new OpenGraphResult { Id = id };
                }
            }
            return null;
        }

        public static async Task<IEnumerable<OpenGraphResult>> GetMultipleGraphResults(dynamic multiLinkItem)
        {
            IEnumerable<OpenGraphResult> allResults =
                await Task.WhenAll((multiLinkItem as JArray).Select(item => GetGraphResult(item)));

            return allResults;
        }
    }
}
