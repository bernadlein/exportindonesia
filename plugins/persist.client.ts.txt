export default defineNuxtPlugin(() => {
  const currency = useState<'IDR'|'USD'>('currency')
  const { locale, setLocale } = useI18n()

  // restore
  if (process.client) {
    const c = localStorage.getItem('currency')
    const l = localStorage.getItem('locale')
    if (c === 'IDR' || c === 'USD') currency.value = c
    if (l === 'id' || l === 'en') setLocale(l)
  }

  // persist
  watch(currency, v => process.client && localStorage.setItem('currency', v))
  watch(() => locale.value, v => process.client && localStorage.setItem('locale', v as string))
})
