import { postRequest } from '@/config/network'
const base = '/bl/console/api'

// 查询金融产品
export const apiListProduct = (params) => {
  return postRequest(base + '/listProduct', params)
}

// 获取金融产品信息
export const apiGetProduct = (params) => {
  return postRequest(base + '/getProduct', params)
}

// 创建或编辑金融产品
export const apiCreateOrEditeProduct = (params) => {
  return postRequest(base + '/createOrEditeProduct', params)
}

// 删除金融产品
export const apiDeleteProduct = (params) => {
  return postRequest(base + '/deleteProduct', params)
}

// 获取产品形态列表
export const apiPageQueryProductForm = (params) => {
  return postRequest(base + '/pageQueryProductForm', params)
}

// 获取产品形态信息
export const apiGetProductFrom = (params) => {
  return postRequest(base + '/getProductFrom', params)
}

// 创建或编辑产品形态
export const apiCreateOrEditeProductForm = (params) => {
  return postRequest(base + '/createOrEditeProductForm', params)
}

// 设置产品形态状态
export const apiSetProductFormStatus = (params) => {
  return postRequest(base + '/setProductFormStatus', params)
}

// 查看产品形态历史信息
export const apiListHistoryProductFrom = (params) => {
  return postRequest(base + '/listHistoryProductFrom', params)
}

// 删除产品形态
export const apiDeleteProductFrom = (params) => {
  return postRequest(base + '/deleteProductFrom', params)
}
