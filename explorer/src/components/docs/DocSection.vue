<template>
  <div class="space-y-6">
    <h2 class="text-32 font-light">{{ title }}</h2>
    <div class="space-y-10">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>()
</script>