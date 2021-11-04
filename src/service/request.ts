import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  responseType: 'json',
  timeout: 5 * 1000,
  headers: { 'Content-Type': 'application/json' },
})

instance.interceptors.request.use(
  (config) => {
    if (localStorage.isLogin) {
      config.headers.satoken = localStorage.tokenValue
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (res) => {
    if (res.data?.code !== 200) {
      console.log({ code: res.data.code, msg: res.data.msg, detail: res })
    }
    return res
  },
  (e) => {
    console.log({
      url: e.config.url,
      code: e.code,
      detail: e,
    })
  },
)
export default instance
