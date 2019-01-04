import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import List from '@/models/List';
import ILink from '@/models/ILink';
import { IOGData } from '@/models/IOGData';
import axios from 'axios';
import config from '@/config';
import Array from '@/shared/Array';
import Link from '@/models/Link';

axios.defaults.headers.common['x-functions-key'] = config.functionKey;

@Module
export default class ListModule extends VuexModule {
  _list: List = new List(false);

  get list() {
    return this._list;
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
  addLink(url: string) {
    let link = new Link(url);
    link.title = url;

    this.context.commit('_addLink', link);
    this.context.dispatch('updateLink', link);
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
      .post(`${config.scraper}/Scrape`, {
        url: link.url
      })
      .then(result => {
        let ogData = <IOGData>result.data;

        link.title = ogData.title;
        link.description = ogData.description;
        if (ogData.image.url) {
          link.image = ogData.image.url;
        }
        this.context.commit('_updateLink', link);
      })
      .catch(err => {
        console.log(err);
      });
  }

  /* INIT LIST */
  @Mutation
  _initList(editable: boolean) {
    this._list = {
      vanityUrl: '',
      description: '',
      links: new Array(),
      editable: true
    };
  }

  @Action({ commit: '_initList' })
  initList(editable: boolean) {
    return editable;
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
  getList(vanityUrl: string) {
    this.context.dispatch('setAppBusy', true);
    axios
      .get(`${config.API_URL}/links/${vanityUrl}`)
      .then(result => {
        let list = <List>result.data;

        // lists are not editable by default
        list.editable = false;

        this.context.commit('_setList', list);

        list.links.forEach(link => {
          this.context.dispatch('addLink', link.url);
        });

        this.context.dispatch('setAppBusy', false);
      })
      .catch(err => {
        console.log(err);
        this.context.dispatch('setAppBusy', false);
      });
  }

  /* SAVE LIST */
  @Action
  saveList() {
    this.context.dispatch('setAppBusy', true);
    return new Promise((resolve, reject) => {
      return axios
        .post(`${config.API_URL}/links?`, {
          links: this._list.links,
          vanityUrl: this._list.vanityUrl,
          description: this._list.description
        })
        .then(result => {
          this.context.commit('_setVanityUrl', result.data.vanityUrl);
          this.context.commit('_setListEditable', false);
          this.context.dispatch('setAppBusy', false);
          resolve();
        })
        .catch(err => reject(err));
    });
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
}
