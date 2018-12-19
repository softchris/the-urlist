import Vue from "vue";
import Vuex from "vuex";
import List from "@/store/List";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {},
  modules: {
    List
  }
});
