import { createRouter, createWebHistory } from "vue-router";
import SchoolList from "../views/SchoolList.vue";
import SchoolPage from "../views/SchoolPage.vue";
import LoginPage from "../views/Login.vue";
import Profile from "../views/Profile.vue";

const routes = [
  {
    path: "/",
    name: "SchoolList",
    component: SchoolList,
  },
  {
    path: "/LoginPage",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: `/:id`,
    name: "SchoolPage",
    component: SchoolPage,
    props: true,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: "active",
  routes,
});

export default router;
