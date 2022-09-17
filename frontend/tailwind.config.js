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
        artichoke: '#899878',
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
