import ILink from "./ILink";
import Array from "../shared/Array";

export default class IList {
  vanityUrl: string = "";
  description: string = "";
  links: Array<ILink> = new Array();
  editable: boolean = false;

  constructor(editable: boolean) {
    this.editable = editable;
  }
}
