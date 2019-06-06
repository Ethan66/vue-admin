import Layout from '@/common/layout/Layout'

export default [
  { path: '/admin',
    component: Layout,
    children: [
      { path: 'index', component: () => import('@/common/home'), meta: { title: '首页' } }
    ]
  },
  /* {
    path: '/develop-center',
    component: Layout,
    children: [
      { path: '/develop-center/menu-manage/newpage', component: () => import('@/pages/develop-center/menu-manage/newpage'), meta: { title: '动态展示副标签' } }
    ]
  }, */
  {
    path: '/develop-center/page-manage',
    component: Layout,
    children: [
      { path: 'tybemanage', component: () => import('@/pages/develop-center/page-manage/tybemanage'), meta: { title: '字段页面' } }
    ]
  }
]
