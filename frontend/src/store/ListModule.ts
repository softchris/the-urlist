import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import IList from '@/models/IList';
import ILink from '@/models/ILink';
import { IOGData } from '@/models/IOGData';
import axios from 'axios';
import config from '@/config';
import Array from '@/shared/Array';
import Link from '@/models/Link';

axios.defaults.headers.common['x-functions-key'] = config.functionKey;

@Module
export default class ListModule extends VuexModule {
  _list: IList = { vanityUrl: '', description: '', links: new Array<ILink>() };

  get list() {
    return this._list;
  }

  @Mutation
  setVanityURLMutation(vanityUrl: string) {
    this._list.vanityUrl = vanityUrl;
  }

  /* ADD LINK */
  @Mutation
  addLinkMutation(link: ILink) {
    this._list.links.push(link);
  }

  @Action
  addLink(url: string) {
    let link = new Link(url);
    link.title = url;

    this.context.commit('addLinkMutation', link);
    this.context.dispatch('updateLink', link);
  }

  /* UPDATE LINK */
  @Mutation
  updateLinkMutation(link: ILink) {
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
        link.image = ogData.image.url;

        this.context.commit('updateLinkMutation', link);
      })
      .catch(err => {
        console.log(err);
      });
  }

  /* CLEAR LIST */
  @Mutation
  clearListMutation() {
    this._list = { vanityUrl: '', description: '', links: new Array() };
  }

  @Action
  clearList() {
    this.context.commit('clearListMutation');
  }

  /* SET LIST */
  @Mutation
  setListMutation(list: IList) {
    this._list.vanityUrl = list.vanityUrl;
    this._list.description = list.description;
  }

  @Action
  setList(list: IList) {
    this.context.commit('setListMutation', list);

    // go through each one of the links and try to update them
    // with the latest open graph information
    this._list.links.forEach(link => {
      this.context.dispatch('updateLink', link);
    });
  }

  @Action
  getList(vanityUrl: string) {
    axios
      .get(`${config.api}/links/${vanityUrl}`)
      .then(result => {
        let list = <IList>result.data;
        this.context.commit('setListMutation', list);
        list.links.forEach(link => {
          this.context.dispatch('addLink', link.url);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  @Action
  saveList() {
    return new Promise((resolve, reject) => {
      return axios
        .post(`${config.api}/links?`, {
          links: this._list.links,
          vanityUrl: this._list.vanityUrl,
          description: this._list.description
        })
        .then(result => {
          this.context.commit('setVanityURLMutation', result.data.vanityUrl);
          resolve();
        })
        .catch(err => reject(err));
    });
  }

  @Mutation
  deleteLinkMutation(id: string) {
    let { index } = this._list.links.get(id);
    this._list.links.splice(index, 1);
  }

  @Action
  deleteLink(id: string) {
    this.context.commit('deleteLinkMutation', id);
  }
}
