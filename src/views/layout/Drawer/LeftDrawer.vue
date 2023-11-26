<template>
  <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
    <!-- drawer content -->
  </q-drawer>
</template>
    
<script setup>
import { toRef, defineProps, watch } from 'vue'

const props = defineProps({ leftDrawerOpen: Boolean })
console.log(props)
const leftDrawerOpen = toRef(props.leftDrawerOpen)

watch(props.leftDrawerOpen, async (test, old) => {
  console.log(test, old)
})
</script>
    