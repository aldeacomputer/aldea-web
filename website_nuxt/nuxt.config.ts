// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400&family=IBM+Plex+Sans:ital,wght@0,200;0,300;0,400;0,500;1,200;1,300&display=swap' },
      ],
      script: [
        { src: 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js' },
        { src: 'https://tally.so/widgets/embed.js', async: true },
        { src: 'https://plausible.io/js/script.js', defer: true, 'data-domain': 'aldea.network' },
      ],
      bodyAttrs: {
        class: 'bg-light text-gray-90'
      }
    },
  },

  content: {
    documentDriven: true,
  },

  css: [
    '~/assets/css/main.css'
  ],

  devtools: { enabled: true },

  modules: [
    '@nuxt/content'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => ['lottie-player'].includes(tag),
    }
  }
})
