<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between gap-4 px-4 py-2 bg-layer-01 border-l-4 border-warning">
      <div class="font-mono text-16 text-secondary">
        <span>{{ code.name }}</span>
        <span>:&nbsp;</span>
        <span class="italic text-helper">{{ $helpers.typeName(code.type) }}</span>
      </div>
      <div class="text-12 px-2 py-0.5 text-secondary border border-warning rounded">
        field
      </div>
    </div>
    <Markdown class="pl-4" :content="docs[docKey]" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { abi } from '@aldea/sdk'
import Markdown from '../Markdown.vue'

const props = defineProps<{
  className: string;
  code: abi.FieldNode;
  docs: Record<string, string>;
}>()

const docKey = computed(() => {
  return `${props.className}.${props.code.name}`
})
</script>