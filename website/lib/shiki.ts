import { getHighlighter, setCDN, IThemedToken } from 'shiki'

setCDN('./node_modules/shiki')

const highlighter = await getHighlighter({
  theme: 'one-dark-pro',
  langs: ['javascript', 'typescript'],
})

export function codeToTokens(code: string, lang: string): IThemedToken[][] {
  return highlighter.codeToThemedTokens(code, lang, undefined, { includeExplanation: false })
}
