<template>
      <h3 class="mb-16 font-mono text-base text-gray-50 text-center">See more:</h3>
      <div class="flex flex-col md:flex-row md:px-20 xl:px-60 gap-4 mb-16">
        <div class="p-4 flex-auto md:w-1/3 flex flex-col border border-gray-50 hover:border-blue-interactive rounded"
        v-for="item of items">
          <span class="self-end text-cream-20">
            <component :is="item.icon" class="w-5 h-5" />
          </span>
          <h3 class="mt-2 mb-3 font-mono text-4xl font-light text-cream-20">
          {{ item.title }}
          </h3>
          <p class="font-mono text-sm text-cream-20">{{ item.description }}</p>
        </div>
      </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    items: RelatedItem[];
  }>()
  
  </script>