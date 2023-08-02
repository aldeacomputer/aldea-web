<template>
  <BaseInstruction :idx="idx" :instruction="instruction">
    <ShortLink :icon="CaBox">
      <Copyable
        :to="{ name: 'pkg', params: { id: pkgId } }"
        :value="pkgId"
        size="sm"
        short />
    </ShortLink>
  </BaseInstruction>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ImportInstruction } from '@aldea/core/instructions'
import { base16 } from '@aldea/sdk'
import { CaBox } from '@kalimahapps/vue-icons'
import BaseInstruction from './BaseInstruction.vue'
import Copyable from '../Copyable.vue'
import ShortLink from '../ShortLink.vue'

const props = defineProps<{
  idx: number;
  instruction: ImportInstruction;
}>()

const pkgId = computed(() => {
  return base16.encode(props.instruction.pkgId)
})
</script>