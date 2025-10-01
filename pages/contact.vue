
<script setup lang="ts">
const { t } = useI18n()
const config = useRuntimeConfig()
const sending = ref(false)
const ok = ref(false)
const form = reactive({
  product: '', hs: '', qty: '', unit: 'MT',
  country: '', port: '', incoterms: 'FOB', packing: 'Standard export packing',
  payment: 'TT', company: '', email: '', phone: '', notes: ''
})

const submit = async () => {
  sending.value = true
  try {
    await $fetch('/api/rfq', { method: 'POST', body: form })
    ok.value = true
    const msg = encodeURIComponent(`RFQ – ${form.product} (HS ${form.hs})\nQty: ${form.qty} ${form.unit}\nCountry/Port: ${form.country} – ${form.port}\nIncoterms: ${form.incoterms}\nPacking: ${form.packing}\nPayment: ${form.payment}\nCompany: ${form.company}\nContact: ${form.email} / ${form.phone}\nNotes: ${form.notes}`)
    window.open(`https://wa.me/${config.public.whatsapp.replace(/[^\d]/g,'')}?text=${msg}`, '_blank')
  } finally { sending.value = false }
}
</script>
<template>
  <section class="section">
    <div class="card p-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold">Request For Quotation</h2>
          <p class="text-slate-600">Your request will also open WhatsApp with pre-filled message (demo).</p>
        </div>
      </div>
      <form class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4" @submit.prevent="submit">
        <input v-model="form.product" class="rounded-xl border border-slate-300 px-3 py-2 text-sm" placeholder="Product name (e.g., Cinnamon)" required>
        <input v-model="form.hs" class="rounded-xl border border-slate-300 px-3 py-2 text-sm" placeholder="HS Code (e.g., 0906)">
        <input v-model="form.qty" class="rounded-xl border border-slate-300 px-3 py-2 text-sm" placeholder="Quantity (e.g., 20)" required>
        <select v-model="form.unit" class="rounded-xl border border-slate-300 px-3 py-2 text-sm"><option>MT</option><option>KG</option><option>Cartons</option></select>

        <input v-model="form.country" class="rounded-xl border border-slate-300 px-3 py-2 text-sm" placeholder="Destination Country" required>
        <input v-model="form.port" class="rounded-xl border border-slate-300 px-3 py-2 text-sm" placeholder="Destination Port" required>
        <select v-model="form.incoterms" class="rounded-xl border border-slate-300 px-3 py-2 text-sm"><option>FOB</option><option>CFR</option><option>CIF</option><option>EXW</option><option>DAP</option></select>
        <select v-model="form.packing" class="rounded-xl border border-slate-300 px-3 py-2 text-sm"><option>Standard export packing</option><option>Palletized</option><option>Bulk</option></select>

        <select v-model="form.payment" class="rounded-xl border border-slate-300 px-3 py-2 text-sm"><option>TT</option><option>LC</option></select>
        <input v-model="form.company" class="rounded-xl border border-slate-300 px-3 py-2 text-sm" placeholder="Company name" required>
        <input v-model="form.email" type="email" class="rounded-xl border border-slate-300 px-3 py-2 text-sm" placeholder="Work email" required>
        <input v-model="form.phone" class="rounded-xl border border-slate-300 px-3 py-2 text-sm" placeholder="Phone/WhatsApp" required>
        <textarea v-model="form.notes" class="sm:col-span-2 rounded-xl border border-slate-300 px-3 py-2 text-sm" rows="3" placeholder="Notes (specs, moisture, size, etc.)"></textarea>

        <div class="sm:col-span-2 flex items-center justify-between mt-2">
          <NuxtLink to="/catalog" class="btn-outline">Back to Catalog</NuxtLink>
          <button class="btn-primary" :disabled="sending">{{ sending ? 'Submitting…' : 'Submit RFQ' }}</button>
        </div>
        <p v-if="ok" class="sm:col-span-2 text-emerald-700 text-sm">Thanks! RFQ captured (demo) and opened WhatsApp.</p>
      </form>
    </div>
  </section>
</template>
