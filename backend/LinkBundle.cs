using Newtonsoft.Json;

namespace LinkyLink
{
    public class LinkBundle
    {
        public LinkBundle(string userId, string vanityUrl, string[] links)
        {
            this.UserId = userId;
            this.VanityUrl = vanityUrl;
            this.Links = links;
        }

        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("vanityUrl")]
        public string VanityUrl { get; set; }

        [JsonProperty("links")]
        public string[] Links { get; }
    }
}