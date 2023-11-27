<script setup>
import useUserStore from '../stores/user.store';

const userStore = useUserStore();
</script>

<template>
  <q-page padding>
    <h2>Welcome {{ userStore.user?.name }},</h2>
    <q-banner class="bg-primary text-white">
      You don't have notifications 😊
    </q-banner>
    <br>
    <p class="text-body2">Please select a club from the left menu</p>
  </q-page>
</template>
