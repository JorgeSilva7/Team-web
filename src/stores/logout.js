import useUserStore from './user'
import useClubStore from './club'
import getAxios from '../services/axios.config'

export default function logout() {
  const userStore = useUserStore()
  const clubStore = useClubStore()

  userStore.$reset()
  clubStore.$reset()
  getAxios().defaults.headers['Authorization'] = null
}
