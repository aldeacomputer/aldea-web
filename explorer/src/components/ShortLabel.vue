<template>
  <span class="inline-flex items-center h-7 px-2 gap-2 border bg-white/10 border-neutral-500 rounded">
    <component :is="icon" class="text-16" v-if="icon" />
    <span class="font-sans text-14 whitespace-nowrap">{{ shortId }}</span>
    <CopyButton :value="value" size="text-16" />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CopyButton from './CopyButton.vue'

const props = defineProps<{
  icon?: any;
  value: string;
}>()

const shortId = computed(() => {
  return `${props.value.slice(0, 7)}…${props.value.slice(-7)}`
})
</script>