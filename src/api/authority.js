import { postRequest } from '@/config/network'
const base = '/bl/console/api'
const baseuser = '/bl/console/user'

// 访问控制
// 获取ip授权列表
export const apiListSysIpWhite = (params) => {
  return postRequest(baseuser + '/listSysIpWhite', params)
}

// 修改ip授权列表
export const apiEditIpWhite = (params) => {
  return postRequest(baseuser + '/editIpWhite', params)
}

// 新增ip授权列表
export const apiAddIpWhite = (params) => {
  return postRequest(baseuser + '/addIpWhite', params)
}

// 新增ip授权列表
export const apiEditIpWhiteStatus = (params) => {
  return postRequest(baseuser + '/editIpWhiteStatus', params)
}

// 新增账户授权
export const apiAddConsoleUserWhite = (params) => {
  return postRequest(baseuser + '/addConsoleUserWhite', params)
}

// 修改账户授权
export const apiEditConsoleUserWhiteStatus = (params) => {
  return postRequest(baseuser + '/editConsoleUserWhiteStatus', params)
}
// 账户授权列表
export const apiPageConsoleUserWhite = (params) => {
  return postRequest(baseuser + '/pageConsoleUserWhite', params)
}

// 查询ip是否在白名单
export const apiCheckLoginIpWhite = (params) => {
  return postRequest(baseuser + '/checkLoginIpWhite', params)
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

// 查询数据权限列表
export const apiQueryMenuPageList = (params) => {
  return postRequest(base + '/queryMenuPageList', params)
}

// 编辑数据权限
export const apiOperateMenuDataRule = (params) => {
  return postRequest(base + '/operateMenuDataRule', params)
}

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

// 角色分配批量删除
export const apiBatchClearUserRole = (params) => {
  return postRequest(base + '/batchClearUserRole', params)
}

// 查询系统用户列表
export const apiListConsoleUser = (params) => {
  return postRequest(baseuser + '/listConsoleUser', params)
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
