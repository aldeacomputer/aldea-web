<template>
  <span
    class="inline-flex items-center h-7 px-3 gap-2 text-14 bg-neutral-800 border-l-4 rounded-sm"
    :class="{
      'border-l-4': !noBorder,
      'text-blue-400 border-l-blue-400': type === 'info',
      'text-green-400 border-l-green-400': type === 'success',
      'text-yellow-200 border-l-yellow-200': type === 'warning',
      'text-red-400 border-l-red-400': type === 'error',
    }">
    <span><slot></slot></span>
    <component :is="icon" v-if="icon" />
  </span>
</template>

<script setup lang="ts">
type LabelType = 'info' | 'success' | 'warning' | 'error'

defineProps<{
  type?: LabelType,
  icon?: any,
  noBorder?: boolean
}>()
</script>