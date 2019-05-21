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

// 页面管理
// 获取页面
export const apiQueryPageList = (params) => {
  return postRequest(base + '/queryPageList', params)
}

// 页面添加
export const apiAddPage = (params) => {
  return postRequest(base + '/addPage', params)
}

// 修改页面
export const apiUpdatePage = (params) => {
  return postRequest(base + '/updatePage', params)
}

// 字段管理
// 查询字段
export const apiPageFiledQueryList = (params) => {
  return postRequest(base + '/pageFiledQueryList', params)
}

// 修改字段
export const apiUpdatePageField = (params) => {
  return postRequest(base + '/updatePageField', params)
}

// 删除字段
export const apiDeletePageField = (params) => {
  return postRequest(base + '/deletePageField', params)
}

// 添加单个字段
export const apiAddPageField = (params) => {
  return postRequest(base + '/addPageField', params)
}

// 添加单个字段
export const apiPageFieldRapidGeneration = (params) => {
  return postRequest(base + '/pageFieldRapidGeneration', params)
}
