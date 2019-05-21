import { postRequest } from '@/config/network'
const base = '/bl/console/api'

// 菜单管理
// 获取所有菜单
export const apiListConsoleMenu = (params) => {
  return postRequest(base + '/listConsoleMenu', params)
}

// 修改菜单
export const apiEditeConsoleMenu = (params) => {
  return postRequest(base + '/editeConsoleMenu', params)
}

// 创建菜单
export const apiCreateConsoleMenu = (params) => {
  return postRequest(base + '/createConsoleMenu', params)
}

// 删除菜单
export const apiDeleteConsoleMenu = (params) => {
  return postRequest(base + '/deleteConsoleMenu', params)
}

// 查询父菜单下拉菜单
export const apiQueryParentConsoleMenu = (params) => {
  return postRequest(base + '/queryParentConsoleMenu', params)
}
