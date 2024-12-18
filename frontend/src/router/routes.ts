import { RouteRecordRaw } from "vue-router";
import LoginPage from "../pages/auth/LoginPage.vue";
import SignupPage from "../pages/auth/SignupPage.vue";
import HomePage from "../pages/HomePage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/signup",
    component: SignupPage,
  },
];

export default routes;
