import { createRouter, createWebHistory } from 'vue-router'
import SchoolList from '../components/SchoolList.vue'
import SchoolPage from '../components/SchoolPage.vue'

const routes = [
  {
    path: '/',
    name: 'SchoolList',
    component: SchoolList
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
  routes
})

export default router
