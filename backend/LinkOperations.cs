using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace LinkyLink
{
    public static partial class LinkOperations
    {
        [FunctionName("SaveLinks")]
        public static async Task<IActionResult> SaveLinks(
            [HttpTrigger(AuthorizationLevel.Function, "POST", Route = "links")] HttpRequest req,
            [CosmosDB(
                databaseName: "linkylinkdb",
                collectionName: "linkbundles",
                ConnectionStringSetting = "LinkLinkConnection"
            )] IAsyncCollector<LinkBundle> documents,
            ILogger log)
        {

            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var linkDocument = JsonConvert.DeserializeObject<LinkBundle>(requestBody);

                if (!ValidatePayLoad(linkDocument, req, out ValidationProblemDetails problems))
                {
                    return new BadRequestObjectResult(problems);
                }

                await documents.AddAsync(linkDocument);

                return new OkResult();
            }
            catch (Exception ex)
            {
                //log this exception
                return new BadRequestResult();
            }

        }

        private static bool ValidatePayLoad(LinkBundle linkDocument, HttpRequest req, out ValidationProblemDetails problems)
        {
            bool isValid = linkDocument.Links?.Length > 0;
            problems = null;

            if (!isValid)
            {
                problems = new ValidationProblemDetails()
                {
                    Title = "Payload is invalid",
                    Type = "/linkylink/schema",
                    Detail = "No links provided",
                    Status = StatusCodes.Status400BadRequest,
                    Instance = req.Path
                };
            }
            return isValid;
        }
    }
}
