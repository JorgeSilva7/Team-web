import { ref } from 'vue'
import { defineStore } from 'pinia'

const useClubStore = defineStore(
  'club',
  () => {
    const active = ref(null)

    function setActive(club) {
      active.value = club
    }

    function $reset() {
      active.value = null
    }

    return { active, setActive, $reset }
  },
  { persist: true }
)

export default useClubStore
