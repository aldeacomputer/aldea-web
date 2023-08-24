<template>
  <component
    :is="type"
    :to="to"
    class="inline-flex items-center h-12 px-4 gap-4 text-primary bg-blue-60 hover:bg-blue-50 transition-colors">
    <span class="text-14 whitespace-nowrap"><slot></slot></span>
    <component :is="icon" v-if="icon" />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouteLocationRaw, RouterLink } from 'vue-router'

const props = defineProps<{
  to?: RouteLocationRaw;
  icon?: any;
}>()

const type = computed(() => {
  return props.to ? RouterLink : 'button'
})
</script>