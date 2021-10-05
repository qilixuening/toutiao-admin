import axios from 'axios'

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

// request.interceptors.response.use(
//   function (res) {
//     console.log(res.data)
//     return res
//   },
//   function (error) {
//     return Promise.reject(error)
//   }
// )

export default request
