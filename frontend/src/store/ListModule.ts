import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import List from '@/models/List';
import ILink from '@/models/ILink';
import IMyList from '@/models/IMyList';
import { IOGData } from '@/models/IOGData';
import axios from '../shared/axios';
import config from '@/config';
import Link from '@/models/Link';
import Array from '../shared/Array';

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
    return this._myLists.get('vanityUrl', this._list.vanityUrl).index > -1;
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
    let { index } = this._list.links.get('id', link.id);
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

  @Action
  loadList(url: string) {
    const list = new List(url, '', new Array(), false);
    this.context.commit('_setList', list);

    this.context.dispatch('getList', url);
  }

  /* SET LIST */
  @Mutation
  _setList(list: List) {
    this._list.description = list.description;
    this._list.vanityUrl = list.vanityUrl;
    this._list.links = new Array();
    this._list.isNew = list.isNew;
  }

  @Action({ commit: '_setList' })
  newList() {
    const list = new List();
    list.isNew = true;

    return list;
  }

  /* GET LIST */
  @Action
  async getList(vanityUrl: string) {
    try {
      const result = await axios.get(`${config.API_URL}/links/${vanityUrl}`);

      const list = <List>result.data;
      list.isNew = false;
      // // determine if the user has the ability to edit this list
      // if (this._myLists.get('vanityUrl', list.vanityUrl).index > -1) {
      //   list.editable = true;
      // }

      this.context.commit('_setList', list);

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

  /* UPDATE LIST */
  @Action
  async updateList() {
    const options = [
      {
        op: 'replace',
        path: '/links',
        value: this._list.links
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

  /* DELETE LINK */
  @Mutation
  _deleteLink(id: string) {
    let { index } = this._list.links.get('id', id);
    this._list.links.splice(index, 1);
  }

  @Action
  deleteLink(id: string) {
    this.context.commit('_deleteLink', id);
  }

  /* GET MY LISTS */
  @Action
  async getMyLists(userName: string) {
    if (userName) {
      try {
        let results = await axios.get(
          `${config.API_URL}/links/user/${userName}`
        );

        let myLists = <IMyList>results.data;

        this.context.commit('_setMyLists', myLists);
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
