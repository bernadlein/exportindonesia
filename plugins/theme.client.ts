// plugins/theme.client.ts
export default defineNuxtPlugin(() => {
  // apply saved theme seawal mungkin (hindari FOUC)
  if (process.client) {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') document.documentElement.classList.add('dark')
  }
})
