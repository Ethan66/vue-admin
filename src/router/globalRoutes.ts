import { RouteConfig } from 'vue-router'

const globalRoutes: RouteConfig[] = [
  // { path: '/', redirect: '/admin/index' },
  { path: '/404', component: () => import('@/common/404.tsx'), name: '404', meta: { title: '404未找到' } }
  /* {
    path: '/login',
    component: () => import('@/common/login.vue'),
    name: 'login',
    meta: { title: '登录', firstLogin: true },
  }, */
]

export default globalRoutes
