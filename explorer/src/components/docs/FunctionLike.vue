<template>
  <div class="space-y-4" ref="root">
    <div
      class="flex items-center justify-between gap-4 px-4 py-2 bg-layer-01 border-l-4 border-gray-70"
      :class="{
        
        'border-success': isPublic(code),
        'border-error': isProtected(code),
        'border-info': isFunction(code),
      }">
      <div class="flex-auto font-mono text-14 md:text-16 text-secondary">
        <span>{{ code.name }}</span>
        <span class="text-helper">(</span>
          <div class="block md:inline" v-for="arg, i in code.args">
            <span class="md:hidden">&nbsp;&nbsp;</span>
            <span>{{ arg.name }}</span>
            <span>:&nbsp;</span>
            <span class="italic text-helper">{{ $helpers.typeName(arg.type) }}</span>
            <span class="text-helper" v-if="i < code.args.length-1">,&nbsp;</span>
          </div>
        <span class="text-helper">)</span>
        <span v-if="code.rtype">:&nbsp;</span>
        <span class="italic text-helper" v-if="code.rtype">{{ $helpers.typeName(code.rtype) }}</span>
      </div>
      <div
        class="text-12 px-2 py-0.5 text-secondary border rounded"
        :class="{
          'border-success': isPublic(code),
          'border-warning': isProtected(code),
          'border-info': isFunction(code),
        }">
        {{ kind }}
      </div>
    </div>
    <Markdown class="pl-4" :content="docs[docKey]" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { abi } from '@aldea/sdk'
import Markdown from '../Markdown.vue'

const root = ref<HTMLElement>()
defineExpose({ root })

const props = defineProps<{
  className?: string;
  code: abi.MethodNode | abi.FunctionNode;
  docs: Record<string, string>;
}>()

const kind = computed(() => {
  return isMethod(props.code) ?
    (isProtected(props.code) ? 'protected' : 'public') :
    'function'
})

const docKey = computed(() => {
  if (isMethod(props.code)) {
      return `${props.className}_${props.code.name}`
  } else {
    return props.code.name
  }
})

function isFunction(_m: any): _m is abi.FunctionNode {
  return !props.className
}

function isMethod(m: any): m is abi.MethodNode {
  return !isFunction(m)
}

function isPublic(m: any): boolean {
  return isMethod(m) && m.kind === abi.MethodKind.PUBLIC
}

function isProtected(m: any): boolean {
  return isMethod(m) && m.kind === abi.MethodKind.PROTECTED
}

//function isStatic(m: any): boolean {
//  return isMethod(m) && m.kind === abi.MethodKind.STATIC
//}
//
//function isConstructor(m: any): boolean {
//  return isMethod(m) && m.kind === abi.MethodKind.CONSTRUCTOR
//}
//
//function isInstance(m: any): boolean {
//  return isMethod(m) && (!m.kind || m.kind === abi.MethodKind.INSTANCE)
//}
</script>