<template>
  <EmptyContent :text="message" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '../../stores/app'
import EmptyContent from '../../components/EmptyContent.vue'

const store = useAppStore()

const message = computed(() => {
  return `Jig history cannot be shown on the ${store.network} network.`
})
</script>