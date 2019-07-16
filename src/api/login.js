import { getRequest, postRequest } from '@/config/network'
import config from './config'
const baseuser = '/bl/console/user'
const { baseUrl } = config

// 获取IP
export const apiGetIp = (params) => {
  return getRequest('//myip.ipip.net', params)
}

// 注册
export const apiRegister = (params) => {
  return postRequest(`${baseUrl}/register`, params)
}

// 登录
export const apiLogin = (params) => {
  return postRequest(`${baseUrl}/login`, params)
}

// 获取菜单按钮权限
export const apiGetUserResource = (reqParams) => {
  return postRequest(`${baseUrl}/getUserResource`, reqParams)
}

// 获取用户字段权限
export const apiGetUserFields = (reqParams) => {
  return postRequest(`${baseUrl}/getUserFields`, reqParams)
}

// 登出
export const apiUserLoginOut = (reqParams) => {
  return postRequest(baseuser + '/userLoginOut', reqParams)
}

// 登录状态下修改密码
export const apiUserModifyPassword = (reqParams) => {
  return postRequest(baseuser + '/userModifyPassword', reqParams)
}
