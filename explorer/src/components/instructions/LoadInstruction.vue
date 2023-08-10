<template>
  <BaseInstruction :idx="idx" :instruction="instruction">
    <Enclosed :icon="CaSettings">
      <Copyable
        :to="{ name: 'jig', params: { id: jigId } }"
        :value="jigId"
        size="sm"
        short />
    </Enclosed>
  </BaseInstruction>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { OpCode, Pointer, base16, instructions } from '@aldea/sdk'
import { CaSettings } from '@kalimahapps/vue-icons'
import BaseInstruction from './BaseInstruction.vue'
import Enclosed from '../Enclosed.vue'
import Copyable from '../Copyable.vue'

const props = defineProps<{
  idx: number;
  instruction: instructions.LoadInstruction | instructions.LoadByOriginInstruction;
}>()

const jigId = computed(() => {
  if (isLoadByOrigin(props.instruction)) {
    return Pointer.fromBytes(props.instruction.origin).toString()
  } else {
    return base16.encode(props.instruction.outputId)
  }
})

function isLoadByOrigin(
  instruction: instructions.LoadInstruction | instructions.LoadByOriginInstruction
): instruction is instructions.LoadByOriginInstruction {
  return instruction.opcode === OpCode.LOADBYORIGIN
}
</script>