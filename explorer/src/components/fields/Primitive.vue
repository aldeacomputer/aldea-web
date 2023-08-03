<template>
  <div class="bg-layer-01 px-4 py-2 border-l-4 border-gray-70 font-mono text-14 text-secondary break-all">
    {{ valueStr }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TypeNode } from '@aldea/core/abi'
import { base16 } from '@aldea/sdk'

const props = defineProps<{
  type: TypeNode;
  value: any;
}>()

const isBinary = computed(() => {
  return props.type.name === 'ArrayBuffer' || /^(Int|Uint|Float)\d+Array$/.test(props.type.name)
})

const valueStr = computed(() => {
  if (isBinary.value) {
    let buf: ArrayBuffer = props.value
    if (typeof buf === 'object' && 'buffer' in buf) buf = buf.buffer as ArrayBuffer
    return '0x' + base16.encode(new Uint8Array(buf)).toUpperCase()
  } else {
    return props.value.toString()
  }  
})
</script>