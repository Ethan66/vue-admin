export default [
  { path: '/', redirect: '/admin/index' },
  { path: '/404', component: () => import('@/common/404'), name: '404', meta: { title: '404未找到' } },
  { path: '/login', component: () => import('@/common/login'), name: 'login', meta: { title: '登录' } },
  { path: '/main/log/login-log/index', component: () => import('@/pages/log/login-log/index'), name: 'loginLog', meta: { title: '登陆日志' } },
  { path: '/main/log/error-log/index', component: () => import('@/pages/log/error-log/index'), name: 'errorLog', meta: { title: '登陆日1志' } }
]
