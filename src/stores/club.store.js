import { ref } from 'vue'
import { defineStore } from 'pinia'

const useClubStore = defineStore(
  'club',
  () => {
    const active = ref(null)
    const addedClub = ref(null)
    const addedMember = ref(null)
    const addedSubscription = ref(null)

    function setActive(club) {
      active.value = club
    }

    function setAddedClub(club) {
      addedClub.value = club
    }

    function setAddedMember(member) {
      addedMember.value = member
    }

    function setAddedSubscription(subscription) {
      addedSubscription.value = subscription
    }

    function $reset() {
      active.value = null
      addedClub.value = null
      addedMember.value = null
      addedSubscription.value = null
    }

    return {
      active,
      addedClub,
      addedMember,
      addedSubscription,
      setActive,
      $reset,
      setAddedClub,
      setAddedMember,
      setAddedSubscription
    }
  },
  { persist: true }
)

export default useClubStore
