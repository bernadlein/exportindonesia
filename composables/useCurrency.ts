
export const useCurrency = () => useState<'IDR'|'USD'>('currency', () => useRuntimeConfig().public.defaultCurrency as 'IDR'|'USD')
export const useUSDToIDR = () => 16000 // demo
export const formatMoney = (value: number, currency: 'IDR'|'USD') => {
  if (currency === 'USD') return `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
  const rate = useUSDToIDR()
  return `Rp${Math.round(value * rate).toLocaleString('id-ID', { maximumFractionDigits: 0 })}`
}
