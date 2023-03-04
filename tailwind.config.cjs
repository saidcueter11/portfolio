/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'green-teal-dark': '#005555',
        'green-teal-ligth': '#069A8E',
        'blue-clear': '#A1E3D8',
        'yellow-ligth': '#F7FF93'
      },
      fontFamily: {
        'nova-mono': ['nova-mono'],
        fredoka: ['fredoka']
      }
    }
  },
  plugins: [require('@shrutibalasa/tailwind-grid-auto-fit')]
}
