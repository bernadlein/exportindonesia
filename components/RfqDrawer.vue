<script setup lang="ts">
import { useRfqOpen, useRfqData, closeRfq } from '@/composables/useRfq'

const config = useRuntimeConfig()
const open = useRfqOpen()
const form = useRfqData()
const sending = ref(false)
const errors = ref<string[]>([])

const validate = () => {
  errors.value = []
  const need = (v?: string) => v && String(v).trim().length > 0
  if (!need(form.value.product)) errors.value.push('Product is required.')
  if (!need(form.value.qty)) errors.value.push('Quantity is required.')
  if (!need(form.value.country)) errors.value.push('Destination country is required.')
  // Minimal: at least one contact
  if (!need(form.value.email) && !need(form.value.phone)) {
    errors.value.push('Provide an email or phone/WhatsApp.')
  }
  return errors.value.length === 0
}

const submit = async () => {
  if (!validate()) return
  sending.value = true
  try {
    // simpan RFQ (demo endpoint)
    await $fetch('/api/rfq', { method: 'POST', body: form.value })
    // kirim email (opsional — akan di-skip kalau endpoint/ENV belum ada)
    try { await $fetch('/api/email', { method: 'POST', body: form.value }) } catch {}

    const phone = (config.public.whatsapp || '').toString().replace(/\D/g, '')
    const msg = encodeURIComponent(
`RFQ – ${form.value.product || '-'} (HS ${form.value.hs || '-'})
Qty: ${form.value.qty || '-'} ${form.value.unit || '-'}
Country/Port: ${form.value.country || '-'} – ${form.value.port || '-'}
Incoterms: ${form.value.incoterms || '-'} | Payment: ${form.value.payment || '-'}
Packing: ${form.value.packing || '-'}
Company: ${form.value.company || '-'} | ${form.value.email || '-'} | ${form.value.phone || '-'}
Notes: ${form.value.notes || '-'}`)

    if (phone) window.open(`https://wa.me/${phone}?text=${msg}`, '_blank')
    closeRfq()
  } finally {
    sending.value = false
  }
}

// --- UX niceties: ESC to close + lock scroll when open ---
const onEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && open.value && !sending.value) closeRfq()
}
onMounted(() => {
  document.addEventListener('keydown', onEsc)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onEsc)
})
watch(open, (v) => {
  const el = document.documentElement
  if (v) el.classList.add('overflow-hidden')
  else el.classList.remove('overflow-hidden')
})
</script>

<template>
  <Teleport to="body">
    <div v-show="open" class="fixed inset-0 z-[80]">
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-slate-900/40"
        :class="sending ? 'cursor-wait' : 'cursor-pointer'"
        @click="!sending && closeRfq()"
      />
      <!-- Drawer -->
      <aside
        class="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-800
               shadow-2xl p-5 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rfq-title"
      >
        <!-- Header -->
        <div class="flex items-start justify-between gap-3">
          <div>
            <h3 id="rfq-title" class="text-xl font-extrabold">Quick RFQ</h3>
            <p class="text-sm text-slate-600 dark:text-slate-300">
              Isi singkat untuk dapatkan penawaran cepat.
            </p>
          </div>
          <button
            class="btn-outline text-xs"
            :disabled="sending"
            @click="closeRfq()"
            aria-label="Close"
          >
            ✕ Close
          </button>
        </div>

        <!-- Errors -->
        <div v-if="errors.length" class="mt-3 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 p-3 text-sm">
          <ul class="list-disc pl-5">
            <li v-for="(e,i) in errors" :key="i">{{ e }}</li>
          </ul>
        </div>

        <!-- Form -->
        <form class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm" @submit.prevent="submit">
          <!-- Product -->
          <label class="flex flex-col gap-1">
            <span class="text-slate-600 dark:text-slate-200">Product *</span>
            <input v-model="form.product" required autocomplete="off"
                   class="rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2"
                   placeholder="e.g., Cinnamon Sticks" />
          </label>

          <label class="flex flex-col gap-1">
            <span class="text-slate-600 dark:text-slate-200">HS code</span>
            <input v-model="form.hs" autocomplete="off"
                   class="rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2"
                   placeholder="0906" />
          </label>

          <!-- Qty + Unit -->
          <label class="flex flex-col gap-1">
            <span class="text-slate-600 dark:text-slate-200">Quantity *</span>
            <input v-model="form.qty" required autocomplete="off"
                   class="rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2"
                   placeholder="e.g., 20" />
          </label>

          <label class="flex flex-col gap-1">
            <span class="text-slate-600 dark:text-slate-200">Unit</span>
            <select v-model="form.unit"
                    class="rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2">
              <option>MT</option><option>KG</option><option>Cartons</option>
            </select>
          </label>

          <!-- Destination -->
          <label class="flex flex-col gap-1">
            <span class="text-slate-600 dark:text-slate-200">Destination Country *</span>
            <input v-model="form.country" required autocomplete="country-name"
                   class="rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2"
                   placeholder="e.g., UAE" />
          </label>

          <label class="flex flex-col gap-1">
            <span class="text-slate-600 dark:text-slate-200">Destination Port</span>
            <input v-model="form.port" autocomplete="off"
                   class="rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2"
                   placeholder="e.g., Jebel Ali" />
          </label>

          <!-- Terms -->
          <label class="flex flex-col gap-1">
            <span class="text-slate-600 dark:text-slate-200">Incoterms</span>
            <select v-model="form.incoterms"
                    class="rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2">
              <option>FOB</option><option>CFR</option><option>CIF</option><option>DAP</option>
            </select>
          </label>

          <label class="flex flex-col gap-1">
            <span class="text-slate-600 dark:text-slate-200">Payment</span>
            <select v-model="form.payment"
                    class="rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2">
              <option>TT</option><option>LC</option>
            </select>
          </label>

          <!-- Company & Contact -->
          <label class="flex flex-col gap-1 sm:col-span-2">
            <span class="text-slate-600 dark:text-slate-200">Company</span>
            <input v-model="form.company" autocomplete="organization"
                   class="rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2"
                   placeholder="Your company name" />
          </label>

          <label class="flex flex-col gap-1">
            <span class="text-slate-600 dark:text-slate-200">Work Email</span>
            <input v-model="form.email" type="email" autocomplete="email"
                   class="rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2"
                   placeholder="you@company.com" />
          </label>

          <label class="flex flex-col gap-1">
            <span class="text-slate-600 dark:text-slate-200">Phone/WhatsApp</span>
            <input v-model="form.phone" autocomplete="tel"
                   class="rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2"
                   placeholder="+62 812 xxx" />
          </label>

          <label class="flex flex-col gap-1 sm:col-span-2">
            <span class="text-slate-600 dark:text-slate-200">Specs / Notes</span>
            <textarea v-model="form.notes" rows="3"
                      class="rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2"
                      placeholder="Size, grade, moisture, packing, lead time, etc." />
          </label>

          <!-- Actions -->
          <div class="sm:col-span-2 mt-2 flex gap-2">
            <ui-button type="submit" :disabled="sending">
              <span v-if="sending">Submitting…</span>
              <span v-else>Send & WhatsApp</span>
            </ui-button>
            <ui-button type="button" variant="outline" :disabled="sending" @click="closeRfq()">Cancel</ui-button>
          </div>
        </form>
      </aside>
    </div>
  </Teleport>
</template>
