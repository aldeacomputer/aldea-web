<template>
  <BaseInstruction :idx="idx" :instruction="instruction">
    <ShortLink type="pkg" :value="pkgId" />
  </BaseInstruction>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DeployInstruction } from '@aldea/core/instructions'
import BaseInstruction from './BaseInstruction.vue'
import ShortLink from '../ShortLink.vue'
import { base16, blake3 } from '@aldea/sdk';

const props = defineProps<{
  idx: number;
  instruction: DeployInstruction;
}>()

const pkgId = computed(() => {
  return base16.encode(blake3.hash(props.instruction.pkgBuf))
})
</script>