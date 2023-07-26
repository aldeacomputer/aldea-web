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
import { LoadInstruction, LoadByOriginInstruction } from '@aldea/core/instructions'
import { OpCode, Pointer, base16 } from '@aldea/sdk'
import BaseListItem from './BaseListItem.vue'
import Copyable from '../Copyable.vue'
import { computed } from 'vue';

const props = defineProps<{
  item: LoadInstruction | LoadByOriginInstruction
}>()

const value = computed(() => {
  if (isLoadByOrigin(props.item)) {
    return Pointer.fromBytes(props.item.origin).toString()
  } else {
    return base16.encode(props.item.outputId)
  }
})

function isLoadByOrigin(
  instruction: LoadInstruction | LoadByOriginInstruction
): instruction is LoadByOriginInstruction {
  return instruction.opcode === OpCode.LOADBYORIGIN
}
</script>