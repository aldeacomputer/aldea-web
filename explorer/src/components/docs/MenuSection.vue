<template>
  <div>
    <h4 class="mb-2 text-16 font-semibold">{{ title }}</h4>
    <ul class="text-14 space-y-2">
      <slot />
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>()
</script>