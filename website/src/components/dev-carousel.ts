import { AlpineComponent } from 'alpinejs'

export default (): AlpineComponent => ({
  items: [],
  index: 0,
  loop: undefined,

  init(): void {
    this.startLoop()
  },

  startLoop(): void {
    this.loop = setInterval(() => {
      const nextIdx = this.index + 1
      this.index = nextIdx % this.items.length
    }, 8300)
  },

  selectItem(i: number): void {
    clearInterval(this.loop)
    this.index = i
    this.startLoop()
  },

  selectPrev(): void {
    clearInterval(this.loop)
    const nextIdx = this.index - 1
    this.index = nextIdx < 0 ? this.items.length + nextIdx : nextIdx
    this.startLoop()
  },

  selectNext(): void {
    clearInterval(this.loop)
    const nextIdx = this.index + 1
    this.index = nextIdx % this.items.length
    this.startLoop()
  },

  isActive(i: number): boolean {
    return i === this.index
  },
})

