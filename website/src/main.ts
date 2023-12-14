import Alpine from 'alpinejs'
import './main.css'

import DevCarousel from './components/dev-carousel'
import CodeWriter from './components/code-writer'
//import Marquee from './components/marquee'
import UsecaseCarousel from './components/usecase-carousel'
import ActionButton from './components/action-button'

//window.Alpine = Alpine
Alpine.data('DevCarousel', DevCarousel)
Alpine.data('CodeWriter', CodeWriter)
//Alpine.data('Marquee', Marquee)
Alpine.data('UsecaseCarousel', UsecaseCarousel)
Alpine.data('ActionButton', ActionButton)
Alpine.start()

document.addEventListener('DOMContentLoaded', () => {
  /**
   * Intercept `click` events on all links with `data-scroll` attribute, and
   * scroll section into view.
   */
  document.querySelectorAll('a[data-scroll]').forEach($link => {
    $link.addEventListener('click', e => {
      const id = $link.getAttribute('href')
      const $el = document.querySelector(id as string)
      if ($el) {
        e.preventDefault()
        $el.scrollIntoView({ behavior: 'smooth' })
      }
    })
  })
})
