import { getHighlighter, setCDN } from 'shiki'

setCDN('/shiki')

export const highlighter = await getHighlighter({
  theme: 'github-dark-dimmed',
  langs: ['json', 'typescript'],
})
