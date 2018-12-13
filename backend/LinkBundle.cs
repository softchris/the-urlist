namespace LinkyLink
{
    public class LinkBundle
    {
        public LinkBundle(string vanityName, string[] links)
        {
            this.VanityName = vanityName;
            this.Links = links;
        }


        public string VanityName { get; private set; }
        public string[] Links { get; private set; }
    }
}