import Vue from 'vue'
import Router from 'vue-router'
import globalRoutes from './globalRoutes'
import configRoutes from './configRoutes'

Vue.use(Router)

const router = new Router({
  base: '/blow/',
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  isAddDynamicRoutes: false, // 记录是否已加载动态路由
  routes: [...globalRoutes, ...configRoutes]
})

export default router
