import { postRequest } from '@/config/network'
const base = '/bl/console/api'

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

// 登陆日志
export const apiListPageLoginLog = (params) => {
  return postRequest('/bl/console/user/listPageLoginLog', params)

}

// 登陆异常日志
export const apiListPageLoginErrorLog = (params) => {
  return postRequest(base + '/queryConsoleLogList', params)
}

// 组织架构
// 查询部门
export const apiQueryDepartmentList = (params) => {
  return postRequest(base + '/queryDepartmentList', params)
}

// 停用部门
export const apiStopDepartment = (params) => {
  return postRequest(base + '/stopDepartment', params)
}

// 删除部门
export const apiDelDepartment = (params) => {
  return postRequest(base + '/delDepartment', params)
}

// 编辑部门
export const apiEditDepartment = (params) => {
  return postRequest(base + '/editDepartment', params)
}

// 新增部门
export const apiAddDepartment = (params) => {
  return postRequest(base + '/addDepartment', params)
}

// 查询部门树
export const apiQueryDepartmentTree = (params) => {
  return postRequest(base + '/queryDepartmentTree', params)
}
