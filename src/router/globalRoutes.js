export default [
  { path: '/', redirect: '/admin/index' },
  { path: '/404', component: () => import('@/common/404'), name: '404', meta: { title: '404未找到' } },
  { path: '/login', component: () => import('@/common/login'), name: 'login', meta: { title: '登录' } },
  { path: '/visit-control/ip-control/index', component: () => import('@/pages/visit-control/ip-control/index'), name: 'ipControl', meta: { title: 'ip授权' } },
  { path: '/auth-config/organization/index', component: () => import('@/pages/auth-config/organization/index'), name: 'organization', meta: { title: '组织架构' } },
  { path: '/develop-center/menu-manage/index', component: () => import('@/pages/develop-center/menu-manage/index'), name: 'menu-config', meta: { title: '菜单管理' } },
  { path: '/develop-center/page-manage/index', component: () => import('@/pages/develop-center/page-manage/index'), name: 'page-manage', meta: { title: '页面管理' } }
]
