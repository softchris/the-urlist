import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    activeList: {}
  },
  mutations: {
    setActiveList(state, { list }) {
      state.activeList = list;
    }
  },
  getters: {
    activeList: state => {
      return state.activeList;
    }
  }
});
