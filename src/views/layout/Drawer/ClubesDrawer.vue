<template>
    <q-item-label header>Clubes</q-item-label>
    <template v-for="(club, index) in clubes" :key="index">
        <q-item clickable :active="club.name === activeClub" v-ripple @click="club.action">
            <q-item-section avatar>
                <q-icon name="groups" />
            </q-item-section>
            <q-item-section>
                {{ club.name }}
            </q-item-section>
        </q-item>
        <q-separator inset="item" v-if="index < (clubes.length - 1)" />
    </template>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeClub = ref('')


onMounted(() => {
    console.log(1)
})

const clubes = [
    {
        icon: 'inbox',
        name: 'Inbox',
        separator: true,
        action: () => {
            activeClub.value = 'Inbox';
            router.push({
                name: "test",
                params: {
                    id: 1,
                },
            })
        }
    },
    {
        icon: 'groups',
        name: 'Outbox',
        separator: false,
        action: () => {
            activeClub.value = 'Outbox';
            router.push({
                name: "home",
                params: {
                    id: 1,
                },
            })
        }
    },
]
</script>