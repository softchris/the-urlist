import ILink from "./ILink";

export default class IList {
  vanityUrl: string = "";
  description: string = "";
  links: Array<ILink> = [];
  editable: boolean = false;

  constructor(editable: boolean) {
    this.editable = editable;
  }
}
