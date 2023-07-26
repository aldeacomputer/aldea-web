<template>
  <RouterLink
    class="inline-flex items-center h-7 px-2 gap-2 link border bg-white/10 border-sky-300 hover:bg-white/20 hover:border-sky-200 rounded"
    :to="link">
    <component :is="icon" class="text-16" />
    <span class="font-sans text-14 whitespace-nowrap">{{ shortId }}</span>
    <CopyButton :value="value" size="text-16" />
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CaBox, CaPassword, CaSettings } from '@kalimahapps/vue-icons'
import CopyButton from './CopyButton.vue'

const props = defineProps<{
  type: 'jig' | 'pkg' | 'tx' | 'addr';
  value: string;
}>()

const link = computed(() => {
  switch (props.type) {
    case 'addr':
      return { name: props.type, params: { addr: props.value } }
    case 'jig':
    case 'pkg':
      return { name: props.type, params: { id: props.value } }
    default: return '/'
  }
})

const icon = computed(() => {
  switch (props.type) {
    case 'addr': return CaPassword
    case 'pkg': return CaBox
    default: return CaSettings
  }
})

const shortId = computed(() => {
  if (props.type === 'addr') {
    return `${props.value.slice(0, 10)}…${props.value.slice(-7)}`
  } else {
    return `${props.value.slice(0, 7)}…${props.value.slice(64-7)}`
  }
})
</script>