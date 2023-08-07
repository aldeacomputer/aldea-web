<template>
  <div class="bg-layer-01 px-4 py-2 border-l-4 border-error flex items-center gap-4">
    <CaWarning class="text-error" />
    <span class="text-14 text-secondary">Deeply nested complex types cannot be displayed.</span>
  </div>
</template>

<script setup lang="ts">
import { abi } from '@aldea/sdk'
import { CaWarning } from '@kalimahapps/vue-icons'

defineProps<{
  type: abi.TypeNode;
  value: any;
}>()
</script>