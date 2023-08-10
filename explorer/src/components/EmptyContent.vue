<template>
  <div class="flex items-center gap-3 p-4 bg-layer-01 rounded-sm">
    <CaWarningSquare class="text-20 text-error" />
    <span class="text-helper">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { CaWarningSquare } from '@kalimahapps/vue-icons'

defineProps<{
  text: string;
}>()
</script>