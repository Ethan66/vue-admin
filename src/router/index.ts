import Vue from 'vue'
import VueRouter from 'vue-router'

import globalRoutes from './globalRoutes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: globalRoutes
})

export default router
