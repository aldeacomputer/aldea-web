<template>
  <BaseInstruction :idx="idx" :instruction="instruction">
  </BaseInstruction>
</template>

<script setup lang="ts">
import { Instruction } from '@aldea/sdk'
import BaseInstruction from './BaseInstruction.vue'

defineProps<{
  idx: number;
  instruction: Instruction;
}>()
</script>