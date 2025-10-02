import { setLocale } from '#i18n'

export default defineNuxtPlugin(() => {
  if (!process.client) return

  // currency
  const c = localStorage.getItem('currency')
  if (c === 'IDR' || c === 'USD') useCurrency().value = c as any

  // locale
  const saved = localStorage.getItem('locale')
  if (saved === 'id' || saved === 'en') setLocale(saved)
})
