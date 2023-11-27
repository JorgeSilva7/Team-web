<template>
  <q-item-label header>Clubes</q-item-label>
  <template v-for="(club, index) in clubes" :key="index">
    <q-item clickable :active="club._id === clubStore.active?._id" v-ripple @click="club.action">
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { list } from '../../../services/club.services'
import useClubStore from '@/stores/club'

const clubStore = useClubStore()
const router = useRouter()

const clubes = ref([])

onMounted(async () => {
  const { clubs: clubesResponse } = await list()
  clubes.value = clubesResponse.map((club) => ({
    ...club,
    icon: 'groups',
    separator: true,
    action: () => {
      clubStore.setActive(club)
      router.push({
        name: 'club'
      })
    }
  }))
})
</script>
