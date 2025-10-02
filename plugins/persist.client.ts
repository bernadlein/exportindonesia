// plugins/persist.client.ts
import { setLocale } from '#i18n'

export default defineNuxtPlugin((nuxtApp) => {
  const currency = useCurrency()
  if (!process.client) return

  // Currency: load & persist
  const savedC = localStorage.getItem('currency')
  if (savedC === 'IDR' || savedC === 'USD') currency.value = savedC as any
  watch(currency, (v) => localStorage.setItem('currency', v))

  // Locale: load & persist (gunakan composer dari nuxt i18n)
  nuxtApp.hook('app:mounted', () => {
    const savedL = localStorage.getItem('locale')
    if (savedL === 'id' || savedL === 'en') setLocale(savedL)

    const composer: any = nuxtApp.$i18n
    watch(composer.locale, (v: any) => localStorage.setItem('locale', String(v)))
  })
})
