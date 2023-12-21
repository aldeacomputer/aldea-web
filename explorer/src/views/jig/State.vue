<template>
  <div class="flex" v-if="jig">
    <div class="hidden lg:block w-48 xl:w-64 shrink-0 pr-4 py-6 border-r border-gray-70/50">
      <div class="space-y-6" v-if="fields.length">
        <h4 class="mb-2 text-16 font-semibold">Fields</h4>
        <ul class="text-14 space-y-2">
          <li v-for="field, i of fields">
            <a
              class="text-secondary underline decoration-secondary/0 hover:text-primary hover:decoration-primary transition-colors cursor-pointer"
              @click="scrollToField(i)">{{ field.name }}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="flex-auto lg:pl-8 py-6">
      <h3 class="mb-6 text-20">Fields</h3>
      <div class="space-y-6" v-if="fields.length">
        <div v-for="field of fields" ref="fieldRefs">
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

      <p class="p-4 text-helper text-center" v-else>
        This jig has no fields.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref } from 'vue'
import { abi } from '@aldea/sdk'
import { KEYS } from '../../constants'
import Primitive from '../../components/fields/Primitive.vue'
import ArrayLike from '../../components/fields/ArrayLike.vue'
import KeyValue from '../../components/fields/KeyValue.vue'
import Nested from '../../components/fields/Nested.vue'
import PointerType from '../../components/fields/PointerType.vue'
import { jigFields } from '../../helpers'

const jig = inject(KEYS.jig)
const fieldRefs = ref<HTMLElement[]>([])

const fields = computed(() => {
  return jigFields(jig!.value)
})

function componentFor(f: abi.FieldNode) {
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
  const objects = jig!.value.abi.exports.map(i => jig!.value.abi.defs[i]).filter(o => o.kind === abi.CodeKind.OBJECT)
  return name === 'Map' || objects.some(o => o.name === name)
}

function isPointer(val: any): boolean {
  return typeof val === 'object' && typeof val.idx === 'number' && val.idBuf?.length === 32
}

function scrollToField(i: number) {
  const el = fieldRefs.value[i]
  const top = el.getBoundingClientRect().top + window.scrollY - 84
  window.scrollTo({ top, behavior: 'smooth' })
}

/**
 * Hack alert. When navigating away to another route, Vue throws:
 *    Unhandled error during execution of scheduler flush.
 *    Cannot read properties of null (reading 'parentNode')
 * 
 * Resolved by clearing the refs before navigating away. 🤷‍♂️
 */
onBeforeUnmount(() => { fieldRefs.value = [] })
</script>