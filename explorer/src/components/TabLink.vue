<template>
  <RouterLink
    :to="to"
    class="inline-flex flex-grow items-center px-6 py-4 gap-3 text-helper border-b-2 border-gray-70 hover:text-primary transition-colors">
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
  @apply text-primary border-blue-40;
}
</style>