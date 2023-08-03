<template>
  <div class="flex" v-if="jig">
    <div class="hiddenx w-64 self-stretch mr-8 pr-4 py-6 border-r border-gray-70/50">
      <ul class="text-14 space-y-2">
        <li v-for="field, i of $helpers.jigFields(jig)">
          <a
            class="text-secondary underline decoration-secondary/0 hover:text-primary hover:decoration-primary transition-colors cursor-pointer"
            @click="scrollToField(i)">{{ field.name }}</a>
        </li>
      </ul>
    </div>
    <div class="flex-auto py-6 space-y-6">
      <h3 class="text-20">Fields</h3>
      <div v-for="field of $helpers.jigFields(jig)" ref="fields">
        <div class="flex items-center gap-3 mb-4">
          <h4 class="text-16 font-semibold text-secondary">{{ field.name }}</h4>
          <span class="text-14 font-mono text-helper" size="sm">{{ $helpers.typeName(field.type) }}</span>
        </div>
        <component
          :is="componentFor(field)"
          :type="field.type"
          :value="jig.props[field.name]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { FieldNode } from '@aldea/core/abi'
import * as keys from '../../injection-keys'
import Primitive from '../../components/fields/Primitive.vue'
import ArrayLike from '../../components/fields/ArrayLike.vue'
import KeyValue from '../../components/fields/KeyValue.vue'
import Nested from '../../components/fields/Nested.vue'
import PointerType from '../../components/fields/PointerType.vue'

const jig = inject(keys.jig)
const fields = ref<HTMLElement[]>([])

function componentFor(f: FieldNode) {
  if (f.type.args.some(t => t.args.length)) {
    return Nested
  } else if (isPrimitive(f.type.name)) {
    return Primitive
  } else if (isArrayLike(f.type.name)) {
    return ArrayLike
  } else if (isKeyValue(f.type.name)) {
    return KeyValue
  } else if (isPointer(jig?.value.props[f.name])) {
    return PointerType
  } else {
    return Nested
  }
}

function isPrimitive(name: string): boolean {
  return ['bool', 'string', 'ArrayBuffer'].includes(name) ||
    /^[iuf](8|16|32|64)$/.test(name) ||
    /^(Int|Uint|Float)\d+Array$/.test(name)
}

function isArrayLike(name: string): boolean {
  return ['Array', 'StaticArray', 'Set'].includes(name)
}

function isKeyValue(name: string): boolean {
  return name === 'Map' || jig!.value.abi.objects.some(o => o.name === name)
}

function isPointer(val: any): boolean {
  return typeof val === 'object' && typeof val.idx === 'number' && val.idBuf?.length === 32
}

function scrollToField(i: number) {
  const el = fields.value[i]
  const top = el.getBoundingClientRect().top + window.scrollY - 84
  window.scrollTo({ top, behavior: 'smooth' })
}
</script>