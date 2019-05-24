import { postRequest } from '@/config/network'
const base = '/bl/console/user'

// 访问控制
// 获取ip授权列表
export const apiListSysIpWhite = (params) => {
  return postRequest(base + '/listSysIpWhite', params)
}

// 修改ip授权列表
export const apiEditIpWhite = (params) => {
  return postRequest(base + '/editIpWhite', params)
}

// 新增ip授权列表
export const apiAddIpWhite = (params) => {
  return postRequest(base + '/addIpWhite', params)
}

// 新增ip授权列表
export const apiEditIpWhiteStatus = (params) => {
  return postRequest(base + '/editIpWhiteStatus', params)
}

// 新增账户授权
export const apiAddConsoleUserWhite = (params) => {
  return postRequest(base + '/addConsoleUserWhite', params)
}

// 修改账户授权
export const apiEditConsoleUserWhiteStatus = (params) => {
  return postRequest(base + '/editConsoleUserWhiteStatus', params)
}
// 账户授权列表
export const apiPageConsoleUserWhite = (params) => {
  return postRequest(base + '/pageConsoleUserWhite', params)
}

// 查询ip是否在白名单
export const apiCheckLoginIpWhite = (params) => {
  return postRequest(base + '/checkLoginIpWhite', params)
}