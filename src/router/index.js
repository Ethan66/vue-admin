import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import Layout from '@/common/layout/Layout'

import globalRoutes from './globalRoutes'
import configRoutes from './configRoutes'
import { apiGetUserMenu } from '@/api/login'
import { menuRelation } from '@/config/utils'

Vue.use(Router)

NProgress.configure({ showSpinner: false })
const router = new Router({
  base: '/blow/',
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  isAddDynamicMenuRoutes: false, // 记录是否已加载动态路由
  routes: globalRoutes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  let toPath = ''
  if (sessionStorage.getItem('userInfo')) { // 有userInfo，跳转login的时候进入首页
    if (to.path === '/login') {
      toPath = '/'
    }
  } else { // userInfo不存在，全跳转login
    if (to.path !== '/login') {
      toPath = `/login?redirect=${to.path}`
    }
  }
  // 是否已加载路由或访问的是全局路由不用请求路由接口
  if (router.options.isAddDynamicMenuRoutes || handleNowRouteType(to, globalRoutes) === 'global') {
    document.title = to.meta.title ? to.meta.title : '首页'
    !toPath ? next() : next({ path: toPath })
  } else { // 否则访问路由接口
    // 后台请求菜单列表
    apiGetUserMenu({}).then(res => {
      if (res.code === '208999') {
        const data = res.resultMap
        data.menuList = menuRelation(data.menuList, 'id', 'menuParentId', 'sort')
        handleAddMenuRoutes(data.menuList, configRoutes)
        sessionStorage.setItem('menuList', JSON.stringify(data.menuList || '[]'))
        router.options.isAddDynamicMenuRoutes = true
        !toPath ? next({ ...to, replace: true }) : next({ path: toPath })
      } else {
        sessionStorage.setItem('menuList', '[]')
        !toPath ? next() : next({ path: toPath })
      }
    })
  }
})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})

// 判断当前路由类型, global: 全局路由, main: 主入口路由
// route为当前路由，temp为全局路由
function handleNowRouteType (route, temp = []) {
  let temp2 = []
  for (var i = 0; i < temp.length; i++) {
    if (route.path === temp[i].path) {
      return 'global'
    } else if (temp[i].children && temp[i].children.length >= 1) {
      temp2 = temp2.concat(temp[i].children)
    }
  }
  return temp2.length >= 1 ? handleNowRouteType(route, temp2) : 'main'
}

// 添加动态(菜单)路由
// menuList：后台请求的数据，routes：创建的动态路由，用于递归持续添加路由
function handleAddMenuRoutes (menuList = [], configRoutes = []) {
  router.addRoutes([
    ...configRoutes
  ])
  let menuRoutes = []
  for (var i = 0; i < menuList.length; i++) {
    let route = handleCreateRoute(menuList[i])
    if (menuList[i].list && menuList[i].list.length >= 1) { // menuList存在children
      menuList[i].list.forEach(item => {
        let child = handleCreateRoute(item, 'child')
        try {
          let url = item.menuUrl.replace('/main', '')
          child.component = () => import(`@/pages${url}.vue`)
        } catch (e) {
          child.component = null
        }
        route.children.push(child)
      })
    }
    menuRoutes.push(route)
  }
  router.addRoutes([
    ...menuRoutes,
    { path: '*', redirect: { name: '404' } }
  ])
  sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(menuRoutes || '[]'))
}

function handleCreateRoute (obj, type = 'parent') {
  let route = {
    path: obj.menuUrl,
    component: null,
    name: obj.menuUrl,
    meta: {
      menuId: obj.id,
      menuCode: obj.menuCode,
      title: obj.menuName,
      isDynamic: true,
      isTab: true,
      iframeUrl: obj.iframeUrl || ''
    }
  }
  if (type === 'parent') {
    route.component = Layout
    route.children = []
  }
  return route
}

export default router
