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
