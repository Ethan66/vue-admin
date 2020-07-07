import Layout from '@/common/layout/Layout'

export default [
  { path: '/admin',
    component: Layout,
    children: [
      { path: 'index', component: () => import('@/common/home'), meta: { title: '首页' } }
    ]
  },
  /* {
    // 副标签案例
    path: '/develop-center',
    component: Layout,
    children: [
      { path: '/develop-center/menu-manage/newpage', component: () => import('@/pages/develop-center/menu-manage/newpage'), meta: { title: '动态展示副标签' } }
    ]
  }, */
  // 角色管理
  { path: '/auth-config/role-manage',
    component: Layout,
    children: [
      { path: 'roleAuth', component: () => import('@/pages/auth-config/role-manage/roleAuth'), meta: { title: '角色授权' } }
    ]
  }
]
