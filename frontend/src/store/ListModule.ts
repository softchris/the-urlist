import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import cuid from 'cuid';
import IList from '@/models/IList';
import ILink from '@/models/ILink';
import { IOGData } from '@/models/IOGData';
import axios from 'axios';
import config from '@/config';
import Array from '@/shared/Array';

@Module
export default class ListModule extends VuexModule {
  _list: IList = { vanityUrl: '', description: '', links: new Array<ILink>() };

  get list() {
    return this._list;
  }

  @Mutation
  setListMutation(list: IList) {
    this._list.vanityUrl = list.vanityUrl;
    this._list.description = list.description;
  }

  @Mutation
  setVanityURLMutation(vanityUrl: string) {
    this._list.vanityUrl = vanityUrl;
  }

  @Mutation
  addLinkMutation(link: ILink) {
    let { item } = this._list.links.get(link.id);
    if (item) {
      item = link;
    } else {
      this._list.links.push(link);
    }
  }

  @Mutation
  updateLinkMutation(link: ILink) {
    let { index } = this._list.links.get(link.id);
    this._list.links[index].description = link.description;
  }

  @Mutation
  clearListMutation() {
    this._list = { vanityUrl: '', description: '', links: new Array() };
  }

  @Action({})
  clearList() {
    this.context.commit('clearListMutation');
  }

  @Action({})
  setList(list: IList) {
    this.context.commit('setListMutation', list);

    // go through each one of the links and try to update them
    // with the latest open graph information
    this._list.links.forEach(link => {
      this.context.dispatch('updateLink', link);
    });
  }

  @Action({})
  getList(vanityUrl: string) {
    axios
      .get(`${config.api}/links/${vanityUrl}`)
      .then(result => {
        let list = <IList>result.data;
        this.context.commit('setListMutation', list);
        list.links.forEach(link => {
          this.context.dispatch('addLink', link);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  @Action({})
  saveList() {
    return new Promise((resolve, reject) => {
      return axios
        .post(`${config.api}/links`, {
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
  getListMutation(vanityUrl: string) {
    axios
      .get(`${config.api}/links/${vanityUrl}`)
      .then(result => {
        this.context.commit('setListMutation', <IList>result.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  @Action({})
  updateLink(link: ILink) {
    axios
      .post(`${config.scraper}/Scrape`, {
        url: link.url
      })
      .then(result => {
        let ogData = <IOGData>result.data;
        link.title = ogData.title;
        link.description = ogData.description;
        link.image = ogData.image.url
          ? ogData.image.url
          : '../images/no-image.png';
        this.context.commit('updateLinkMutation', link);
      })
      .catch(err => {
        console.log(err);
      });
  }

  @Action({})
  addLink(link: ILink) {
    link.id = cuid();
    link.title = link.url;
    link.image = '../images/no-image.png';

    this.context.commit('addLinkMutation', link);
    this.context.dispatch('updateLink', link);
  }

  @Mutation
  deleteLinkMutation(id: string) {
    let { index } = this._list.links.get(id);
    this._list.links.splice(index, 1);
  }

  @Action({})
  deleteLink(id: string) {
    this.context.commit('deleteLinkMutation', id);
  }
}
