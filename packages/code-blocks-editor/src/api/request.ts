import axios from 'axios'
import router from '@/router/index'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { baseUrl } from '@/common/baseUrl'

const request = axios.create({
  baseURL: baseUrl,
  timeout: 300000
})

request.interceptors.request.use(
  (config) => {
    const user = useUserStore()
    if (user.token) config.headers['Authorization'] = 'Bearer ' + user.token
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    if (response.data?.code === 401) {
      const user = useUserStore()
      user.clearInfo()
      router.replace('/login')
      ElMessage.error('登录已过期，请重新登录')
      return
    }

    if (response.data?.code === 403) {
      const user = useUserStore()
      user.clearInfo()
      router.replace('/login')
      ElMessage.error('无权限')
      return
    }

    if (response.data?.code === 200) {
      response.data['status'] = true
    }

    if (!response.data['status']) {
      ElMessage.error(response.data.message)
    }

    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
