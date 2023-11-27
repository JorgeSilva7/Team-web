<template>
  <q-page padding>
    <div v-if="clubStore.active" class="q-pa-md">
      <span class="text-caption">Club</span>
      <br>
      <span class="text-h3">{{ clubStore.active.name }}</span>
      <br><br>
      <members-card :isLoading="membersIsLoading" :members="members"></members-card>
      <subscriptions-card :isLoading="subscriptionsIsLoading" :subscriptions="subscriptions"></subscriptions-card>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import useClubStore from '@/stores/club.store'
import { listMembers, listSubscriptions } from '../services/club.services'
import MembersCard from '@/components/MembersCard.vue';
import SubscriptionsCard from '@/components/SubscriptionsCard.vue';

const clubStore = useClubStore()

const members = ref([])
const subscriptions = ref([])
const subscriptionsIsLoading = ref(true)
const membersIsLoading = ref(true)

async function getMembers() {
  if (clubStore.active) {
    membersIsLoading.value = true
    const { members: membersResponse } = await listMembers(clubStore.active._id)
    membersIsLoading.value = false
    members.value = membersResponse
  }
}

async function getSubscriptions() {
  if (clubStore.active) {
    subscriptionsIsLoading.value = true
    const { subscriptions: subscriptionsResponse } = await listSubscriptions(clubStore.active._id)
    subscriptionsIsLoading.value = false

    subscriptions.value = subscriptionsResponse
  }
}

onMounted(async () => {
  getMembers()
  getSubscriptions()
})

watch(() => clubStore.active, async () => {
  getMembers();
  getSubscriptions();
});

watch(() => clubStore.addedMember, async () => {
  getMembers();
});

watch(() => clubStore.addedSubscription, async () => {
  getSubscriptions();
});
</script>