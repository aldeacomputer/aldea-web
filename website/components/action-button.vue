<template>
  <div>
    <a
      class="
        mb-4 pl-4 pr-5 py-2 inline-flex items-center gap-2 bg-white text-gray-80 
        hover:bg-gray-20 hover:text-gray-90 transition-colors cursor-pointer group"
      @click="openModal">
      <span class="block font-medium text-base leading-loose">{{ label }}</span>
      <CaArrowRight class="h-5 w-5 group-hover:translate-x-2 transition-transform" />
    </a>
    <p class="font-mono text-sm text-light">{{ detail }}</p>
  </div>
</template>

<script setup lang="ts">
import { CaArrowRight } from '~/icons'

const props = defineProps<{
  formId: string;
  label: string;
  detail: string;
}>()

function openModal(): void {
  window.Tally.openPopup(props.formId, {
    layout: 'modal',
    width: 640,
    hideTitle: true,
    overlay: true,
  })
}
</script>