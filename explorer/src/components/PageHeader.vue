<template>
  <header class="lg:flex gap-4">
    <div class="flex-auto space-y-2">
      <div class="flex items-center gap-4">
        <h1 class="font-light text-32 lg:text-42">{{ title }}</h1>
        <div class="flex items-center gap-2 pt-1 lg:pt-2">
          <slot name="title-labels" class="mt-16"></slot>
        </div>
      </div>
      <Copyable size="lg" :value="id" />
      <slot name="after-title"></slot>
      <GraphLinkTable class="pt-8" :links="links" v-if="!!links" />
    </div>
    <div class="hidden w-56 xl:w-72 lg:block lg:flex-shrink-0">
      <slot name="right-column"></slot>
    </div>
  </header>
</template>

<script setup lang="ts">
import Copyable from './Copyable.vue'
import GraphLinkTable from './GraphLinkTable.vue'

defineProps<{
  title: string;
  id: string;
  links?: GraphLink[];
}>()
</script>
