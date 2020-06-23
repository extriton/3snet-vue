import Vue from 'vue'
import VueRouter from 'vue-router'
import BlankPage from '@/views/BlankPage.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: BlankPage
  },
  {
    path: '/general',
    name: 'GeneralPage',
    component: () => import(/* webpackChunkName: "general" */ '../views/GeneralPage.vue')
  },
  {
    path: '/tracking',
    name: 'TrackingPage',
    component: BlankPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
