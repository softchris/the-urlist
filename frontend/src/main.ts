import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import VModal from "vue-js-modal";
const lineClamp = require("vue-line-clamp");

Vue.use(VModal);
Vue.use(lineClamp);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
  store
}).$mount("#app");
