import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,hbs,js,ts}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 1s 0.25s both ease-out',
        'fade-up': 'fade-up 0.5s 0.25s both ease-out',
        'fade-up-slow': 'fade-up 1s 0.25s both ease-out',
        'progress': 'progress 8s forwards ease-in',
        'slip-left': 'slip-left 3s forwards ease-in-out',
        'slip-right': 'slip-right 3s forwards ease-in-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(4rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'progress': {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        'slip-left': {
          '0%': { transform: 'translateX(0)' },
          '33%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-272px)' },
        },
        'slip-right': {
          '0%': { transform: 'translateX(0)' },
          '33%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(25rem)' },
        }
      },
      colors: {
        light: '#FDF8F0',
        dark: '#210D07',
        blue: {
          primary: '#2C799B',
          lighter: '#64A7BF',
        },
        red: {
          primary: '#C4462D',
          lighter: '#E76F51',
        },
        gray: {
          10: '#f4f4f4',
          20: '#e0e0e0',
          30: '#c6c6c6',
          40: '#a8a8a8',
          50: '#8d8d8d',
          60: '#6f6f6f',
          70: '#525252',
          80: '#393939',
          90: '#262626',
          100: '#161616',
        },
        cream: {
          10: '#FFFCF8',
          20: '#FDF8F0',
          30: '#FAF1E2',
          40: '#F0E5CF',
          50: '#E8D9BD',
          60: '#E0CFB0',
          70: '#D7C4A3',
          80: '#C9B28A',
          90: '#B59D74',
          100: '#A98E60',
        }
      },
      fontFamily: {
        mono: ['IBM Plex Mono', ...defaultTheme.fontFamily.mono],
        sans: ['IBM Plex Sans', ...defaultTheme.fontFamily.sans],
      },
      lineHeight: {
        extratight: '1.125',
        ...defaultTheme.lineHeight,
      },
    },
  },
  plugins: [],
}
