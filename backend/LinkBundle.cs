using System.Collections.Generic;
using Newtonsoft.Json;

namespace LinkyLink
{
    public class LinkBundle
    {
        public LinkBundle(string userId, string vanityUrl, IDictionary<string, string>[] links)
        {
            this.UserId = userId;
            this.VanityUrl = vanityUrl;
            this.Links = links;
        }

        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("vanityUrl")]
        public string VanityUrl { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("links")]
        public IDictionary<string, string>[]  Links { get; set; }
    }
}