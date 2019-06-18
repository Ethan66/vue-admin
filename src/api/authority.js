import { postRequest } from '@/config/network'
const base = '/bl/console/api'

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

// 查询数据权限列表
export const apiQueryMenuPageList = (params) => {
  return postRequest(base + '/queryMenuPageList', params)
}

// 编辑数据权限
export const apiOperateMenuDataRule = (params) => {
  return postRequest(base + '/operateMenuDataRule', params)
}
