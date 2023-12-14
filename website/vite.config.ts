import { defineConfig } from 'vite'
import { ViteMinifyPlugin as minify } from 'vite-plugin-minify'
import { ViteMpPlugin as mp } from 'vite-plugin-mp'
import { handlebars } from './lib/handlebars'
import { icon } from './lib/icons'
import * as context from './src/data'

const currentYear = new Date().getFullYear()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mp(),

    handlebars({
      partialDirectory: './src/partials',
      reloadOnPartialChange: true,

      context: {
        ...context,
        codeExamples: undefined,
      },

      helpers: {
        icon,
        json: (data: any) => JSON.stringify(data),
        isFuture: (year: number) => year > currentYear,
        len: (list: Array<any>) => list.length,
      },
    }),

    minify(),
  ],
})
