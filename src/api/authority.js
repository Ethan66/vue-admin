import { postRequest } from '@/config/network'
const base = '/bl/console/api'

// 菜单管理
// 获取所有菜单
export const apiListSysMenu = (params) => {
  return postRequest(base + '/listSysMenu', params)
}

// 编辑菜单
export const apiEditSysMenu = (params) => {
  return postRequest(base + '/editeSysMenu', params)
}

// 创建菜单
export const apiCreateSysMenu = (params) => {
  return postRequest(base + '/createSysMenu', params)
}

// 删除菜单
export const apiDeleteSysMenu = (params) => {
  return postRequest(base + '/deleteSysMenu', params)
}

// 查询有多少父菜单
export const apiQueryParentSysMenu = (params) => {
  return postRequest(base + '/queryParentSysMenu', params)
}

// 按钮管理
// 删除按钮
export const apiDeleteSysButton = (params) => {
  return postRequest(base + '/deleteSysButton', params)
}

// 编辑按钮
export const apiEditeSysButton = (params) => {
  return postRequest(base + '/editeSysButton', params)
}

// 查询按钮
export const apiListSysButton = (params) => {
  return postRequest(base + '/listSysButton', params)
}

// 创建按钮
export const apiCreateSysButton = (params) => {
  return postRequest(base + '/createSysButton', params)
}

// 角色管理
// 查询角色
export const apiGetListSysRole = (params) => {
  return postRequest(base + '/listSysRole', params)
}

// 创建角色
export const apiCreateSysRole = (params) => {
  return postRequest(base + '/createSysRole', params)
}

// 编辑角色
export const apiEditeSysRole = (params) => {
  return postRequest(base + '/editeSysRole', params)
}

// 删除角色
export const apiDeleteSysRole = (params) => {
  return postRequest(base + '/deleteSysRole', params)
}
