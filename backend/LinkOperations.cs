using LinkyLink.Infrastructure;
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DataContracts;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.AspNetCore.Http;

namespace LinkyLink
{
    public static partial class LinkOperations
    {
        public static TelemetryClient telemetryClient;
        static LinkOperations()
        {
            TelemetryConfiguration telemetryConfiguration = TelemetryConfiguration.CreateDefault();
            telemetryConfiguration.TelemetryInitializers.Add(new HeaderTelemetryInitializer());
            telemetryClient = new TelemetryClient(telemetryConfiguration);
        }


        public static void TrackRequestHeaders(HttpRequest req, string requestName)
        {
            var reqTelemetry = new RequestTelemetry() { Name = requestName };
            foreach (var kvp in req.Headers)
            {
                reqTelemetry.Properties.Add($"header-{kvp.Key}", kvp.Value.ToString());
            }
            telemetryClient.TrackRequest(reqTelemetry);
        }
    }
}