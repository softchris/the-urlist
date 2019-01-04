import * as tslib_1 from "tslib";
import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";
let AppModule = class AppModule extends VuexModule {
    constructor() {
        super(...arguments);
        this._appIsBusy = false;
    }
    get appIsBusy() {
        return this._appIsBusy;
    }
    setAppBusyMutation(busy) {
        this._appIsBusy = busy;
    }
    setAppBusy(busy) {
        return busy;
    }
};
tslib_1.__decorate([
    Mutation
], AppModule.prototype, "setAppBusyMutation", null);
tslib_1.__decorate([
    Action({ commit: "setAppBusyMutation" })
], AppModule.prototype, "setAppBusy", null);
AppModule = tslib_1.__decorate([
    Module
], AppModule);
export default AppModule;
//# sourceMappingURL=AppModule.js.map