using Newtonsoft.Json;

namespace LinkyLink
{
    public class LinkBundle
    {
        public LinkBundle(string user, string vanityUrl, string[] links)
        {
            this.User = user;
            this.VanityUrl = vanityUrl;
            this.Links = links;
        }

        public string User { get; } //TODO: handle users later

        [JsonProperty("vanityUrl")]
        public string VanityUrl { get; }

        [JsonProperty("links")]
        public string[] Links { get; }
    }
}