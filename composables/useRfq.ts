// composables/useRfq.ts
export type RfqPayload = {
  product?: string; hs?: string; qty?: string; unit?: string;
  country?: string; port?: string; incoterms?: string; packing?: string;
  payment?: string; company?: string; email?: string; phone?: string; notes?: string;
}
export const useRfqOpen = () => useState<boolean>('rfqOpen', () => false)
export const useRfqData = () => useState<RfqPayload>('rfqData', () => ({
  unit: 'MT', incoterms: 'FOB', packing: 'Standard export packing', payment: 'TT'
}))
export const openRfq = (preset?: Partial<RfqPayload>) => {
  const open = useRfqOpen(); const data = useRfqData()
  Object.assign(data.value, preset || {})
  open.value = true
}
export const closeRfq = () => { useRfqOpen().value = false }
