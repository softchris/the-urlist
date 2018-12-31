import * as tslib_1 from "tslib";
import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import axios from 'axios';
import config from '@/config';
import Array from '@/shared/Array';
import Link from '@/models/Link';
axios.defaults.headers.common['x-functions-key'] = config.functionKey;
let ListModule = class ListModule extends VuexModule {
    constructor() {
        super(...arguments);
        this._list = { vanityUrl: '', description: '', links: new Array() };
    }
    get list() {
        return this._list;
    }
    setVanityURLMutation(vanityUrl) {
        this._list.vanityUrl = vanityUrl;
    }
    /* ADD LINK */
    addLinkMutation(link) {
        this._list.links.push(link);
    }
    addLink(url) {
        let link = new Link(url);
        link.title = url;
        this.context.commit('addLinkMutation', link);
        this.context.dispatch('updateLink', link);
    }
    /* UPDATE LINK */
    updateLinkMutation(link) {
        let { index } = this._list.links.get(link.id);
        this._list.links[index] = link;
    }
    updateLink(link) {
        axios
            .post(`${config.scraper}/Scrape`, {
            url: link.url
        })
            .then(result => {
            let ogData = result.data;
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
    clearListMutation() {
        this._list = { vanityUrl: '', description: '', links: new Array() };
    }
    clearList() {
        this.context.commit('clearListMutation');
    }
    /* SET LIST */
    setListMutation(list) {
        this._list.vanityUrl = list.vanityUrl;
        this._list.description = list.description;
    }
    setList(list) {
        this.context.commit('setListMutation', list);
        // go through each one of the links and try to update them
        // with the latest open graph information
        this._list.links.forEach(link => {
            this.context.dispatch('updateLink', link);
        });
    }
    getList(vanityUrl) {
        axios
            .get(`${config.api}/links/${vanityUrl}`)
            .then(result => {
            let list = result.data;
            this.context.commit('setListMutation', list);
            list.links.forEach(link => {
                this.context.dispatch('addLink', link.url);
            });
        })
            .catch(err => {
            console.log(err);
        });
    }
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
    deleteLinkMutation(id) {
        let { index } = this._list.links.get(id);
        this._list.links.splice(index, 1);
    }
    deleteLink(id) {
        this.context.commit('deleteLinkMutation', id);
    }
};
tslib_1.__decorate([
    Mutation
], ListModule.prototype, "setVanityURLMutation", null);
tslib_1.__decorate([
    Mutation
], ListModule.prototype, "addLinkMutation", null);
tslib_1.__decorate([
    Action
], ListModule.prototype, "addLink", null);
tslib_1.__decorate([
    Mutation
], ListModule.prototype, "updateLinkMutation", null);
tslib_1.__decorate([
    Action
], ListModule.prototype, "updateLink", null);
tslib_1.__decorate([
    Mutation
], ListModule.prototype, "clearListMutation", null);
tslib_1.__decorate([
    Action
], ListModule.prototype, "clearList", null);
tslib_1.__decorate([
    Mutation
], ListModule.prototype, "setListMutation", null);
tslib_1.__decorate([
    Action
], ListModule.prototype, "setList", null);
tslib_1.__decorate([
    Action
], ListModule.prototype, "getList", null);
tslib_1.__decorate([
    Action
], ListModule.prototype, "saveList", null);
tslib_1.__decorate([
    Mutation
], ListModule.prototype, "deleteLinkMutation", null);
tslib_1.__decorate([
    Action
], ListModule.prototype, "deleteLink", null);
ListModule = tslib_1.__decorate([
    Module
], ListModule);
export default ListModule;
//# sourceMappingURL=ListModule.js.map