import { AlpineComponent } from 'alpinejs'
import { IThemedToken } from 'shiki'

interface Component extends AlpineComponent {
  tokens: IThemedToken[][];
}

export default (): Component => ({
  indexes: { line: 0, token: 0, char: 0 },
  tokens: [],
  delay: 10,

  prevLines(): string {
    return this.tokens.slice(0, this.indexes.line).map(line => {
      const tokens = line.map(t => `<span style="color: ${t.color}">${ t.content }</span>`)
      return `<span class="line">${ tokens.join('') }</span>`
    }).join('\n')
  },

  prevTokens(): string {
    return this.tokens[this.indexes.line].slice(0, this.indexes.token).map(t => {
      return writeSpan(t.content, t)
    }).join('')
  },

  currentLine(): string {
    return `<span class="line">${ this.prevTokens() + this.currentToken() }</span>`
  },

  currentToken(): string | undefined {
    const token = this.tokens[this.indexes.line][this.indexes.token]
    if (token) {
      const chars = token.content.slice(0, this.indexes.char)
      return writeSpan(chars, token)
    }
  },

  codeHtml(): string {
    const prevLines = this.prevLines()
    const code = this.isTyping() ?
      (prevLines.length ? prevLines + '\n' + this.currentLine() : this.currentLine()) :
      prevLines

    return `<code>${code}</code>`
  },

  async highlightCode({ tokens }: { tokens: IThemedToken[][] }): Promise<void> {
    this.tokens = tokens
    const totalChars = this.tokens.reduce((sum, line) => {
      const chars = line.reduce((s, t) => s + t.content?.length || 0, 0)
      return sum + chars
    }, 0)
    this.delay = Math.ceil(1000 / totalChars)
    setTimeout(this.typeCode.bind(this), 500)
    this.indexes = { line: 0, token: 0, char: 0 }
  },

  typeCode(): void {
    this.indexes.char += 1
    if (this.isTokenEnd()) {
      this.indexes.token += 1
      this.indexes.char = 0
    }
    if (this.isLineEnd()) {
      this.indexes.line += 1
      this.indexes.token = 0
      this.indexes.char = 0
    }

    if (this.isTyping()) {
      this.$nextTick(() => {
        setTimeout(this.typeCode.bind(this), this.delay)
      })
    }
  },

  isTokenEnd(): boolean {
    return this.indexes.char >= this.tokens[this.indexes.line][this.indexes.token]?.content.length
  },
  
  isLineEnd(): boolean {
    return this.indexes.token >= this.tokens[this.indexes.line].length
  },
  
  isTyping(): boolean {
    return this.indexes.line < this.tokens.length
  },
})

function writeSpan(chars: string, token: IThemedToken): string {
  const color = token.color ? `color: ${token.color};` : ''
  const font = token.fontStyle ? `font-style: ${token.fontStyle};` : ''
  return `<span style="${font}${color}">${ chars }</span>`
}