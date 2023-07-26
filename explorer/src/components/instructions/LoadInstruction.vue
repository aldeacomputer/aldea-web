<template>
  <BaseInstruction :idx="idx" :instruction="instruction">
    <ShortLink type="jig" :value="jigId" />
  </BaseInstruction>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { LoadInstruction, LoadByOriginInstruction } from '@aldea/core/instructions'
import { OpCode, Pointer, base16 } from '@aldea/sdk'
import BaseInstruction from './BaseInstruction.vue'
import ShortLink from '../ShortLink.vue'

const props = defineProps<{
  idx: number;
  instruction: LoadInstruction | LoadByOriginInstruction;
}>()

const jigId = computed(() => {
  if (isLoadByOrigin(props.instruction)) {
    return Pointer.fromBytes(props.instruction.origin).toString()
  } else {
    return base16.encode(props.instruction.outputId)
  }
})

function isLoadByOrigin(
  instruction: LoadInstruction | LoadByOriginInstruction
): instruction is LoadByOriginInstruction {
  return instruction.opcode === OpCode.LOADBYORIGIN
}
</script>