import { createRouter, createWebHistory } from 'vue-router'
import ListaSzkół from '../components/ListaSzkół.vue'
import StronaSzkół from '../components/StronaSzkół.vue'
import JobDetails from '../components/JobDetails.vue'

const routes = [
  {
    path: '/',
    name: 'ListaSzkół',
    component: ListaSzkół
  },
  {
    path: '/about',
    name: 'StronaSzkół',
    component: StronaSzkół
  },
  {
    path: '/jobs/:id',
    name: 'JobDetails',
    component: JobDetails,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
