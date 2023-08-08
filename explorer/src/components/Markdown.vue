<template>
  <div
    class="md space-y-4"
    v-if="content"
    v-html="md.render(content)" />
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import { renderToHtml } from 'shiki'
import { highlighter } from '../shiki'

defineProps<{
  content?: string;
}>()

const md = new MarkdownIt({
  highlight,
  linkify: true,
})

function highlight(src: string): string {
  const tokens = highlighter.codeToThemedTokens(src, 'ts')
  return renderToHtml(tokens, {
    fg: highlighter.getForegroundColor(),
    elements: {
      pre: ({ children }) => children,
      code: ({ children }) => children,
    }
  })
}
</script>

<style>

.md {
  @apply text-16 text-secondary leading-normal;
}

.md h1 {
  @apply text-32 font-light text-primary;
}

.md h2 {
  @apply text-20 text-primary;
}

.md h3, h4, h5, h6 {
  @apply text-16 font-semibold text-primary;
}

.md p {
  @apply max-w-2xl;
}

.md ul {
  @apply pl-6 list-disc;
}

.md ol {
  @apply pl-6 list-disc;
}

.md blockquote {
  @apply max-w-3xl my-6 p-6 bg-layer-01 border-l-4 border-gray-70;
}

.md pre {
  @apply max-w-3xl my-6 p-6 text-14 bg-layer-01 rounded-sm overflow-x-scroll;
}

.md b,
.md strong {
  @apply font-semibold;
}

.md *:not(pre) code {
  @apply px-1.5 py-1 font-mono text-14 text-primary bg-layer-01 rounded;
}
</style>