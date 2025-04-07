/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#050505',
          800: '#0F0F0F',
          700: '#1A1A1A',
          600: '#2D2D2D',
          500: '#3E3E3E',
          400: '#4F4F4F',
          300: '#666666',
          200: '#808080',
          100: '#A3A3A3',
        },
      },
    },
  },
  plugins: [],
};