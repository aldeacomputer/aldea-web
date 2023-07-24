<template>
  <header class="lg:grid grid-cols-12 gap-4">
    <div class="space-y-2 lg:col-span-10 xl:col-span-9">
      <div class="flex items-center gap-4">
        <h1 class="font-light text-32 lg:text-42">{{ title }}</h1>
        <div class="flex items-center gap-2 pt-1 lg:pt-2">
          <slot name="title-labels" class="mt-16"></slot>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <div class="lg:text-20 break-all">{{ id }}</div>
        <CopyButton :value="id" />
      </div>
      <slot name="after-title"></slot>
      <GraphLinkTable class="pt-8" :links="links" v-if="!!links" />
    </div>
    <div class="hidden lg:block lg:col-span-2 xl:col-span-3">
      <slot name="right-column"></slot>
    </div>
  </header>
</template>

<script setup lang="ts">
import CopyButton from '../components/CopyButton.vue'
import GraphLinkTable from '../components/GraphLinkTable.vue'

defineProps<{
  title: string;
  id: string;
  links?: GraphLink[];
}>()
</script>
