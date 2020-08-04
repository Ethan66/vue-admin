import Layout from '@/common/layout/Layout'
import store from '@/store'
import { Route } from 'vue-router'
import { Component } from 'vue'

type keyType = object | number | string

interface FMenuList {
  id: number
  menuParentId: number
  menuLevel: number
  sortNo: number
  list?: FMenuList[]
  menuUrl: string
  [key: string]: keyType
}

interface FRouteMeta {
  menuId: number
  menuCode: keyType
  title: keyType
  isDynamic: boolean
  isTab: boolean
  iframeUrl: keyType
  level: number
}

interface FRoute {
  path: string
  component: Component
  name: string
  meta: FRouteMeta
  children?: FRoute[]
}

export function handleCreateRoute(obj: FMenuList, type = 'parent'): FRoute {
  const route: FRoute = {
    path: obj.menuUrl,
    component: null,
    name: obj.menuUrl,
    meta: {
      menuId: obj.id,
      menuCode: obj.menuCode,
      title: obj.menuName,
      isDynamic: true,
      isTab: true,
      iframeUrl: obj.iframeUrl || '',
      level: obj.menuLevel
    }
  }
  if (type === 'parent') {
    route.component = Layout
    route.children = []
  }
  return route
}

// 判断当前路由类型, global: 全局路由, main: 主入口路由
// route为当前路由，temp为全局路由
export function handleNowRouteType(route: Route, temp = []): string {
  let temp2 = []
  for (let i = 0; i < temp.length; i++) {
    if (route.path === temp[i].path) {
      return 'global'
    } else if (temp[i].children && temp[i].children.length) {
      temp2 = temp2.concat(temp[i].children)
    }
  }
  return temp2.length ? handleNowRouteType(route, temp2) : 'main'
}

// 添加动态(菜单)路由
// menuList：后台请求的数据，routes：创建的动态路由，用于递归持续添加路由
/*
  此方法默认只有3级菜单
  1级目录，2级菜单，3级按钮
*/
export function handleGetMenuRoutes(menuList: FMenuList[] = []): FRoute[] {
  const menuRoutes: FRoute[] = []
  for (let i = 0; i < menuList.length; i++) {
    const route: FRoute = handleCreateRoute(menuList[i])
    if (menuList[i].list && menuList[i].list.length >= 1) {
      // menuList存在children
      menuList[i].list.forEach((item) => {
        const child: FRoute = handleCreateRoute(item, 'child')
        try {
          const url = item.menuUrl.replace('/main', '')
          child.component = () => import(`@/pages${url}.vue`)
        } catch (e) {
          child.component = null
        }
        route.children.push(child)
      })
    }
    menuRoutes.push(route)
  }
  return menuRoutes
}

// 二级菜单有2个以上title到vuex中的subTabs对象
export function handleSaveSubTabs(configRoutes, menuRoutes) {
  const routeObj = {} // 将配置路由和动态路由根据一级路由进行合并，保存至routeObj
  configRoutes.forEach((item) => {
    if (item.path && item.children) {
      routeObj[item.path] = JSON.parse(JSON.stringify(item.children))
    }
  })
  menuRoutes.forEach((item) => {
    if (item.path && item.children) {
      if (routeObj[item.path]) {
        routeObj[item.path].push(...JSON.parse(JSON.stringify(item.children)))
      } else {
        routeObj[item.path] = JSON.parse(JSON.stringify(item.children))
      }
    }
  })
  const obj = {}
  Object.values(routeObj).forEach((value) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        const info = { title: item.meta.title, level: item.meta.level, path: item.path }
        const last = item.path.split('/').slice(-1).join('') // 获取最后一个
        const path = item.path.split('/').slice(0, -1).join('/') // 获取除去最后一个的路由
        if (path && obj[path]) {
          if (last === 'index') {
            obj[path].unshift(info) // 将index的路由放到最前面（因为index为默认点击进入的路由，所以放到第一个）
          } else {
            obj[path].push(info)
          }
        } else {
          obj[path] = [info]
        }
      })
    }
  })
  const result = {}
  Object.keys(obj).forEach((key) => {
    // 遍历有2个及以上的二级菜单进行保存
    if (obj[key].length >= 2) {
      result[key] = obj[key]
    }
  })
  store.commit('SAVE_SUBTABS_OBJ', result)
}
