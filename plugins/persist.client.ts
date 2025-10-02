// plugins/persist.client.ts
// Persist currency & locale TANPA memanggil useI18n() di top-level

import { setLocale } from '#i18n'   // helper resmi dari @nuxtjs/i18n

export default defineNuxtPlugin((nuxtApp) => {
  // --- Currency ---
  const currency = useState<'IDR'|'USD'>(
    'currency',
    () => useRuntimeConfig().public.defaultCurrency as 'IDR'|'USD'
  )

  if (process.client) {
    const savedC = localStorage.getItem('currency')
    if (savedC === 'IDR' || savedC === 'USD') currency.value = savedC as any
    watch(currency, v => localStorage.setItem('currency', v))
  }

  // --- Locale ---
  if (process.client) {
    // set dari localStorage saat app mount (composer sudah siap)
    nuxtApp.hook('app:mounted', () => {
      const savedL = localStorage.getItem('locale')
      if (savedL === 'id' || savedL === 'en') setLocale(savedL)

      // pantau perubahan locale dari composer global
      const composer = nuxtApp.$i18n // vue-i18n Composer
      watch(composer.locale, (v) => {
        localStorage.setItem('locale', String(v))
      })
    })
  }
})
