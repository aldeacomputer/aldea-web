<template>
  <div>
    <h3 class="mb-16 font-mono text-sm text-gray-50 text-center">Meet the team</h3>
    <div class="flex flex-wrap justify-around gap-4">
      <div class="mb-8 shrink-0" v-for="item of items">
        <img :src="item.image" :alt="item.name" width="150" height="150" class="block mb-3">
        <h4 class="mb-2 text-xl">{{ item.name }}</h4>
        <div class="font-mono text-sm text-gray-50">{{ item.role }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: TeamMember[];
}>()
</script>
