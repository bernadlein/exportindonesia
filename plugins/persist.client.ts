// plugins/persist.client.ts
import { setLocale } from '#i18n'

export default defineNuxtPlugin(() => {
  if (!process.client) return

  // restore currency
  const savedC = localStorage.getItem('currency')
  if (savedC === 'IDR' || savedC === 'USD') useCurrency().value = savedC as any

  // restore locale
  const savedL = localStorage.getItem('locale')
  if (savedL === 'id' || savedL === 'en') setLocale(savedL)
})
