<template>
  <pre
    class="h-96 md:h-auto p-5 font-mono text-sm  overflow-scroll text-gray-30"
    v-html="codeHtml" />
</template>

<script setup lang="ts">
import { IThemedToken, getHighlighter, setCDN } from 'shiki'

setCDN('https://cdn.jsdelivr.net/npm/shiki')

const hl = await getHighlighter({
  theme: 'nord',
  langs: ['javascript', 'typescript'],
})

const props = defineProps<{
  code: DevExample;
}>()

const tokens = ref<IThemedToken[][]>([])
const indexes = reactive({ line: 0, token: 0, char: 0 })
const delay = ref<number>(10)

const codeHtml = computed<string>(() => {
  const lines = prevLines()
  const code = isTyping() ?
    (lines.length ? lines + '\n' + currentLine() : currentLine()) :
    lines

  return `<code>${code}</code>`
})

async function highlightCode(): Promise<void> {
  tokens.value = hl.codeToThemedTokens(props.code.src, props.code.lang, undefined, { includeExplanation: false })
  const totalChars = tokens.value.reduce((sum, line) => {
    const chars = line.reduce((s, t) => s + t.content?.length || 0, 0)
    return sum + chars
  }, 0)
  delay.value = Math.ceil(1000 / totalChars)
  indexes.line = 0
  indexes.token = 0
  indexes.char = 0
  setTimeout(() => typeCode(), 500)
}

function prevLines(): string {
  return tokens.value.slice(0, indexes.line).map(line => {
    const tokens = line.map(t => `<span style="color: ${t.color}">${ t.content }</span>`)
    return `<span class="line">${ tokens.join('') }</span>`
  }).join('\n')
}

function prevTokens(): string {
  return tokens.value[indexes.line].slice(0, indexes.token).map(t => {
    return writeSpan(t.content, t)
  }).join('')
}

function currentLine(): string {
  return `<span class="line">${ prevTokens() + currentToken() }</span>`
}

function currentToken(): string | undefined {
  const token = tokens.value[indexes.line][indexes.token]
  if (token) {
    const chars = token.content.slice(0, indexes.char)
    return writeSpan(chars, token)
  }
}

function typeCode(): void {
  indexes.char += 1
  if (isTokenEnd()) {
    indexes.token += 1
    indexes.char = 0
  }
  if (isLineEnd()) {
    indexes.line += 1
    indexes.token = 0
    indexes.char = 0
  }

  if (isTyping()) {
    setTimeout(() => typeCode(), delay.value)
  }
}

function isTokenEnd(): boolean {
  return indexes.char >= tokens.value[indexes.line][indexes.token]?.content.length
}
  
function isLineEnd(): boolean {
  return indexes.token >= tokens.value[indexes.line].length
}
  
function isTyping(): boolean {
  return indexes.line < tokens.value.length
}

function writeSpan(chars: string, token: IThemedToken): string {
  const color = token.color ? `color: ${token.color};` : ''
  const font = token.fontStyle ? `font-style: ${token.fontStyle};` : ''
  return `<span style="${font}${color}">${ chars }</span>`
}

watch(() => props.code, () => {
  highlightCode()
})
highlightCode()
</script>

<style scoped>
pre {
  min-height: 24rem;
  background-color: #282c34;
}
</style>