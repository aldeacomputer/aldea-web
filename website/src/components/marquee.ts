import { AlpineComponent } from 'alpinejs'

export default (): AlpineComponent => ({
  screenWidth: getWidth(),
  panelWidth: 240,
  index: 0,
  items: [],

  init() {
    window.addEventListener('resize', () => this.screenWidth = getWidth(), true)
    this.$el.addEventListener('animationend', () => {
      const nextIndex = this.index + 1
      this.index = nextIndex % this.items.length
      this.resetAnimation()
    })
  },

  genItems(): any[] {
    const n = Math.max(this.items.length, Math.ceil(this.screenWidth / this.panelWidth))
    const max = n % 2 == 0 ? n + 1 : n + 2
    const cases = []
    for (let i = this.index; i < max + this.index; i++) {
      cases.push(this.items[i % this.items.length])
    }
    return cases
  },

  resetAnimation(): void {
    this.$el.style.animation = 'none'
    this.$el.offsetHeight; // triggers reflow
    this.$el.style.animation = ''
  }
})

function getWidth(): number {
  return window.innerWidth || document.documentElement.clientWidth ||  document.body.clientWidth
}
