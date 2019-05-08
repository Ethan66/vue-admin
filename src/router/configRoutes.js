import Layout from '@/common/layout/Layout'

export default [
  { path: '/admin',
    component: Layout,
    children: [
      { path: 'index', component: () => import('@/common/home'), meta: { title: '首页' } }
    ]
  },
  {
    path: '/main/auth-config/menu',
    component: Layout,
    children: [
      { path: 'newpage', component: () => import('@/pages/auth-config/menu/newpage'), meta: { title: '新页面', level: 3 } },
      { path: 'fourpage', component: () => import('@/pages/auth-config/menu/fourpage'), meta: { title: '四级页面', level: 4 } }
    ]
  }
]
