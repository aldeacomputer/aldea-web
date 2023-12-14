import { AlpineComponent } from 'alpinejs'

export default (): AlpineComponent => ({
  openModal(formId: string): void {
    window.Tally.openPopup(formId, {
      layout: 'modal',
      width: 640,
      hideTitle: true,
      overlay: true,
    })
  }
})