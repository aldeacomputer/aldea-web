<template>
  <article class="space-y-6" ref="root">
    <h1 class="text-20">{{ code.name }}</h1>
    <Markdown :content="docs[code.name]" />

    <template v-if="fields.length">
      <h2 class="text-16 font-semibold">Fields</h2>
      <div class="space-y-6">
        <Field v-for="field of fields" :class-name="code.name" :code="field" :docs="docs" />
      </div>
    </template>

    <template v-if="methods.length">
      <h2 class="text-16 font-semibold">Methods</h2>
      <div class="space-y-6">
        <FunctionLike v-for="method of methods" :class-name="code.name" :code="method" :docs="docs" />
      </div>
    </template>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { abi } from '@aldea/sdk'
import Field from './Field.vue'
import FunctionLike from './FunctionLike.vue'
import Markdown from '../../components/Markdown.vue'

const root = ref<HTMLElement>()
defineExpose({ root })

const props = withDefaults(defineProps<{
  kind?: abi.CodeKind;
  code: abi.ClassNode | abi.InterfaceNode | abi.ObjectNode;
  docs?: Record<string, string>;
}>(), {
  // @ts-ignore
  docs: {}
})

const fields = computed(() => {
  return props.code.fields.filter(f => f.kind === abi.FieldKind.PUBLIC)
})

const methods = computed(() => {
  switch (props.kind) {
    case abi.CodeKind.CLASS:
      return (<abi.ClassNode>props.code).methods.filter(m => m.kind <= abi.MethodKind.INSTANCE)
    case abi.CodeKind.INTERFACE:
      return (<abi.InterfaceNode>props.code).methods
    default:
      return []
  }
})
</script>