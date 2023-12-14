import { AlpineComponent } from 'alpinejs'

export default (): AlpineComponent => ({
  items: 0,
  index: 0,
  loop: undefined,
  fHeight: 390,

  init(): void {
    this.startLoop()
    this.setHeight()
    window.addEventListener('resize', () => this.setHeight(), true)
  },

  startLoop(): void {
    this.loop = setInterval(() => {
      const nextIdx = this.index + 1
      this.index = nextIdx % this.items
    }, 10000)
  },

  selectItem(i: number): void {
    clearInterval(this.loop)
    this.index = i
    this.startLoop()
  },

  isActive(i: number): boolean {
    return i === this.index
  },

  setHeight(): void {
    const heights: number[] = []
    for(let el of this.$el.querySelectorAll('.uc-features')) {
      heights.push(el.clientHeight)
    }
    this.fHeight = Math.max(...heights)
  }
})