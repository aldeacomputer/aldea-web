<template>
  <div>
    <div class="bg-neutral-800">
      <nav class="flex items-center gap-0.5 h-10 overflow-x-scroll source-nav">
        <div
          v-for="file, i in pkg?.files"
          class="inline-flex items-center self-stretch px-6 border-b cursor-pointer"
          :class="{
            'text-neutral-500 bg-neutral-700 border-neutral-700 hover:text-neutral-300': index !== i,
            'text-neutral-300 bg-neutral-800 border-sky-300': index === i,
          }"
          @click="index = i">
          {{ file.name }}
        </div>
      </nav>

      <CodeBlock :code="source" copyable numbered />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import * as keys from '../../injection-keys'
import CodeBlock from '../../components/CodeBlock.vue'

const pkg = inject(keys.pkg)

const index = ref(0)

const source = computed(() => {
  const file = pkg!.value!.files[index.value]
  return file!.content
})
</script>

<style>
.source-nav::after {
  content: ' ';
  @apply flex-auto self-stretch border-b border-neutral-700;
}
</style>