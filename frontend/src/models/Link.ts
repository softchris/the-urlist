import ILink from "./ILink";
import cuid from "cuid";

export default class Link implements ILink {
  id = "";

  constructor(
    public url: string = "",
    public title: string = "",
    public description: string = "",
    public image: string = ""
  ) {
    this.id = cuid();
    this.image = image;
  }
}
