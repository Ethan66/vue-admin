import { getRequest, postRequest } from '@/config/network'
import config from './config'
const { baseUrl } = config

// get接口
export const apiExampleGet = (params) => {
  return getRequest(`${baseUrl}/example/get`, params)
}

// post接口
export const apiExamplePost = (params) => {
  return postRequest(`${baseUrl}/example/post`, params)
}
