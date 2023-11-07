import { createRouter, createWebHistory } from 'vue-router'
import SchoolList from '../views/SchoolList.vue'
import SchoolPage from '../views/SchoolPage.vue'
import LoginPage from '../views/Login.vue'

const routes = [
  {
    path: '/SchoolList',
    name: 'SchoolList',
    component: SchoolList
  },
  {
    path: '/',
    name: 'LoginPage',//LoignPage
    component: LoginPage
  },
  {
    path: `/:id`,
    name: 'SchoolPage',
    component: SchoolPage,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

export default router
