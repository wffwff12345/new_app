import axios from 'axios'
import JSONbig from 'json-bigint'
import Router from '@/router'
import { Message } from 'element-ui'
import { getUser, setUser } from '@/utils/store'
const service = axios.create({
  baseURL: '/app',
  timeout: 10000,
  transformResponse (data) {
    if (data) { return JSONbig.parse(data) }
  }
})
service.interceptors.request.use(
  config => {
    const Authorization = getUser()
    if (Authorization && Authorization.token) {
      config.headers['Content-Type'] = 'application/json'
      config.headers.token = Authorization.token
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response
service.interceptors.response.use(
  response => {
    if (response.headers && response.headers.refresh_token) {
      const user = getUser()
      if (user) {
        user.token = response.headers.refresh_token
        setUser(user)
      }
    }
    if (response.data && response.data.code) {
      const code = response.data.code
      if (code > 49 && code < 70) {
        Router.replace({ path: '/login' })
      }
    }
    return response.data
  },
  error => {
    let message = ''
    const code = error.response ? error.response.status : ''
    switch (code) {
      case 400:
        message = '请求参数错误'
        break
      case 401:
        message = 'token过期或未传'
        break
      case 403:
        message = '操作失败'
        break
      case 404:
        message = '不正确'
        break
      case 500:
        message = '服务器异常'
        break
      case 507:
        message = '服务器数据库异常'
        break
      default :
        message = '处理异常'
    }
    if (message) {
      Message({
        message,
        type: 'warning',
        onClose: code === '401' ? () => Router.replace({ path: '/login' }) : null
      })
    }
    return new Promise(function () {})
  }
)

export default service
