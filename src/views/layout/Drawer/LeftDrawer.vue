<template>
  <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
    <!-- drawer content -->
  </q-drawer>
</template>
    
<script setup>
import { toRef, defineProps } from 'vue'

const props = defineProps({ leftDrawerOpen: Boolean })

const leftDrawerOpen = toRef(props.leftDrawerOpen)
</script>
    