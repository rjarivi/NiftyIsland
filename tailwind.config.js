/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#0F1014',
        primary: '#4fffbc',
        secondary: '#cf68fb',
        accent: '#ffe500',
      },
    },
  },
  plugins: [],
};