<template>
  <div class="inline-flex items-center gap-2 bg-white/5 rounded-sm overflow-hidden">
    <div
      class="flex items-center justify-center w-7 h-7 bg-white/5"
      v-if="icon">
      <component :is="icon" class="text-14 text-secondary" />
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon?: any;
}>()
</script>