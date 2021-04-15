import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Claim from "./views/Claim.vue";
import Register from "./views/Register.vue";
import Taming from "./views/Taming.vue";

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
