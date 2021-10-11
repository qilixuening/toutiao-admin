import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/',

  // 原始数据中的id为超出js表示范围的整形数据，直接用json.parse处理会出问题，因此可以将json字符串的id数据由整形变为字符串，
  transformResponse: [(data) => {
    if (data) {
      const rectifiedString = data.replace(/("id":\s)(\d+)(,\s+)/ig, (_, $1, $2, $3) => `${$1}"${$2}"${$3}`)
      return JSON.parse(rectifiedString)
    } else {
      return data
    }
  }]
})

request.interceptors.request.use(
  function (config) {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  function (res) {
    return res
  },
  function (error) {
    const status = error.response.status
    // 用户伪造了一个登录用的user数据，导致登陆出现401错误
    if (status === 401) {
      window.localStorage.removeItem('user')
      router.push('/login')
      Message.error('登录状态无效')
    } else if (status === 400) {
      Message.error('参数错误')
    } else if (status === 403) {
      Message.error('没有操作权限')
    } else if (status >= 400) {
      Message.warning('服务端内部异常，请稍后尝试')
    }
    return Promise.reject(error)
  }
)

export default request
