<template>
  <div class="inline-flex items-center bg-white/5 rounded-sm overflow-hidden">
    <div
      class="flex items-center justify-center shrink-0 w-7 h-7 bg-white/5"
      v-if="icon">
      <component :is="icon" class="text-14 text-secondary" />
    </div>
    <div class="px-2">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon?: any;
}>()
</script>