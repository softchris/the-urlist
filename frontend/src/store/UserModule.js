import * as tslib_1 from "tslib";
import { Module, Action, VuexModule } from "vuex-module-decorators";
import config from "../config";
import axios from "axios";
axios.defaults.headers.common["x-functions-key"] = config.functionKey;
let ListModule = class ListModule extends VuexModule {
    constructor() {
        super(...arguments);
        this._currentUser = { email: "", loggedIn: false };
    }
    get currentUser() {
        return this._currentUser;
    }
    getUser() {
        return new Promise((resolve, reject) => {
            // See if we can get the current user
            axios
                .get(config.ME_URL, { withCredentials: true })
                .then(result => {
                resolve(result.data);
            })
                .catch(err => {
                reject(err);
            });
        });
    }
    setCurrentUser() { }
};
tslib_1.__decorate([
    Action
], ListModule.prototype, "getUser", null);
tslib_1.__decorate([
    Action
], ListModule.prototype, "setCurrentUser", null);
ListModule = tslib_1.__decorate([
    Module
], ListModule);
export default ListModule;
//# sourceMappingURL=UserModule.js.map