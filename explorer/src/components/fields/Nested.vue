<template>
  <div class="bg-layer-01 px-4 py-2 border-l-4 border-error flex items-center gap-4">
    <CaWarning class="text-error" />
    <span class="text-14 text-secondary">Deeply nested complex types cannot be displayed.</span>
  </div>
</template>

<script setup lang="ts">
import { TypeNode } from '@aldea/core/abi'
import { CaWarning } from '@kalimahapps/vue-icons'

defineProps<{
  type: TypeNode;
  value: any;
}>()
</script>