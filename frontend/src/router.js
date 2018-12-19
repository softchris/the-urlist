import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import List from "@/views/List.vue";
Vue.use(Router);
export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/:id",
            name: "list",
            component: List
        }
        // {
        //   path: "/:id",
        //   name: "list",
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () =>
        //     // import(/* webpackChunkName: "about" */ "./views/About.vue")
        // }
    ]
});
//# sourceMappingURL=router.js.map