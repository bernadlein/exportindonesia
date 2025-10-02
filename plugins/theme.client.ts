// plugins/theme.client.ts
export default defineNuxtPlugin(() => {
  if (!process.client) return
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') document.documentElement.classList.add('dark')
})
