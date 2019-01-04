import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";
import config from "../config";
import IUser from "../models/IUser";
import axios from "axios";

axios.defaults.headers.common["x-functions-key"] = config.functionKey;

@Module
export default class ListModule extends VuexModule {
  _currentUser: IUser = { email: "", loggedIn: false };

  get currentUser() {
    return this._currentUser;
  }

  @Action
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

  @Action
  setCurrentUser() {}
}
