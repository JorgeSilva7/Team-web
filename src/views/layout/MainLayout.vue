<template>
    <q-layout view="hHh LpR fFf">
        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="toggleShowLeftDrawer" />

                <q-toolbar-title>
                    <q-avatar>
                        <img src="@/assets/images/team.png" alt="Team web" />
                    </q-avatar>
                    Team Web - Club
                </q-toolbar-title>

                <q-btn flat round dense icon="logout" />
            </q-toolbar>
        </q-header>

        <q-drawer show-if-above side="left" bordered :breakpoint="0" :model-value="showLeftDrawer">
            <q-scroll-area class="fit">

                <q-list padding class="menu-list">

                    <q-item :clickable="false">
                        <q-item-section avatar>
                            <q-icon name="profile" />
                        </q-item-section>
                        <q-item-section>
                            Juanito pozo
                        </q-item-section>
                    </q-item>

                    <q-item clickable>
                        <q-item-section avatar>
                            <q-icon name="group_add" />
                        </q-item-section>
                        <q-item-section>
                            Agregar Club
                        </q-item-section>
                    </q-item>

                    <clubes-drawer />

                    <q-separator spaced />

                    <q-item disable>
                        <q-item-section avatar>
                            <q-icon name="settings" />
                        </q-item-section>
                        <q-item-section>
                            No disponible
                        </q-item-section>
                    </q-item>

                </q-list>
            </q-scroll-area>

        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import ClubesDrawer from './Drawer/ClubesDrawer.vue';

const showLeftDrawer = ref(true)

function toggleShowLeftDrawer() {
    showLeftDrawer.value = !showLeftDrawer.value
}
</script>

<style lang="sass" scoped>
.menu-list .q-item
  border-radius: 0 32px 32px 0
</style>