<template>
  <BaseInstruction :idx="idx" :instruction="instruction">
    <ShortLink type="pkg" :value="pkgId" />
  </BaseInstruction>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ImportInstruction } from '@aldea/core/instructions'
import { base16 } from '@aldea/sdk'
import BaseInstruction from './BaseInstruction.vue'
import ShortLink from '../ShortLink.vue'

const props = defineProps<{
  idx: number;
  instruction: ImportInstruction;
}>()

const pkgId = computed(() => {
  return base16.encode(props.instruction.pkgId)
})
</script>