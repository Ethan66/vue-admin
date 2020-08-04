import { RouteConfig } from 'vue-router'
import Layout from '@/common/layout/Layout'

const configRoutes: RouteConfig[] = [
  {
    path: '/admin',
    component: Layout,
    children: [{ path: 'index', component: () => import('@/common/home'), meta: { title: '首页' } }]
  }
]
export default configRoutes
