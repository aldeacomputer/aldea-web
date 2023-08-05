<template>
  <div class="bg-layer-01" v-if="pkg">
    <nav class="flex items-center gap-0.5 h-10 overflow-x-scroll source-nav">
      <div
        v-for="file, i in pkg.files"
        class="inline-flex items-center self-stretch px-6 border-b-2 cursor-pointer transition-colors"
        :class="{
          'text-secondary bg-layer-02 border-gray-70 hover:text-primary': index !== i,
          'text-primary bg-layer-01 border-blue-40': index === i,
        }"
        @click="index = i">
        {{ file.name }}
      </div>
    </nav>

    <CodeBlock :code="source" copyable numbered />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import * as keys from '../../injection-keys'
import CodeBlock from '../../components/CodeBlock.vue'

const pkg = inject(keys.pkg)

const index = ref(0)

const source = computed(() => {
  return pkg!.value.files[index.value].content
})
</script>

<style>
.source-nav::after {
  content: ' ';
  @apply flex-auto self-stretch border-b border-gray-70;
}
</style>