<template>
  <button
    class="link"
    :class="size || 'p-2 text-18 lg:text-20'"
    @click.prevent="handleClick">
    <CaCopy />
  </button>
</template>

<script setup lang="ts">
import { CaCopy } from '@kalimahapps/vue-icons'

const props = defineProps<{
  size?: string;
  value: string;
}>()

async function handleClick() {
  return window.navigator.clipboard.writeText(props.value)
}
</script>