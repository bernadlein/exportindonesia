<script setup lang="ts">
const config = useRuntimeConfig()

type Form = {
  product: string; hs: string; qty: string; unit: string;
  country: string; port: string; incoterms: string; packing: string;
  payment: string; company: string; email: string; phone: string; notes: string;
}
const step = ref(1)
const sending = ref(false)
const ok = ref(false)
const form = reactive<Form>({
  product: '', hs: '', qty: '', unit: 'MT',
  country: '', port: '', incoterms: 'FOB', packing: 'Standard export packing',
  payment: 'TT', company: '', email: '', phone: '', notes: ''
})

const next = () => step.value = Math.min(step.value + 1, 4)
const prev = () => step.value = Math.max(step.value - 1, 1)

const submit = async () => {
  sending.value = true
  try {
    await $fetch('/api/rfq', { method: 'POST', body: form })
    ok.value = true
    const msg = encodeURIComponent(
`RFQ – ${form.product} (HS ${form.hs})
Qty: ${form.qty} ${form.unit}
Country/Port: ${form.country} – ${form.port}
Incoterms: ${form.incoterms}
Packing: ${form.packing}
Payment: ${form.payment}
Company: ${form.company}
Contact: ${form.email} / ${form.phone}
Notes: ${form.notes}`)
    window.open(`https://wa.me/${config.public.whatsapp.replace(/\D/g,'')}?text=${msg}`, '_blank')
  } finally { sending.value = false }
}
</script>

<template>
  <section class="section">
    <div class="card p-6">
      <h1 class="text-2xl font-bold">Request For Quotation</h1>
      <p class="text-slate-600">Isi bertahap agar penawaran cepat dan akurat.</p>

      <!-- progress -->
      <ol class="mt-5 grid grid-cols-4 gap-2 text-xs">
        <li v-for="n in 4" :key="n"
            class="rounded-lg py-2 text-center border"
            :class="n<=step? 'bg-emerald-50 border-emerald-200 text-emerald-700':'bg-slate-50 border-slate-200 text-slate-500'">
          Step {{n}}
        </li>
      </ol>

      <!-- Step 1: Product -->
      <div v-if="step===1" class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input v-model="form.product" class="rounded-xl border border-slate-300 px-3 py-2 text-sm" placeholder="Product (e.g., Cinnamon Sticks)" required>
        <input v-model="form.hs" class="rounded-xl border border-slate-300 px-3 py-2 text-sm" placeholder="HS Code (e.g., 0906)">
        <input v-model="form.qty" class="rounded-xl border border-slate-300 px-3 py-2 text-sm" placeholder="Quantity (e.g., 20)" required>
        <select v-model="form.unit" class="rounded-xl border border-slate-300 px-3 py-2 text-sm"><option>MT</option><option>KG</option><option>Cartons</option></select>
        <textarea v-model="form.notes" class="sm:col-span-2 rounded-xl border border-slate-300 px-3 py-2 text-sm" rows="3" placeholder="Specs (size, moisture, grade, etc.)"></textarea>
        <div class="sm:col-span-2 flex justify-end gap-2"><button class="btn-primary" @click="next">Next</button></div>
      </div>

      <!-- Step 2: Shipping & Terms -->
      <div v-else-if="step===2" class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input v-model="form.country" class="rounded-xl border border-slate-300 px-3 py-2 text-sm" placeholder="Destination Country" required>
        <input v-model="form.port" class="rounded-xl border border-slate-300 px-3 py-2 text-sm" placeholder="Destination Port" required>
        <select v-model="form.incoterms" class="rounded-xl border border-slate-300 px-3 py-2 text-sm"><option>FOB</option><option>CFR</option><option>CIF</option><option>EXW</option><option>DAP</option></select>
        <select v-model="form.packing" class="rounded-xl border border-slate-300 px-3 py-2 text-sm"><option>Standard export packing</option><option>Palletized</option><option>Bulk</option></select>
        <div class="sm:col-span-2 flex justify-between">
          <button class="btn-outline" @click="prev">Back</button>
          <button class="btn-primary" @click="next">Next</button>
        </div>
      </div>

      <!-- Step 3: Company & Payment -->
      <div v-else-if="step===3" class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select v-model="form.payment" class="rounded-xl border border-slate-300 px-3 py-2 text-sm"><option>TT</option><option>LC</option></select>
        <input v-model="form.company" class="rounded-xl border border-slate-300 px-3 py-2 text-sm" placeholder="Company Name" required>
        <input v-model="form.email" type="email" class="rounded-xl border border-slate-300 px-3 py-2 text-sm" placeholder="Work Email" required>
        <input v-model="form.phone" class="rounded-xl border border-slate-300 px-3 py-2 text-sm" placeholder="Phone/WhatsApp" required>
        <div class="sm:col-span-2 flex justify-between">
          <button class="btn-outline" @click="prev">Back</button>
          <button class="btn-primary" @click="next">Review</button>
        </div>
      </div>

      <!-- Step 4: Review & Submit -->
      <div v-else class="mt-6">
        <div class="grid md:grid-cols-2 gap-4 text-sm">
          <div class="card p-4">
            <h3 class="font-semibold">Product</h3>
            <ul class="mt-2 space-y-1 text-slate-700">
              <li><b>Name:</b> {{form.product}}</li>
              <li><b>HS:</b> {{form.hs}}</li>
              <li><b>Qty:</b> {{form.qty}} {{form.unit}}</li>
              <li><b>Specs:</b> {{form.notes||'-'}}</li>
            </ul>
          </div>
          <div class="card p-4">
            <h3 class="font-semibold">Shipping & Terms</h3>
            <ul class="mt-2 space-y-1 text-slate-700">
              <li><b>Country/Port:</b> {{form.country}} – {{form.port}}</li>
              <li><b>Incoterms:</b> {{form.incoterms}}</li>
              <li><b>Packing:</b> {{form.packing}}</li>
              <li><b>Payment:</b> {{form.payment}}</li>
            </ul>
          </div>
          <div class="card p-4 md:col-span-2">
            <h3 class="font-semibold">Company & Contact</h3>
            <ul class="mt-2 space-y-1 text-slate-700">
              <li><b>Company:</b> {{form.company}}</li>
              <li><b>Email:</b> {{form.email}}</li>
              <li><b>Phone:</b> {{form.phone}}</li>
            </ul>
          </div>
        </div>

        <div class="mt-4 flex justify-between">
          <button class="btn-outline" @click="prev">Back</button>
          <button class="btn-primary" :disabled="sending" @click="submit">
            {{ sending ? 'Submitting…' : 'Submit & Open WhatsApp' }}
          </button>
        </div>
        <p v-if="ok" class="mt-3 text-emerald-700 text-sm">
          Thanks! RFQ captured (demo) & WhatsApp opened.
        </p>
      </div>
    </div>
  </section>
</template>
