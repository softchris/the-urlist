import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/store";
const VueProgressBar = require("vue-progressbar");
Vue.use(VueProgressBar, {
    color: "rgb(143, 255, 199)",
    failedColor: "red",
    height: "2px"
});
Vue.config.productionTip = false;
new Vue({
    router,
    render: h => h(App),
    store
}).$mount("#app");
//# sourceMappingURL=main.js.map