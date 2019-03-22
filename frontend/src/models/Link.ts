import ILink from "./ILink";
import cuid from "cuid";

export default class Link implements ILink {
  id = "";
  _image: string = "";

  get image() {
    return this._image;
  }

  set image(value: string) {
    this._image = value.replace(/(^\w+:|^)/, "") || "";
  }

  constructor(
    public url: string = "",
    public title: string = "",
    public description: string = "",
    image: string = ""
  ) {
    this.id = cuid();
    this.image = image;
  }
}
