import { getRequest, postRequest } from '@/config/network'
const base = '/bl/console/api'

// 获取验证码
export const apiGetCode = (params) => {
  return postRequest('/bl/console/user/getVerificationCode', params)
}

// 获取IP
export const apiGetIp = (params) => {
  return getRequest('//myip.ipip.net', params)
}

// 检查IP
export const apiCheckIp = (params) => {
  return postRequest('/bl/console/user/checkLoginIpWhite', params)
}

// 登录
export const apiUserLogin = (reqParams) => {
  return postRequest('/bl/console/user/userLogin', reqParams)
}

// 短信验证码
export const apiGetSmsCode = (reqParams) => {
  return postRequest('/bl/console/user/getVerificationCode', reqParams)
}

// 登出
export const apiUserLoginOut = (reqParams) => {
  return postRequest(base + '/userLoginOut', reqParams)
}

// 获取菜单按钮权限
export const apiGetUserPermissionResource = (reqParams) => {
  return postRequest(base + '/getUserPermissionResource', reqParams)
}
