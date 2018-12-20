import * as tslib_1 from "tslib";
import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import cuid from 'cuid';
import axios from 'axios';
import config from '@/config';
let ListModule = class ListModule extends VuexModule {
    constructor() {
        super(...arguments);
        this._list = { vanityUrl: '', description: '', links: new Array() };
    }
    get list() {
        return this._list;
    }
    setListMutation(list) {
        this._list.vanityUrl = list.vanityUrl;
        this._list.description = list.description;
    }
    setVanityURLMutation(vanityUrl) {
        this._list.vanityUrl = vanityUrl;
    }
    addLinkMutation(link) {
        let item = this._list.links.find(x => x.id === link.id);
        if (item) {
            item = link;
        }
        else {
            this._list.links.push(link);
        }
    }
    updateLinkMutation(link) {
        let index = this._list.links.findIndex(x => x.id === link.id);
        this._list.links[index].description = link.description;
    }
    clearListMutation() {
        this._list = { vanityUrl: '', description: '', links: new Array() };
    }
    clearList() {
        this.context.commit('clearListMutation');
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
                this.context.dispatch('addLink', link);
            });
        })
            .catch(err => {
            console.log(err);
        });
    }
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
    getListMutation(vanityUrl) {
        axios
            .get(`${config.api}/links/${vanityUrl}`)
            .then(result => {
            this.context.commit('setListMutation', result.data);
        })
            .catch(err => {
            console.log(err);
        });
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
            link.image = ogData.image.length > 0 ? ogData.image[0].url : '';
            this.context.commit('updateLinkMutation', link);
        })
            .catch(err => {
            console.log(err);
        });
    }
    addLink(link) {
        link.id = cuid();
        link.title = link.url;
        this.context.commit('addLinkMutation', link);
        this.context.dispatch('updateLink', link);
    }
};
tslib_1.__decorate([
    Mutation
], ListModule.prototype, "setListMutation", null);
tslib_1.__decorate([
    Mutation
], ListModule.prototype, "setVanityURLMutation", null);
tslib_1.__decorate([
    Mutation
], ListModule.prototype, "addLinkMutation", null);
tslib_1.__decorate([
    Mutation
], ListModule.prototype, "updateLinkMutation", null);
tslib_1.__decorate([
    Mutation
], ListModule.prototype, "clearListMutation", null);
tslib_1.__decorate([
    Action({})
], ListModule.prototype, "clearList", null);
tslib_1.__decorate([
    Action({})
], ListModule.prototype, "setList", null);
tslib_1.__decorate([
    Action({})
], ListModule.prototype, "getList", null);
tslib_1.__decorate([
    Action({})
], ListModule.prototype, "saveList", null);
tslib_1.__decorate([
    Mutation
], ListModule.prototype, "getListMutation", null);
tslib_1.__decorate([
    Action({})
], ListModule.prototype, "updateLink", null);
tslib_1.__decorate([
    Action({})
], ListModule.prototype, "addLink", null);
ListModule = tslib_1.__decorate([
    Module
], ListModule);
export default ListModule;
//# sourceMappingURL=ListModule.js.map