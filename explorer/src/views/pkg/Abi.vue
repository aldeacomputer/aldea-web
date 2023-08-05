<template>
  <div class="bg-layer-01" v-if="pkg">
    <CodeBlock :code="source" copyable numbered />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import * as keys from '../../injection-keys'
import CodeBlock from '../../components/CodeBlock.vue'

const pkg = inject(keys.pkg)

const source = computed(() => {
  return JSON.stringify(pkg!.value.abi, null, 2)
})
</script>