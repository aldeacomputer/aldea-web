import { getHighlighter, setCDN } from 'shiki'

setCDN('https://cdn.jsdelivr.net/npm/shiki')

export const highlighter = await getHighlighter({
  theme: 'github-dark-dimmed',
  langs: ['json', 'typescript'],
})
