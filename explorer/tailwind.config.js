const colors = {
  gray: {
    '10': '#f4f4f4',
    '20': '#e0e0e0',
    '30': '#c6c6c6',
    '40': '#a8a8a8',
    '50': '#8d8d8d',
    '60': '#6f6f6f',
    '70': '#525252',
    '80': '#393939',
    '90': '#262626',
    '100': '#161616',
  },
  blue: {
    '30': '#b1d5e5',
    '40': '#8fc2d7',
    '50': '#5592aC',
    '60': '#2c799b',
    '70': '#195d7a',
  },
  green: {
    '40': '#42be65',
  },
  purple: {
    '40': '#be95ff',
  },
  red: {
    '40': '#ff8389',
    '50': '#fa4d56'
  },
  yellow: {
    '30': '#f1c21b'
  },
  white: '#ffffff',
  black: '#000000',
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      layer: {
        '01': colors.gray['90'],
        '02': colors.gray['80'],
        '03': colors.gray['70'],
      },
      primary: colors.gray['10'],
      secondary: colors.gray['30'],
      helper: colors.gray['50'],
      placeholder: colors.gray['60'],
      info: colors.blue['50'],
      success: colors.green['40'],
      warning: colors.yellow['30'],
      error: colors.red['50'],
      transparent: 'transparent',
    },
    fontSize: {
      '12': '0.75rem',
      '14': '0.875rem',
      '16': '1rem',
      '18': '1.125rem',
      '20': '1.25rem',
      '24': '1.5rem',
      '28': '1.75rem',
      '32': '2rem',
      '36': '2.25rem',
      '42': '2.625rem',
      '48': '3rem',
    },
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier', 'monospace'],
      },
      screens: {
        xs: '480px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}

