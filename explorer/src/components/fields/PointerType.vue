<template>
  <div class="bg-layer-01 px-4 py-2 border-l-4 border-gray-70 flex items-center gap-4">
    <CaSettings />
    <div class="flex-auto">
      <Copyable
        :to="{ name: 'jig', params: { id: value.toString() } }"
        responsive
        size="sm"
        :value="value.toString()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Pointer, abi } from '@aldea/sdk'
import { CaSettings } from '@kalimahapps/vue-icons'
import Copyable from '../Copyable.vue'

defineProps<{
  type: abi.TypeNode;
  value: Pointer;
}>()
</script>