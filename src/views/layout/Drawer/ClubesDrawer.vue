<template>
  <q-item-label header>Clubes</q-item-label>
  <template v-for="(club, index) in clubes" :key="index">
    <q-item clickable :active="club._id === clubStore.active?._id" v-ripple @click="club.action" :id="club._id">
      <q-item-section avatar>
        <q-icon name="groups" />
      </q-item-section>
      <q-item-section>
        {{ club.name }}
      </q-item-section>
    </q-item>
    <q-separator inset="item" v-if="index < clubes.length - 1" />
  </template>
  <q-item v-if="!clubes || !clubes.length" disable>
    <q-item-section avatar> &nbsp; </q-item-section>
    <q-item-section> Sin clubes </q-item-section>
  </q-item>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { list } from '../../../services/club.services'
import useClubStore from '@/stores/club.store'
import useUserStore from '@/stores/user.store'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const clubStore = useClubStore()
const userStore = useUserStore()
const router = useRouter()

const clubes = ref([])

function setActiveAction(club) {
  clubStore.setActive(club)
  router.push({
    name: 'club'
  })
}

async function getClubes() {
  if (userStore.token) {
    $q.loading.show({ group: 'clubes' })
    try {
      const { clubs: clubesResponse } = await list();

      clubes.value = clubesResponse.map((club) => ({
        ...club,
        icon: 'groups',
        separator: true,
        action: () => setActiveAction(club)
      }))

      $q.loading.hide('clubes')
    } catch (err) {
      $q.loading.hide('clubes')
    }
  }
}

onMounted(async () => {
  await getClubes();
})

watch(() => clubStore.addedClub, async (newClub) => {
  await getClubes();
  setActiveAction(newClub);
});
</script>
