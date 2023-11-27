import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { login } from '../services/auth.services'

const useUserStore = defineStore(
  'user',
  () => {
    const user = ref(null)
    const token = ref(null)
    const router = useRouter()

    async function signIn({ email, password }) {
      const result = await login({ email, password })
      token.value = result.token
      user.value = result.user
      router.replace({ name: 'home' })
    }

    function $reset() {
      user.value = null
      token.value = null
    }

    async function logout() {
      $reset()
      router.replace({ name: 'login' })
    }

    return { user, token, signIn, $reset, logout }
  },
  { persist: true }
)

export default useUserStore
