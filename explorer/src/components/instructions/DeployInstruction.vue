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
import { base16, blake3, instructions } from '@aldea/sdk'
import { CaBox } from '@kalimahapps/vue-icons'
import BaseInstruction from './BaseInstruction.vue'
import Copyable from '../Copyable.vue'
import ShortLink from '../ShortLink.vue'

const props = defineProps<{
  idx: number;
  instruction: instructions.DeployInstruction;
}>()

const pkgId = computed(() => {
  return base16.encode(blake3.hash(props.instruction.pkgBuf))
})
</script>