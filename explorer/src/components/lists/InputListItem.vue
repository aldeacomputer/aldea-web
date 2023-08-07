<template>
  <BaseListItem :icon="CaSettings">
    <Copyable
      :to="{ name: 'jig', params: { id: value }}"
      responsive
      size="sm"
      :value="value" />
  </BaseListItem>
</template>

<script setup lang="ts">
import { CaSettings } from '@kalimahapps/vue-icons'
import { OpCode, Pointer, base16, instructions } from '@aldea/sdk'
import BaseListItem from './BaseListItem.vue'
import Copyable from '../Copyable.vue'
import { computed } from 'vue';

const props = defineProps<{
  item: instructions.LoadInstruction | instructions.LoadByOriginInstruction
}>()

const value = computed(() => {
  if (isLoadByOrigin(props.item)) {
    return Pointer.fromBytes(props.item.origin).toString()
  } else {
    return base16.encode(props.item.outputId)
  }
})

function isLoadByOrigin(
  instruction: instructions.LoadInstruction | instructions.LoadByOriginInstruction
): instruction is instructions.LoadByOriginInstruction {
  return instruction.opcode === OpCode.LOADBYORIGIN
}
</script>