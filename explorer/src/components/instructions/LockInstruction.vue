<template>
  <BaseInstruction :idx="idx" :instruction="instruction">
    <ShortLink type="addr" :value="address" />
  </BaseInstruction>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { LockInstruction } from '@aldea/core/instructions'
import BaseInstruction from './BaseInstruction.vue'
import ShortLink from '../ShortLink.vue'
import { Address } from '@aldea/sdk';

const props = defineProps<{
  idx: number;
  instruction: LockInstruction;
}>()

const address = computed(() => {
  return new Address(props.instruction.pubkeyHash).toString()
})
</script>