<script setup lang="ts">
const config = useRuntimeConfig()
const open = useRfqOpen()
const form = useRfqData()
const sending = ref(false)
const submit = async () => {
  sending.value = true
  try {
    await $fetch('/api/rfq', { method: 'POST', body: form.value })
    const msg = encodeURIComponent(
`RFQ – ${form.value.product||'-'} (HS ${form.value.hs||'-'})
Qty: ${form.value.qty||'-'} ${form.value.unit||'-'}
Country/Port: ${form.value.country||'-'} – ${form.value.port||'-'}
Incoterms: ${form.value.incoterms||'-'} | Payment: ${form.value.payment||'-'}
Packing: ${form.value.packing||'-'}
Company: ${form.value.company||'-'} | ${form.value.email||'-'} | ${form.value.phone||'-'}
Notes: ${form.value.notes||'-'}`)
    window.open(`https://wa.me/${config.public.whatsapp.replace(/\D/g,'')}?text=${msg}`, '_blank')
    open.value = false
  } finally { sending.value = false }
}
</script>

<template>
  <Teleport to="body">
    <div v-show="open" class="fixed inset-0 z-[80]">
      <div class="absolute inset-0 bg-slate-900/40" @click="open=false" />
      <aside class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-5 overflow-y-auto">
        <h3 class="text-xl font-extrabold">Quick RFQ</h3>
        <p class="text-sm text-slate-600">Isi singkat untuk dapatkan penawaran cepat.</p>

        <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <input v-model="form.product" class="rounded-xl border border-slate-300 px-3 py-2" placeholder="Product">
          <input v-model="form.hs" class="rounded-xl border border-slate-300 px-3 py-2" placeholder="HS code">
          <input v-model="form.qty" class="rounded-xl border border-slate-300 px-3 py-2" placeholder="Quantity">
          <select v-model="form.unit" class="rounded-xl border border-slate-300 px-3 py-2"><option>MT</option><option>KG</option><option>Cartons</option></select>
          <input v-model="form.country" class="rounded-xl border border-slate-300 px-3 py-2" placeholder="Destination Country">
          <input v-model="form.port" class="rounded-xl border border-slate-300 px-3 py-2" placeholder="Destination Port">
          <select v-model="form.incoterms" class="rounded-xl border border-slate-300 px-3 py-2"><option>FOB</option><option>CFR</option><option>CIF</option><option>DAP</option></select>
          <select v-model="form.payment" class="rounded-xl border border-slate-300 px-3 py-2"><option>TT</option><option>LC</option></select>
          <input v-model="form.company" class="rounded-xl border border-slate-300 px-3 py-2" placeholder="Company">
          <input v-model="form.email" class="rounded-xl border border-slate-300 px-3 py-2" placeholder="Work Email">
          <input v-model="form.phone" class="rounded-xl border border-slate-300 px-3 py-2" placeholder="Phone/WhatsApp">
          <textarea v-model="form.notes" class="sm:col-span-2 rounded-xl border border-slate-300 px-3 py-2" rows="3" placeholder="Specs / notes"></textarea>
        </div>

        <div class="mt-4 flex gap-2">
          <ui-button :disabled="sending" @click="submit">Send & WhatsApp</ui-button>
          <ui-button variant="outline" @click="open=false">Cancel</ui-button>
        </div>
      </aside>
    </div>
  </Teleport>
</template>
