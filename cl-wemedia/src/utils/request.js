import axios from 'axios'
import BigInt from 'json-bigint'
import Router from '@/router'
import { Message } from 'element-ui'
import { getUser, setUser } from '@/utils/store'
import { API_USERIMAGES_ADD} from '@/constants/api'
import LoadingManage from './loading'
const service = axios.create({
  baseURL: '/wemedia',
  timeout: 10000,
  transformResponse (data) {
    if (data) { return BigInt.parse(data) }
  }

})
const IsImgUpload = config => {
  return (config.url === API_USERIMAGES_ADD && config.method === 'post') ;
}
service.interceptors.request.use(
  config => {
    const Authorization = getUser()
    if (Authorization && Authorization.token) {
      if (!IsImgUpload(config)) {
        config.headers['Content-Type'] = 'application/json'
      } else {
        config.headers['Content-Type'] = 'multipart/form-data'
      }
      config.headers.token = Authorization.token
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)
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
    LoadingManage.closeLoading() // 关闭loading弹层
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
        message = '手机号不正确'
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
    Message({
      message,
      type: 'warning',
      onClose: code == '401' ? () => Router.replace({ path: '/login' }) : null
    })
    return new Promise(function () {}) // 终止当前的promise链
  }
)

export default service
