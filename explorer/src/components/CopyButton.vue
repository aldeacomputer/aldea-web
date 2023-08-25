<template>
  <button
    class="link"
    :class="{
      'p-1 text-16': size === 'sm',
      'p-2 text-18 lg:text-20': size === 'md' || size === 'lg',
    }"
    @click.prevent="handleClick">
    <CaCopy />
  </button>
</template>

<script setup lang="ts">
import { CaCopy } from '@kalimahapps/vue-icons'

const props = withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg';
  value: string;
}>(), {
  size: 'md'
})

const emit = defineEmits<{
  'copied': [value: string];
}>()

async function handleClick() {
  await window.navigator.clipboard.writeText(props.value)
  emit('copied', props.value)
}
</script>