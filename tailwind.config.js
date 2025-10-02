/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',   // primary
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e'
        }
      },
      boxShadow: {
        'soft': '0 1px 2px rgba(0,0,0,.04), 0 8px 20px rgba(2,132,199,.08)',
        'lift': '0 8px 24px rgba(2,132,199,.18)'
      },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] }
    }
  },
  plugins: []
}
