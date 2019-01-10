import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import config from "../config";
import store from "../store/store";

axios.defaults.headers.common["x-functions-key"] = config.FUNCTION_KEY;
// axios.defaults.withCredentials = true;

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  store.dispatch("setAppBusy", true);
  return config;
});

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    store.dispatch("setAppBusy", false);
    return response;
  },
  err => {
    store.dispatch("setAppBusy", false);
  }
);

export default axios;
