<template>
  <div v-if="clubStore.active">
    <h1>{{ clubStore.active.name }}</h1>
    <ul>
      <li v-for="member in members" :key="member._id">{{ member.name }}</li>
    </ul>
  </div>
</template>

<style></style>

<script setup>
import { onMounted, ref } from 'vue'
import useClubStore from '@/stores/club'
import { listMembers } from '../services/club.services'

const clubStore = useClubStore()

const members = ref([])

async function getMembers() {
  if (clubStore.active) {
    const { members: membersResponse } = await listMembers(clubStore.active._id)
    members.value = membersResponse
  }
}

onMounted(async () => {
  await getMembers()
})

clubStore.$subscribe(async () => {
  await getMembers()
})
</script>
