<template>
  <div class="space-y-1">
    <div class="flex items-center gap-4" v-for="[key, val], i of entries">
      <span class="w-6 text-12 text-helper">{{ i }}</span>
      <div class="flex-auto flex items-center gap-4">
        <Primitive class="w-1/2" :type="keyType" :value="key" />
        <Primitive class="w-1/2" :type="valType(key)" :value="val" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { TypeNode } from '@aldea/core/abi'
import { KEYS } from '../../constants'
import Primitive from './Primitive.vue'

const props = defineProps<{
  type: TypeNode;
  value: Map<any, any> | Record<string, any>;
}>()

const jig = inject(KEYS.jig)

const entries = computed(() => {
  return props.type.name === 'Map' ?
    (<Map<any, any>>props.value).entries() :
    Object.entries(props.value)
})

const keyType = computed(() => {
  return props.type.name === 'Map' ?
    props.type.args[0] :
    { name: 'string', nullable: false, args: [] }
})

function valType(key: string) {
  if (props.type.name === 'Map') {
    return props.type.args[1]
  } else {
    const obj = jig?.value.abi.objects.find(o => o.name === props.type.name)
    const field = obj?.fields.find(f => f.name === key)
    return field!.type
  }
}
</script>