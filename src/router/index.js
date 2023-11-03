import { createRouter, createWebHistory } from 'vue-router'
import SchoolList from '../components/SchoolList.vue'
import SchoolPage from '../components/SchoolPage.vue'
import LoginPage from '../components/LoginPage.vue'

const routes = [
  {
    path: '/SchoolList',
    name: 'SchoolList',
    component: SchoolList
  },
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/:id',
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
