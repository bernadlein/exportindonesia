// composables/useCurrency.ts
export type Currency = 'IDR' | 'USD'

// Global reactive state
export const useCurrency = () => useState<Currency>('currency', () => 'IDR')

// VERY simple converter: product prices stored in USD
const USD_IDR_FALLBACK = 15500

export function formatMoney(value: number, currency: Currency) {
  const n = Number(value || 0)
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
  }
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n * USD_IDR_FALLBACK)
}
