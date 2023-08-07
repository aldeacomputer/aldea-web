<template>
  <div class="space-y-1">
    <div class="flex items-center gap-4" v-for="val, i of value">
      <span class="w-6 text-12 text-helper">{{ i }}</span>
      <div class="flex-auto">
        <Primitive :type="type.args[0]" :value="val" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { abi } from '@aldea/sdk'
import Primitive from './Primitive.vue'

type Iterable = Array<any> | Set<any>

defineProps<{
  type: abi.TypeNode;
  value: Iterable;
}>()
</script>