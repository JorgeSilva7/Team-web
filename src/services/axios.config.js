import axios from 'axios'
import useUserStore from '@/stores/user'

const BASE_URL = import.meta.env.VITE_TEAM_API_URL

let axiosInstance = null

function getAxios() {
  if (!axiosInstance) {
    axiosInstance = axios.create({ baseURL: BASE_URL })
  }
  const userStore = useUserStore()
  if (userStore.token) {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${userStore.token}`
  }
  return axiosInstance
}

export default getAxios
