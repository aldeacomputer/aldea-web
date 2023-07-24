<template>
  <button
    class="p-2 text-18 lg:text-20 link"
    @click="handleClick">
    <CaCopy />
  </button>
</template>

<script setup lang="ts">
import { CaCopy } from '@kalimahapps/vue-icons'

const props = defineProps<{
  value: string
}>()

async function handleClick() {
  return window.navigator.clipboard.writeText(props.value)
}
</script>