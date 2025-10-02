// plugins/theme.client.ts
export default defineNuxtPlugin(() => {
  if (process.client && localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark')
  }
})
