import Layout from '@/common/layout/Layout'

export default [
  { path: '/admin',
    component: Layout,
    children: [
      { path: 'index', component: () => import('@/common/home'), meta: { title: '首页' } }
    ]
  },
  {
    path: '/main/develop-center/menu-manage',
    component: Layout,
    children: [
      { path: 'newpage', component: () => import('@/pages/develop-center/menu-manage/newpage'), meta: { title: '新页面', level: 3 } },
      { path: 'fourpage', component: () => import('@/pages/develop-center/menu-manage/fourpage'), meta: { title: '四级页面', level: 4 } }
    ]
  },
  {
    path: '/main/develop-center/page-manage',
    component: Layout,
    children: [
      { path: 'tybemanage', component: () => import('@/pages/develop-center/page-manage/tybemanage'), meta: { title: '字段页面', level: 3 } }
    ]
  },
  // test
  /* {
    path: '/auth-config',
    component: Layout,
    children: [
      { path: '/auth-config/funclimit/index', component: () => import('@/pages/auth-config/funclimit/index'), name: 'staff-role', meta: { title: '员工角色管理' } },
      { path: '/auth-config/funclimit/roleLimit', component: () => import('@/pages/auth-config/funclimit/roleLimit'), name: 'role-manage', meta: { title: '角色管理' } },
      { path: '/auth-config/organization/index', component: () => import('@/pages/auth-config/organization/index'), name: 'organization', meta: { title: '组织架构' } },
      { path: '/auth-config/staff/index', component: () => import('@/pages/auth-config/staff/index'), name: 'staff', meta: { title: '员工管理' } }
    ]
  }, */
  {
    path: '/develop-center',
    component: Layout,
    children: [
      // { path: '/develop-center/page-manage/index', component: () => import('@/pages/develop-center/page-manage/index'), name: 'page-manage', meta: { title: '页面管理' } },
      { path: '/develop-center/page-manage/tybemanage', component: () => import('@/pages/develop-center/page-manage/tybemanage'), name: 'tybe-manage', meta: { title: '字段管理' } },
      // { path: '/develop-center/menu-manage/index', component: () => import('@/pages/develop-center/menu-manage/index'), name: 'menu-config', meta: { title: '菜单管理' } }
    ]
  }
]
