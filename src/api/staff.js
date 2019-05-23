import { postRequest } from '@/config/network'

const base = '/bl/console/user'
const base2 = '/bl/console/api'

// 查询系统用户列表
export const apiListConsoleUser = (params) => {
  return postRequest(base + '/listConsoleUser', params)
}

// 查询系统用户详情
export const apiQueryConsoleUserInfo = (params) => {
  return postRequest(base + '/queryConsoleUserInfo', params)
}
// 编辑系统用户
export const apiEditConsoleUser = (params) => {
  return postRequest(base + '/editConsoleUser', params)
}

// 新建系统用户
export const apiCreateConsoleUser = (params) => {
  return postRequest(base + '/createConsoleUser', params)
}

// 查询用户部门及下级部门列表和人员列表
export const apiQueryLowerLevelList = (params) => {
  return postRequest(base + '/queryLowerLevelList', params)
}
// 编辑系统用户状态
export const apiEditConsoleUserStatus = (params) => {
  return postRequest(base + '/editConsoleUserStatus', params)
}
// 重置系统用户密码
export const apiResetConsoleUserPassword = (params) => {
  return postRequest(base + '/resetConsoleUserPassword', params)
}

export const apiQueryDepartmentTree = (params) => {
  return postRequest(base2 + '/queryDepartmentTree', params)
}
