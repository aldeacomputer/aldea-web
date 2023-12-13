<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      class="p-4 flex flex-col border border-gray-50 rounded"
      v-for="item of items">
      <span
        class="self-end"
        :class="{'text-blue-lighter': !isFuture(item.year)}">
        <component :is="item.icon" class="w-5 h-5" />
      </span>
      
      <h3
        class="mt-2 mb-3 font-mono text-4xl font-light"
        :class="isFuture(item.year) ? 'text-gray-30' : 'text-blue-lighter'">
        {{ item.year }}
      </h3>
      <p class="font-mono text-sm">{{ item.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: TimelineItem[];
}>()

const isFuture = (year: number): boolean => year > new Date().getFullYear()
</script>