<template>
  <div
    class="relative px-3.5 py-6 text-14 overflow-x-scroll"
    :class="{'numbered': numbered}">
    <div v-html="codeHtml" />
    <CopyButton
      class="absolute top-4 right-4 z-10"
      :value="code"
      v-if="copyable" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { highlighter } from '../shiki'
import CopyButton from './CopyButton.vue';

const props = withDefaults(defineProps<{
  code: string;
  lang?: string;
  copyable?: boolean;
  numbered?: boolean;
}>(), {
  lang: 'typescript',
  copyable: false,
  numbered: false,
})

const codeHtml = computed(() => {
  return highlighter.codeToHtml(props.code, { lang: props.lang })
})

</script>

<style>
.shiki {
  background-color: transparent !important;
}

.numbered code {
  counter-reset: step;
  counter-increment: step 0;
}

.numbered .line::before {
  content: counter(step);
  counter-increment: step;
  @apply inline-block w-11 mr-4 pr-4 text-neutral-400/40 text-right border-r border-neutral-700;
}
</style>