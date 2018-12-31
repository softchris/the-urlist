import ILink from "./ILink";
import cuid from "cuid";

export default class Link implements ILink {
  id = "";
  url = "";
  title = "";
  description = "";
  _image = "../images/no-image.png";

  get image() {
    return this._image;
  }

  set image(value: string) {
    if (value) {
      this._image = value;
    } else {
      this._image = "../images/no-image.png";
    }
  }

  constructor(url: string) {
    this.id = cuid();
    this.url = url;
  }
}
