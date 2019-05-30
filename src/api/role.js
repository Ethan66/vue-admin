import { postRequest } from '@/config/network'
const base = '/bl/console/api'

// 新增角色或角色分类
export const apiCreateConsoleRole = (params) => {
  return postRequest(base + '/createConsoleRole', params)
}

// 编辑角色或角色分类
export const apiEditeConsoleRole = (params) => {
  return postRequest(base + '/editeConsoleRole', params)
}
// 获取角色或者角色分类信息
export const apiGetConsoleRoleById = (params) => {
  return postRequest(base + '/getConsoleRoleById', params)
}

// 删除角色或角色分类
export const apiDelConsoleRole = (params) => {
  return postRequest(base + '/delConsoleRole', params)
}

// 获取角色信息树
export const apiGetAllRoleRequestTree = (params) => {
  return postRequest(base + '/getAllRoleRequestTree', params)
}

// 按照角色或分类查询账号信息（表格数据）
export const apiPageQueryUserRole = (params) => {
  return postRequest(base + '/pageQueryUserRole', params)
}

// 账号分配角色
export const apiGrantUserRole = (params) => {
  return postRequest(base + '/grantUserRole', params)
}
// 删除账号某个角色
export const apiDelUserRole = (params) => {
  return postRequest(base + '/delUserRole', params)
}

// 角色权限
// 获取角色所有资源权限
export const apiGetAllPermissionResource = (params) => {
  return postRequest(base + '/getAllPermissionResource', params)
}

// 设置角色权限
export const apiSetRolePermissionResource = (params) => {
  return postRequest(base + '/setRolePermissionResource', params)
}

// 获取角色字段
export const apiGetRolePermissionFields = (params) => {
  return postRequest(base + '/getRolePermissionFields', params)
}

// 设置角色字段
export const apiSetRolePermissionFields = (params) => {
  return postRequest(base + '/setRolePermissionFields', params)
}

// 查询部门列表
export const apiQueryDepartmentList = (params) => {
  return postRequest(base + '/queryDepartmentList', params)
}

// 角色分配批量删除
export const apiEditConsoleUserStatus = (params) => {
  return postRequest(base + '/editConsoleUserStatus', params)
}
