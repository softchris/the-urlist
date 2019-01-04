using System.Linq;
using Newtonsoft.Json;
using OpenGraphNet;

namespace LinkyLink
{
    public class OpenGraphResult
    {
        public OpenGraphResult() { }

        public OpenGraphResult(string id, OpenGraph graph)
        {
            Id = id;
            Title = graph.Title;
            Description = graph.Metadata["og:description"].FirstOrDefault()?.Value;
            Image = graph.Metadata["og:image"].FirstOrDefault()?.Value;
        }

        [JsonProperty("id", NullValueHandling = NullValueHandling.Ignore)]
        public string Id { get; set; }

        [JsonProperty("title", NullValueHandling = NullValueHandling.Ignore)]
        public string Title { get; set; }

        [JsonProperty("description", NullValueHandling = NullValueHandling.Ignore)]
        public string Description { get; set; }

        [JsonProperty("image", NullValueHandling = NullValueHandling.Ignore)]
        public string Image { get; set; }
    }
}