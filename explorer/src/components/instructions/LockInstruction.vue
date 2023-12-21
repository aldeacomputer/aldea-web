<template>
  <BaseInstruction :idx="idx" :instruction="instruction">
    <Enclosed :icon="CaPassword" :value="address">
      <Copyable
        :to="{ name: 'addr', params: { id: address } }"
        :value="address"
        size="sm"
        short />
    </Enclosed>
  </BaseInstruction>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Address, instructions } from '@aldea/sdk'
import { CaPassword } from '@kalimahapps/vue-icons'
import BaseInstruction from './BaseInstruction.vue'
import Enclosed from '../Enclosed.vue'
import Copyable from '../Copyable.vue'

const props = defineProps<{
  idx: number;
  instruction: instructions.LockInstruction;
}>()

const address = computed(() => {
  return new Address(props.instruction.pubkeyHash).toString()
})
</script>