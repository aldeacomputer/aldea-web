<template>
  <div class="bg-layer-01" v-if="pkg">
    <CodeBlock :code="source" copyable numbered />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { KEYS } from '../../constants'
import CodeBlock from '../../components/CodeBlock.vue'

const pkg = inject(KEYS.pkg)

const source = computed(() => {
  return JSON.stringify(pkg!.value.abi, null, 2)
})
</script>