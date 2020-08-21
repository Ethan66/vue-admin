import router from '@/router/index'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
// import { Message } from 'element-ui'
import { Route } from 'vue-router'
import { apiGetUserAuthMenu } from '@/api/login'
import { handleNowRouteType, handleGetMenuRoutes, handleSaveSubTabs } from '@/router/methods'
import globalRoutes from './globalRoutes'
import configRoutes from './configRoutes'
import { adminMethods } from 'vue-admin-ui-lib/lib'

router.beforeEach(async (to: Route, from: Route, next: Function) => {
  NProgress.start()
  let toPath = ''
  if (!localStorage.getItem('userInfo')) {
    if (to.path !== '/login') {
      toPath = `/login?redirect=${to.path}`
    }
  }

  // 是否已加载路由或访问的是全局路由不用请求路由接口, firstLogin表示退出重新登录
  if (
    (router.options.isAddDynamicRoutes || handleNowRouteType(to, globalRoutes) === 'global') &&
    !from.meta.firstLogin
  ) {
    document.title = to.meta.title ? to.meta.title : '首页'
    !toPath ? next() : next({ path: toPath })
  } else {
    // 后台请求菜单列表
    /*
      此方法默认只有3级菜单，2级菜单下的子页面保存在configRouter里
      1级目录，2级菜单，3级按钮
    */
    if (from.path === '/login') {
      from.meta.firstLogin = false
    }
    const { department: departmentId } = JSON.parse(localStorage.getItem('userInfo')) || {}
    const res = await apiGetUserAuthMenu({ departmentId })
    if (res.code !== '000000') {
      sessionStorage.setItem('menuList', '[]')
      !toPath ? next() : next({ path: toPath })
      return
    }
    const list = res.data.list

    // 存储用户授权按钮
    // const btnList = list.filter(item => item.menuLevel === 3 && item.status === 1)
    //   .map(item => ({ btnCode: item.code, btnName: item.menuName }))
    // authBtn.setBtnList(btnList) // 正常应该存在vuex里

    // 存储用户授权菜单
    let menuList = list.filter((item) => item.menuLevel !== 3)
    menuList = adminMethods.menuRelation(menuList, 'id', 'menuParentId', 'menuLevel', 'sortNo', 'list')
    const menuRoutes = handleGetMenuRoutes(menuList)
    router.addRoutes([...configRoutes, ...menuRoutes, { path: '*', redirect: { name: '404' } }])
    sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(menuRoutes || '[]')) // 保存动态路由
    sessionStorage.setItem('menuList', JSON.stringify(menuList || '[]')) // 正常应该存在vuex里
    router.options.isAddDynamicRoutes = true
    handleSaveSubTabs(configRoutes, menuRoutes) // 将2级菜单的子页面的tabs保存下来

    // 从登录页面过来选择第一个菜单
    if (from.path === '/login' && menuList && menuList[0].list && menuList[0].list[0]) {
      toPath = menuList[0].list[0].menuUrl
    }
    !toPath ? next({ ...to, replace: true }) : next({ path: toPath })
  }
})

router.afterEach(() => {
  NProgress.done()
})
