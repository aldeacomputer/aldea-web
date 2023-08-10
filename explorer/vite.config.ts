import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext'
  },

  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (el) => el.startsWith('a-')
        }
      }
    })
  ],
})
