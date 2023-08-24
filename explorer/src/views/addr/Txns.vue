<template>
  <div class="flex items-center justify-center gap-2 p-4">
    <CaWarningSquare class="text-20 text-error" />
    <span class="text-helper">{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CaWarningSquare } from '@kalimahapps/vue-icons'
import { useAppStore } from '../../stores/app'

const store = useAppStore()

const message = computed(() => {
  return `Address history cannot be shown on the ${store.network} network.`
})
</script>