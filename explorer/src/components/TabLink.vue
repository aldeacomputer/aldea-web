<template>
  <RouterLink
    :to="to"
    class="inline-flex flex-grow items-center px-6 py-4 gap-3 text-neutral-500 border-b border-neutral-700 transition-colors">
    <component :is="icon" />
    <span><slot></slot></span>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'

defineProps<{
  to: RouteLocationRaw;
  icon: any;
}>()
</script>

<style scoped>
.router-link-exact-active {
  @apply text-neutral-300 border-sky-300;
}
</style>