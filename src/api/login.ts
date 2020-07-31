import { postRequest, getRequest } from '@/utils/network'

export const apiLogin = (params?: object) => {
  return postRequest(`/api/login`, params)
}

// 获取IP
export const apiGetIp = () => {
  return getRequest('//myip.ipip.net')
}

// 注册
export const apiRegister = (params) => {
  return postRequest(`/api/register`, params)
}

// 获取菜单按钮权限
export const apiGetUserAuthMenu = (reqParams) => {
  return postRequest(`api/getUserAuthMenu`, reqParams)
}
