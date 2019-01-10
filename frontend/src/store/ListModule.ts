import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import List from '@/models/List';
import ILink from '@/models/ILink';
import { IOGData } from '@/models/IOGData';
import axios from '../shared/axios';
import config from '@/config';
import Link from '@/models/Link';
import Array from '../shared/Array';

@Module
export default class ListModule extends VuexModule {
  _list: List = new List();
  _myLists: Array<List> = new Array();

  get list() {
    return this._list;
  }

  get myLists() {
    return this._myLists;
  }

  @Mutation
  _setMyLists(lists: Array<List>) {
    this._myLists = lists;
  }

  @Mutation
  _setListEditable(editable: boolean) {
    this._list.editable = editable;
  }

  @Action({ commit: '_setListEditable' })
  setListEditable(editable: boolean) {
    return editable;
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
    this.context.commit('_addLink', link);
    this.context.dispatch('updateLink', link);
  }

  @Action
  newLink(url: string) {
    const link = new Link(url, url, '', '');
    this.context.dispatch('addLink', link);
  }

  /* UPDATE LINK */
  @Mutation
  _updateLink(link: ILink) {
    let { index } = this._list.links.get(link.id);
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
          link.image = ogData.image;
        }
        this.context.commit('_updateLink', link);
      })
      .catch(err => {
        console.log(err);
      });
  }

  /* INIT LIST */
  @Mutation
  _initList(list: List = new List()) {
    this._list.description = list.description;
    this._list.vanityUrl = list.vanityUrl;
    this._list.editable = list.editable;
    this._list.links = new Array();
  }

  @Action({ commit: '_initList' })
  initList(list?: List) {
    return list;
  }

  /* SET LIST */
  @Mutation
  _setList(list: List) {
    this._list.description = list.description;
    this._list.vanityUrl = list.vanityUrl;
    this._list.editable = list.editable;
  }

  /* GET LIST */
  @Action
  async getList(args: { vanityUrl: string; editable: boolean }) {
    // clear out the existing list
    this.context.commit('_initList');

    try {
      const result = await axios.get(
        `${config.API_URL}/links/${args.vanityUrl}`
      );

      const list = <List>result.data;
      list.editable = args.editable;

      this.context.commit('_initList', list);

      for (let link of list.links) {
        this.context.dispatch('addLink', link);
      }
    } catch (err) {
      console.log(err);
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

      this.context.commit('_setVanityUrl', result.data.vanityUrl);
      this.context.commit('_setListEditable', false);
    } catch (err) {
      throw new Error(err);
    }
  }

  /* DELETE LINK */
  @Mutation
  _deleteLink(id: string) {
    let { index } = this._list.links.get(id);
    this._list.links.splice(index, 1);
  }

  @Action
  deleteLink(id: string) {
    this.context.commit('_deleteLink', id);
  }

  /* GET MY LISTS */
  @Action
  async getMyLinks(userName: string) {
    try {
      let results = await axios.get(`${config.API_URL}/links/user/${userName}`);

      this.context.commit('_setMyLists', results.data);
    } catch (err) {
      throw new Error(err);
    }
  }
}
