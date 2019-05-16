import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import router from '@/router'
import { apiUserLoginOut } from '@/api/login'
axios.defaults.timeout = 50000

// 添加请求拦截器
axios.interceptors.request.use(config => {
  const headParams = JSON.parse(sessionStorage.getItem('userInfo') || null)
  let ContentTypeArr = ['multipart/form-data']
  if (!ContentTypeArr.includes(config.headers['Content-Type'])) {
    if (config.method === 'post') {
      config.data = Object.assign({}, headParams, config.data, handleGetMenuCode())
      // config.data = Object.assign({}, headParams, config.data)
    } else {
      config.params = Object.assign({}, headParams, config.params, handleGetMenuCode())
      // config.params = Object.assign({}, headParams, config.params)
    }
  }
  return config
}, err => {
  Message.error('请求超时~')
  return Promise.resolve(err)
})

// response 拦截器
axios.interceptors.response.use(response => {
  if (handleSpecialError(response)) {
    return Promise.reject(new Error('error'))
  } else {
    return response.data
  }
},
error => {
  console.log('err' + error)
  Message({
    message: error.message, type: 'error', duration: 5 * 1000
  })
  return Promise.reject(error)
})

// post请求
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: url,
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// get请求
export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: url,
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 接口请求成功未返回正确code码处理
function handleSpecialError (response) {
  if (!response.data || !response.data.code) return false
  const res = response.data
  // 用户没登录
  if (res.code === '-208999' && res.message === 'sessionId参数不能为空') {
    sessionStorage.removeItem('userInfo')
    router.push({ path: '/login' })
    return true
  }
  // 用户登录过期或登录失效
  if (res.code === '208100' || res.code === '208207') {
    MessageBox.confirm(
      '你已被登出，可以取消继续留在该页面，或者重新登录',
      '确定登出',
      {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(() => {
      apiUserLoginOut().then((res) => {
        if (res.code === '208999') {
          sessionStorage.removeItem('userInfo')
          router.push({ path: '/login' })
        }
      })
    })
    return true
  }
  if (res.code === '-208999') {
    Message.error({
      message: res.message, type: 'error'
    })
    return true
  }
  return false
}

let handleGetMenuCode = () => {
  let mainActivedTab = JSON.parse((sessionStorage.getItem('mainActivedTab')))
  return { pmenuCode: mainActivedTab.code }
}
