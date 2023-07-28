<template>
  <div class="bg-neutral-800">
    <CodeBlock :code="source" copyable numbered />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import * as keys from '../../injection-keys'
import CodeBlock from '../../components/CodeBlock.vue'

const abi = inject(keys.abi)

const source = computed(() => {
  return JSON.stringify(abi!.value, null, 2)
})
</script>