<script setup>
import { ref } from 'vue'
import useUserStore from '@/stores/user.store'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const error = ref(null)

async function login() {
  try {
    error.value = null;
    $q.loading.show()
    await userStore.signIn({ email: email.value, password: password.value })
    $q.loading.hide()
  } catch (err) {
    error.value = err
    $q.loading.hide()
  }
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <q-avatar>
              <img src="@/assets/images/team.png" alt="Team web" />
            </q-avatar>
            <div class="text-grey-9 text-h5 text-weight-bold q-mt-md">Sign In</div>
            <div class="text-grey-8">Sign in below to access to your Team Account</div>
          </q-card-section>
          <q-card-section>
            <q-input dense outlined v-model="email" label="Your email" for="login-email"
              @keypress.enter="login"></q-input>
            <q-input dense outlined class="q-mt-md" v-model="password" type="password" label="Password"
              for="login-password" @keypress.enter="login"></q-input>
          </q-card-section>
          <p v-if="error" class="text-negative text-center q-mt-md">{{ error.message }}</p>
          <q-card-section>
            <q-btn style="border-radius: 8px" color="dark" rounded size="md" label="Sign in" no-caps class="full-width"
              @click="login"></q-btn>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style>
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>
