import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";
import config from "../config";
import User from "../models/User";
import axios from "axios";

@Module
export default class ListModule extends VuexModule {
  _currentUser: User = new User();
  _showProfileMenu: boolean = false;

  get currentUser() {
    return this._currentUser;
  }

  get showProfileMenu() {
    return this._showProfileMenu;
  }

  @Mutation
  _setUser(user: User) {
    this._currentUser = user;
  }

  @Action
  async getUser() {
    try {
      let response = await axios.get(config.ME_URL);
      let user = new User(response.data[0]);
      this.context.commit("_setUser", user);
      this.context.dispatch("getMyLists", user.userName);
    } catch (err) {
      console.log("User is not logged in");
    }
  }

  @Mutation
  _toggleProfileMenu() {
    this._showProfileMenu = !this._showProfileMenu;
  }

  @Action({ commit: "_toggleProfileMenu" })
  toggleProfileMenu() {}
}
