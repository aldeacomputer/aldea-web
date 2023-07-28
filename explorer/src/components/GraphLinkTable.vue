<template>
  <div class="space-y-2 md:space-y-0 md:table md:border-separate md:border-spacing-y-0.5">
    <div
      class="space-y-0.5 md:space-y-0 md:table-row"
      v-for="link of links">
      <div class="md:table-cell pr-4">{{ link.title }}</div>
      <div class="md:table-cell pr-4">
        <Copyable
          :to="link.url"
          :value="link.value" />        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Copyable from './Copyable.vue'

defineProps<{
  links: GraphLink[]
}>()
</script>
