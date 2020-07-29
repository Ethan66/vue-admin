import { postRequest } from '@/utils/network'

export const apiLogin = (params?: object) => {
  return postRequest(`/api/login`, params)
}