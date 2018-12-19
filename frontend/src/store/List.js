import * as tslib_1 from "tslib";
import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";
import cuid from "cuid";
import ogService from "@/services/og-service";
let List = class List extends VuexModule {
    constructor() {
        super(...arguments);
        this.activeList = { vanityUrl: "", description: "", links: new Array() };
    }
    setListMutation(list) {
        this.activeList = list;
    }
    addLinkMutation(link) {
        let item = this.activeList.links.find(x => x.id === link.id);
        if (item) {
            item = link;
        }
        else {
            this.activeList.links.push(link);
        }
    }
    addLink(link) {
        link.id = cuid();
        link.title = link.url;
        this.context.commit("addLinkMutation", link);
        let result = ogService
            .Scrape(link.url)
            .then((result) => {
            link.title = result.title;
            link.description = result.description;
            link.image = result.image.length > 0 ? result.image[0].url : "";
            this.context.commit("addLinkMutation", link);
        })
            .catch(err => {
            console.log(err);
        });
    }
    get list() {
        return this.activeList;
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
], List.prototype, "addLink", null);
List = tslib_1.__decorate([
    Module
], List);
export default List;
//# sourceMappingURL=List.js.map