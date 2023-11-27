<template>
    <q-layout view="hHh LpR fFf">
        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="toggleShowLeftDrawer" />

                <q-toolbar-title id="toolbar">
                    <q-avatar>
                        <img src="@/assets/images/team.png" alt="Team web" />
                    </q-avatar>
                    Team Web {{ clubStore.active && `- ${clubStore.active.name}` }}
                </q-toolbar-title>

                <q-btn flat round dense icon="logout" @click="logout" class="logout" />
            </q-toolbar>
        </q-header>

        <q-drawer show-if-above side="left" bordered :breakpoint="0" :model-value="showLeftDrawer">
            <q-scroll-area class="fit">
                <q-list padding class="menu-list">
                    <q-item :clickable="false">
                        <q-item-section avatar>
                            <q-icon name="profile" />
                        </q-item-section>
                        <q-item-section v-if="userStore.user">
                            {{ userStore.user.name }} <br />
                            {{ userStore.user.email }}
                        </q-item-section>
                    </q-item>

                    <q-item clickable @click="handlerShowAddClub" class="text-green" for="add-club">
                        <q-item-section avatar>
                            <q-icon name="group_add" />
                        </q-item-section>
                        <q-item-section class="text-weight-medium"> Add Club </q-item-section>
                    </q-item>

                    <clubes-drawer />

                    <q-separator spaced />

                    <q-item disable>
                        <q-item-section avatar>
                            <q-icon name="settings" />
                        </q-item-section>
                        <q-item-section> Unavailable </q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>
        </q-drawer>

        <q-dialog v-model="showAddClub" no-backdrop-dismiss>
            <q-card style="min-width: 350px">
                <q-card-section>
                    <div class="text-h6">Add club</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input v-model="club.name" autofocus @keyup.enter="addClub" label="Club name" />
                    <q-input class='q-mt-md' v-model="club.description" autofocus @keyup.enter="addClub"
                        label="Club description" />
                </q-card-section>

                <p v-if="error" class="text-negative text-center error">{{ error.message }}</p>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup />
                    <q-btn flat label="Add Club" @click="addClub" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import useUserStore from '@/stores/user.store'
import useClubStore from '@/stores/club.store'
import ClubesDrawer from './Drawer/ClubesDrawer.vue'
import logoutLogic from '../../stores/logout'
import { useRouter } from 'vue-router'
import { addClub as addClubService } from '../../services/club.services';
import { useQuasar } from 'quasar'

const userStore = useUserStore()
const clubStore = useClubStore()
const $q = useQuasar()
const router = useRouter()

const initClub = { name: '', description: '' }

const showLeftDrawer = ref(true)
const showAddClub = ref(false)
const error = ref(null)
const club = ref({ ...initClub })

function handlerShowAddClub() {
    club.value = { ...initClub }
    showAddClub.value = true;
}

async function addClub() {
    error.value = null
    $q.loading.show()
    try {
        const { club: addedClub } = await addClubService(club.value);
        showAddClub.value = false;
        club.value = { ...initClub }
        clubStore.setAddedClub(addedClub)
        $q.loading.hide()
        $q.notify({ message: 'Club added successfully', type: 'positive' })
    } catch (err) {
        $q.loading.hide()
        error.value = err;
    }
}

function logout() {
    logoutLogic()
    router.replace({ name: 'login' })
}

function toggleShowLeftDrawer() {
    showLeftDrawer.value = !showLeftDrawer.value
}
</script>

<style lang="sass" scoped>
.menu-list .q-item
  border-radius: 0 32px 32px 0
</style>
