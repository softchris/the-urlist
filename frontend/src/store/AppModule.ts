import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";

@Module
export default class AppModule extends VuexModule {
  _appIsBusy: boolean = false;
  _showAddBar: boolean = false;

  get appIsBusy() {
    return this._appIsBusy;
  }

  get showAddBar() {
    return this._showAddBar;
  }

  @Mutation
  _setAppBusy(busy: boolean) {
    this._appIsBusy = busy;
  }

  @Action({ commit: "_setAppBusy" })
  setAppBusy(busy: boolean) {
    return busy;
  }

  @Mutation
  _setShowAddBar(show: boolean) {
    this._showAddBar = show;
  }

  @Action({ commit: "_setShowAddBar" })
  setShowAddBar(show: boolean) {
    return show;
  }
}
