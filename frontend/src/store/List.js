import * as tslib_1 from "tslib";
import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import cuid from 'cuid';
import axios from 'axios';
import config from '@/config';
let List = class List extends VuexModule {
    constructor() {
        super(...arguments);
        this._list = { vanityUrl: '', description: '', links: new Array() };
    }
    get list() {
        return this._list;
    }
    setListMutation(list) {
        this._list = list;
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
    saveList(list) {
        axios
            .post(`${config.api}/links`, {
            links: list.links,
            vanityUrl: list.vanityUrl,
            description: list.description
        })
            .then(result => {
            this.context.commit('setListMutation', result.data);
        })
            .catch(err => {
            console.log(err);
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
    addLink(link) {
        link.id = cuid();
        link.title = link.url;
        this.context.commit('addLinkMutation', link);
        //let result = ogService;
        axios
            .post(`${config.scraper}/Scrape`, {
            url: link.url
        })
            .then(result => {
            let ogData = result.data;
            link.title = ogData.title;
            link.description = ogData.description;
            link.image = ogData.image.length > 0 ? ogData.image[0].url : '';
            this.context.commit('addLinkMutation', link);
        })
            .catch(err => {
            console.log(err);
        });
    }
};
tslib_1.__decorate([
    Mutation
], List.prototype, "setListMutation", null);
tslib_1.__decorate([
    Mutation
], List.prototype, "addLinkMutation", null);
tslib_1.__decorate([
    Action({})
], List.prototype, "saveList", null);
tslib_1.__decorate([
    Mutation
], List.prototype, "getListMutation", null);
tslib_1.__decorate([
    Action({})
], List.prototype, "addLink", null);
List = tslib_1.__decorate([
    Module
], List);
export default List;
//# sourceMappingURL=List.js.map