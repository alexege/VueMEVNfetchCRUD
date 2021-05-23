import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Claim from "./views/Claim.vue";
import Register from "./views/Register.vue";
import Taming from "./views/Taming.vue";
import Selection from "./views/SelectionMenu.vue";
// import DinoData from "./views/DinoData.vue";

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
      path: "/claim",
      name: "claim",
      component: Claim
    },
    // {
    //   path: "/claim/dino/:name",
    //   name: "requests",
    //   component: DinoData
    // },
    {
      path: "/selection",
      name: "selection",
      component: Selection
    },
    {
      path: "/taming",
      name: "taming",
      component: Taming
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    }
  ]
});
