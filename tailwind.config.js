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
          50:'#f0fdf4',100:'#dcfce7',200:'#bbf7d0',300:'#86efac',
          400:'#4ade80',500:'#22c55e',600:'#16a34a',700:'#15803d',
          800:'#166534',900:'#14532d'
        },
        limex: { 500:'#84cc16' },
        amberx: { 500:'#f59e0b', 600:'#d97706' }
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,.04), 0 8px 20px rgba(22,163,74,.08)',
        lift: '0 8px 24px rgba(22,163,74,.18)'
      },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] }
    }
  },
  plugins: []
}
