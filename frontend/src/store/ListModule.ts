import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";
import List from "@/models/List";
import ILink from "@/models/ILink";
import IMyList from "@/models/IMyList";
import { IOGData } from "@/models/IOGData";
import axios from "../shared/axios";
import config from "@/config";
import Link from "@/models/Link";

@Module
export default class ListModule extends VuexModule {
  _list: List = new List();
  _myLists: Array<IMyList> = new Array();

  get list() {
    return this._list;
  }

  get myLists() {
    return this._myLists;
  }

  @Action
  async getUserOwnsList() {
    return this._myLists.get("vanityUrl", this._list.vanityUrl).index > -1;
  }

  @Mutation
  _setMyLists(myLists: Array<IMyList>) {
    this._myLists = myLists;
  }

  @Mutation
  _setVanityUrl(vanityUrl: string) {
    this._list.vanityUrl = vanityUrl;
  }

  /* ADD LINK */
  @Mutation
  _addLink(link: ILink) {
    this._list.links.push(link);
  }

  @Action
  addLink(link: ILink = new Link()) {
    this.context.commit("_addLink", link);
    this.context.dispatch("updateLink", link);
  }

  @Action
  newLink(url: string) {
    const link = new Link(url, url, "", "");
    this.context.dispatch("addLink", link);
  }

  /* UPDATE LINK */
  @Mutation
  _updateLink(link: ILink) {
    let { index } = this._list.links.get("id", link.id);
    this._list.links[index] = link;
  }

  @Action
  updateLink(link: ILink) {
    axios
      .post(`${config.API_URL}/validatePage`, {
        url: link.url,
        id: link.id
      })
      .then(result => {
        let ogData = <IOGData>result.data;

        link.title = ogData.title;
        link.description = ogData.description;
        if (ogData.image) {
          link.image = ogData.image.replace(/(^\w+:|^)/, "") || "";
        }

        console.log(link);

        this.context.commit("_updateLink", link);
      })
      .catch(err => {
        console.log(err);
      });
  }

  /* SET LIST */
  @Mutation
  _setList(list: List) {
    this._list = list;
  }

  @Action({ commit: "_setList" })
  newList() {
    const list = new List();
    list.isNew = true;

    return list;
  }

  /* GET LIST */
  @Action
  async getList(vanityUrl: string) {
    let list = new List("", "", new Array(), false);
    this.context.commit("_setList", list);

    try {
      const result = await axios.get(`${config.API_URL}/links/${vanityUrl}`);

      list.vanityUrl = result.data.vanityUrl;
      list.description = result.data.description;

      this.context.commit("_setList", list);

      for (let link of result.data.links) {
        this.context.dispatch("addLink", link);
      }
    } catch (err) {
      list.vanityUrl = vanityUrl;
      list.isNew = true;
      this.context.commit("_setList", list);

      throw new Error(err);
    }
  }

  /* SAVE LIST */
  @Action
  async saveList() {
    const options = {
      links: this._list.links,
      vanityUrl: this._list.vanityUrl,
      description: this._list.description,
      userId: this.context.getters.currentUser.userName
    };

    try {
      let result = await axios.post(`${config.API_URL}/links?`, options);

      this.context.commit("_setVanityUrl", result.data.vanityUrl);
      this.context.commit("_setListEditable", false);
    } catch (err) {
      throw new Error(err);
    }
  }

  /* UPDATE LIST */
  @Action
  async updateList() {
    const options = [
      {
        op: "replace",
        path: "/links",
        value: this._list.links
      },
      {
        op: "replace",
        path: "/description",
        value: this._list.description
      }
    ];

    try {
      let result = await axios.patch(
        `${config.API_URL}/links/${this.list.vanityUrl}`,
        options
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  @Action({ commit: "_setMyLists" })
  async deleteList(vanityUrl: string) {
    try {
      await axios.delete(`${config.API_URL}/links/${this.list.vanityUrl}`);
      return new Array();
    } catch (err) {
      throw new Error(err);
    }
  }

  /* DELETE LINK */
  @Mutation
  _deleteLink(id: string) {
    let { index } = this._list.links.get("id", id);
    this._list.links.splice(index, 1);
  }

  @Action
  deleteLink(id: string) {
    this.context.commit("_deleteLink", id);
  }

  /* GET MY LISTS */
  @Action
  async getMyLists() {
    const userName = this.context.getters.currentUser.userName;

    if (userName) {
      try {
        let results = await axios.get(
          `${config.API_URL}/links/user/${userName}`
        );

        let myLists = <IMyList>results.data;

        this.context.commit("_setMyLists", myLists);
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  /**
   * This method checks for the availability of the vanityUrl in the database. It does this by
   * just requesting a list by vanityUrl. If a list is returned, the vanity is not available.
   * @param vanityUrl The vanityUrl to check for availablility
   */
  @Action
  async checkVanityAvailable(vanityUrl: string) {
    try {
      let list = await axios.get(`${config.API_URL}/links/${vanityUrl}`);
      return list.status === 400;
    } catch (err) {
      return true;
    }
  }
}
