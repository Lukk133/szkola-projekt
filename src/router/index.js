import { createRouter, createWebHistory } from 'vue-router'
import ListaSzkół from '../components/ListaSzkół.vue'
import JobDetails from '../components/JobDetails.vue'

const routes = [
  {
    path: '/',
    name: 'ListaSzkół',
    component: ListaSzkół
  },
  {
    path: '/:id',
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
