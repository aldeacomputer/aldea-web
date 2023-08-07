<template>
  <BaseInstruction :idx="idx" :instruction="instruction">
    <ShortLink :icon="CaPassword" :value="address">
      <Copyable
        :to="{ name: 'addr', params: { addr: address } }"
        :value="address"
        size="sm"
        short />
    </ShortLink>
  </BaseInstruction>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Address, instructions } from '@aldea/sdk'
import { CaPassword } from '@kalimahapps/vue-icons'
import BaseInstruction from './BaseInstruction.vue'
import ShortLink from '../ShortLink.vue'
import Copyable from '../Copyable.vue'

const props = defineProps<{
  idx: number;
  instruction: instructions.LockInstruction;
}>()

const address = computed(() => {
  return new Address(props.instruction.pubkeyHash).toString()
})
</script>