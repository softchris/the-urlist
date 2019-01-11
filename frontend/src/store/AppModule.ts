import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";

@Module
export default class AppModule extends VuexModule {
  _appIsBusy: boolean = false;

  get appIsBusy() {
    return this._appIsBusy;
  }

  @Mutation
  _setAppBusy(busy: boolean) {
    this._appIsBusy = busy;
  }

  @Action({ commit: "_setAppBusy" })
  setAppBusy(busy: boolean) {
    return busy;
  }
}
