import useUserStore from './user.store'
import useClubStore from './club.store'
import getAxios from '../services/axios.config'

export default function logout() {
  const userStore = useUserStore()
  const clubStore = useClubStore()

  userStore.logout()
  clubStore.$reset()
  getAxios().defaults.headers['Authorization'] = null
}
