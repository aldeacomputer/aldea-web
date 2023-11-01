<template>
  <div class=" bg-gray-90 py-24 md:py-32 px-4">
      <h3 class="mb-16 font-mono text-base text-gray-50 text-center">See more:</h3>
      <div class="flex flex-col md:flex-row md:px-20 xl:px-60 gap-4 mb-16">
        <NuxtLink
          class="p-4 flex-auto md:w-1/3 flex flex-col border border-gray-50 hover:border-blue-interactive rounded cursor-pointer"
          v-for="item of items"
          :to="item.link">
          <span class="self-end text-cream-20">
            <CaArrowUpRight class="w-5 h-5" />
          </span>
          <h3 class="mt-2 mb-3 font-mono text-3xl font-light text-cream-20">
          {{ item.title }}
          </h3>
          <p class="font-mono text-sm text-cream-20">{{ item.description }}</p>
        </NuxtLink>
      </div>
  </div>
</template>
  
<script setup lang="ts">
import { CaArrowUpRight } from '~/icons'

defineProps<{
  items: RelatedItem[];
}>()

</script>