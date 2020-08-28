import { adminMethods } from 'vue-admin-ui-lib'
import { handleGetMenuRoutes } from '@/router/methods'
import configRoutes from '@/router/configRoutes'

export default class Permission {
  constructor (options) {
    this.btn = options.btn
    this.levelValue = this.btn.levelValue
    this.menu = options.menu
  }

  createPermission (list) {
    this.getBtns(list, this.btn)
    this.getMenus(list, this.menu)
    this.getsubTabs(configRoutes, this.menuRoutes)
  }

  getBtns (list, config) {
    const { level, levelValue, unique, name } = config
    this.btnList = list.filter(item => item[level] === levelValue)
      .map(item => ({ btnCode: item[unique], btnName: item[name] }))
  }

  getMenus (list, config) {
    const { id, parentId, level, sortNo } = config
    const menuList = list.filter(item => item[level] !== this.levelValue)
    this.menuList = adminMethods.menuRelation(menuList, id, parentId, level, sortNo)
    this.menuRoutes = handleGetMenuRoutes(this.menuList)
  }

  getsubTabs (configRoutes, menuRoutes) {
    let routeObj = {} // 将配置路由和动态路由根据一级路由进行合并，保存至routeObj
    configRoutes.forEach(item => {
      if (item.path && item.children) {
        routeObj[item.path] = JSON.parse(JSON.stringify(item.children))
      }
    })
    menuRoutes.forEach(item => {
      if (item.path && item.children) {
        if (routeObj[item.path]) {
          routeObj[item.path].push(...JSON.parse(JSON.stringify(item.children)))
        } else {
          routeObj[item.path] = JSON.parse(JSON.stringify(item.children))
        }
      }
    })
    let obj = {}
    Object.values(routeObj).forEach(value => {
      if (Array.isArray(value)) {
        value.forEach(item => {
          let info = { title: item.meta.title, level: item.meta.level, path: item.path }
          const mathResult = item.path.match(/^((\/?[\w-]+\/)+)([^/]+)$/)
          if (mathResult === null) return false
          let last = mathResult[3] // 获取最后一个
          let path = mathResult[1] // 获取除去最后一个的路由
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
    let result = {}
    Object.keys(obj).forEach(key => { // 遍历有2个及以上的二级菜单进行保存
      if (obj[key].length >= 2) {
        result[key] = obj[key]
      }
    })
    this.subTabs = result
  }
}
