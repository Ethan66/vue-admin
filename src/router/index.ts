import Vue from 'vue'
import VueRouter from 'vue-router'
import globalRoutes from './globalRoutes'
import configRoutes from './configRoutes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      // 通过浏览器的 前进/后退 按钮触发，因为浏览器保留了页面的位置，所以savedPosition存在
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  isAddDynamicRoutes: false,
  routes: [...globalRoutes, ...configRoutes]
})

export default router
