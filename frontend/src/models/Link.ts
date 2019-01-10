import ILink from "./ILink";
import cuid from "cuid";

export default class Link implements ILink {
  id = "";
  url = "";
  title = "";
  description = "";
  image = "../images/no-image.png";

  constructor(
    url: string = "",
    title: string = "",
    description: string = "",
    image: string = ""
  ) {
    this.id = cuid();
    this.url = url;
    this.title = title || url;
    this.description = description;
    if (image.length > 0) {
      this.image = image;
    }
  }
}
