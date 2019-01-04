import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";

@Module
export default class AppModule extends VuexModule {
  _appIsBusy: boolean = false;

  get appIsBusy() {
    return this._appIsBusy;
  }

  @Mutation
  setAppBusyMutation(busy: boolean) {
    this._appIsBusy = busy;
  }

  @Action({ commit: "setAppBusyMutation" })
  setAppBusy(busy: boolean) {
    return busy;
  }
}
