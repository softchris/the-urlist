import ILink from "./ILink";

export default interface IList {
  vanityUrl: string;
  description: string;
  links: Array<ILink>;
}
