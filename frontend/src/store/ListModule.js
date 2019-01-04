import * as tslib_1 from "tslib";
import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import List from '@/models/List';
import axios from 'axios';
import config from '@/config';
import Array from '@/shared/Array';
import Link from '@/models/Link';
axios.defaults.headers.common['x-functions-key'] = config.functionKey;
let ListModule = class ListModule extends VuexModule {
    constructor() {
        super(...arguments);
        this._list = new List(false);
    }
    get list() {
        return this._list;
    }
    _setListEditable(editable) {
        this._list.editable = editable;
    }
    setListEditable(editable) {
        return editable;
    }
    _setVanityUrl(vanityUrl) {
        this._list.vanityUrl = vanityUrl;
    }
    /* ADD LINK */
    _addLink(link) {
        this._list.links.push(link);
    }
    addLink(url) {
        let link = new Link(url);
        link.title = url;
        this.context.commit('_addLink', link);
        this.context.dispatch('updateLink', link);
    }
    /* UPDATE LINK */
    _updateLink(link) {
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
    _initList(editable) {
        this._list = {
            vanityUrl: '',
            description: '',
            links: new Array(),
            editable: true
        };
    }
    initList(editable) {
        return editable;
    }
    /* SET LIST */
    _setList(list) {
        this._list.description = list.description;
        this._list.vanityUrl = list.vanityUrl;
        this._list.editable = list.editable;
    }
    /* GET LIST */
    getList(vanityUrl) {
        this.context.dispatch('setAppBusy', true);
        axios
            .get(`${config.API_URL}/links/${vanityUrl}`)
            .then(result => {
            let list = result.data;
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
    _deleteLink(id) {
        let { index } = this._list.links.get(id);
        this._list.links.splice(index, 1);
    }
    deleteLink(id) {
        this.context.commit('_deleteLink', id);
    }
};
tslib_1.__decorate([
    Mutation
], ListModule.prototype, "_setListEditable", null);
tslib_1.__decorate([
    Action({ commit: '_setListEditable' })
], ListModule.prototype, "setListEditable", null);
tslib_1.__decorate([
    Mutation
], ListModule.prototype, "_setVanityUrl", null);
tslib_1.__decorate([
    Mutation
], ListModule.prototype, "_addLink", null);
tslib_1.__decorate([
    Action
], ListModule.prototype, "addLink", null);
tslib_1.__decorate([
    Mutation
], ListModule.prototype, "_updateLink", null);
tslib_1.__decorate([
    Action
], ListModule.prototype, "updateLink", null);
tslib_1.__decorate([
    Mutation
], ListModule.prototype, "_initList", null);
tslib_1.__decorate([
    Action({ commit: '_initList' })
], ListModule.prototype, "initList", null);
tslib_1.__decorate([
    Mutation
], ListModule.prototype, "_setList", null);
tslib_1.__decorate([
    Action
], ListModule.prototype, "getList", null);
tslib_1.__decorate([
    Action
], ListModule.prototype, "saveList", null);
tslib_1.__decorate([
    Mutation
], ListModule.prototype, "_deleteLink", null);
tslib_1.__decorate([
    Action
], ListModule.prototype, "deleteLink", null);
ListModule = tslib_1.__decorate([
    Module
], ListModule);
export default ListModule;
//# sourceMappingURL=ListModule.js.map