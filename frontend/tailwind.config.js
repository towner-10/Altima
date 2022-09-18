/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        babyPowder: '#F7F7F2',
        paleSpringBud: '#E4E6C3',
        artichoke: {
          300: '#9AA68C',
          400: '#899878',
          500: '#5D6850',
          600: '#48513E'
        },
        charlestonGreen: '#222725',
        smokyBlack: '#121113'
      },
      fontFamily: {
        'oswald': ['Oswald', 'serif'],
        'sans': ['Josefin Sans', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}
