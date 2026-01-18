/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8ecf4',
          100: '#d1d9e9',
          200: '#a3b3d3',
          300: '#758dbd',
          400: '#4767a7',
          500: '#0B2254', // Main primary color
          600: '#091b43',
          700: '#071432',
          800: '#050d22',
          900: '#030611',
        },
        accent: {
          50: '#e6f4ff',
          100: '#cce9ff',
          200: '#99d3ff',
          300: '#66bdff',
          400: '#3BA0FF', // Main accent color
          500: '#0d8aff',
          600: '#0a6ecc',
          700: '#085299',
          800: '#053666',
          900: '#031a33',
        },
        contrast: {
          DEFAULT: '#0B0E14', // Contrast text color
        },
      },
      spacing: {
        '15': '3.75rem', // 60px for tablet vertical padding
      },
      fontFamily: {
        'serif-brand': ['Playfair Display', 'serif'],
        'sans-brand': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
