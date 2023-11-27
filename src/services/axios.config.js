import axios from 'axios'
import useUserStore from '@/stores/user.store'
import logout from '@/stores/logout'

const BASE_URL = import.meta.env.VITE_TEAM_API_URL

let axiosInstance = null

const resInterceptor = (response) => response

const errorInterceptor = (error) => {
  if ([403, 401].includes(error.response.status)) {
    logout()
  }

  return Promise.reject(error)
}

function getAxios() {
  if (!axiosInstance) {
    axiosInstance = axios.create({ baseURL: BASE_URL })
    axiosInstance.interceptors.response.use(resInterceptor, errorInterceptor)
  }
  const userStore = useUserStore()
  if (userStore.token) {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${userStore.token}`
  }

  return axiosInstance
}

export default getAxios
