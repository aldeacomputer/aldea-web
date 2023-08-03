<template>
  <span
    class="inline-flex items-center  px-3 gap-2 bg-layer-01 rounded-sm"
    :class="{
      'h-7': size === 'sm',
      'h-10': size === 'md',
      'h-12': size === 'lg',
      'text-secondary': !type,
      'flex-row-reverse': !!type,
      'border-l-4': !!type || !!border,
      'border-l-info': type === 'info' || border === 'info',
      'border-l-success': type === 'success' || border === 'success',
      'border-l-warning': type === 'warning' || border === 'warning',
      'border-l-error': type === 'error' || border === 'error',
      'text-info': type === 'info',
      'text-success': type === 'success',
      'text-warning': type === 'warning',
      'text-error': type === 'error',
    }">
    <component :is="icon" v-if="icon" />
    <span class="text-14">
      <slot></slot>
    </span>
  </span>
</template>

<script setup lang="ts">
type LabelType = 'info' | 'success' | 'warning' | 'error'
type LabelSize = 'sm' | 'md' | 'lg'

withDefaults(defineProps<{
  type?: LabelType;
  icon?: any;
  border?: LabelType;
  size?: LabelSize;
}>(), {
  size: 'md'
})
</script>