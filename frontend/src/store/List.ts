import {
  Module,
  Mutation,
  Action,
  MutationAction,
  VuexModule
} from "vuex-module-decorators";
import cuid from "cuid";
import IList from "@/models/IList";
import ILink from "@/models/ILink";
import { IOGData } from "@/models/IOGData";
import ogService from "@/services/og-service";
import linkService from "@/services/link-service";

@Module
export default class List extends VuexModule {
  activeList: IList = { vanityUrl: "", description: "", links: new Array() };

  @Mutation
  setListMutation(list: IList) {
    this.activeList = list;
  }

  @Mutation
  addLinkMutation(link: ILink) {
    let item = this.activeList.links.find(x => x.id === link.id);
    if (item) {
      item = link;
    } else {
      this.activeList.links.push(link);
    }
  }

  @Action({})
  addLink(link: ILink) {
    link.id = cuid();
    link.title = link.url;

    this.context.commit("addLinkMutation", link);

    let result = ogService
      .Scrape(link.url)
      .then((result: IOGData) => {
        link.title = result.title;
        link.description = result.description;
        link.image = result.image.length > 0 ? result.image[0].url : "";

        this.context.commit("addLinkMutation", link);
      })
      .catch(err => {
        console.log(err);
      });
  }

  get list() {
    return this.activeList;
  }
}
