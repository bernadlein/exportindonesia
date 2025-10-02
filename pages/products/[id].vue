<script setup lang="ts">
import { openRfq } from '@/composables/useRfq'
const route = useRoute()
const { data: list } = await useFetch('/api/products')
const p = computed(() => (list.value || []).find((x:any) => x.id === route.params.id))
const currency = useCurrency()
const active = ref(0)

const priceLabel = (range:[number,number]) => {
  const [min,max] = range
  return `${formatMoney(min, currency.value)} – ${formatMoney(max, currency.value)} / MT`
}
</script>

<template>
  <section class="section" v-if="p">
    <div class="grid md:grid-cols-2 gap-6 items-start">
      <!-- Gallery -->
      <div>
        <div class="aspect-[4/3] w-full overflow-hidden rounded-2xl card">
          <img :src="(p.images?.[active]) || p.img" :alt="p.name" loading="lazy" class="w-full h-full object-cover"/>
        </div>
        <div class="mt-3 grid grid-cols-4 gap-3">
          <button v-for="(img,i) in (p.images || [p.img])" :key="i"
                  class="rounded-xl overflow-hidden border-2"
                  :class="i===active ? 'border-brand-600' : 'border-transparent'"
                  @click="active=i">
            <img :src="img" :alt="`${p.name} ${i+1}`" loading="lazy" class="h-20 w-full object-cover"/>
          </button>
        </div>
      </div>

      <!-- Details -->
      <div>
        <ui-badge>HS {{ p.hs }}</ui-badge>
        <h1 class="mt-3 text-3xl font-extrabold">{{ p.name }}</h1>
        <p class="mt-2 text-slate-600 dark:text-slate-300">MOQ: {{ p.moq }}</p>
        <p class="mt-1">Price range: <b>{{ priceLabel(p.priceUSD) }}</b></p>

        <ul class="mt-4 list-disc pl-5 text-sm text-slate-700 dark:text-slate-200 space-y-1">
          <li>Incoterms: FOB/CFR/CIF available</li>
          <li>Packing: Standard export / Palletized / Bulk</li>
          <li>Payment: TT or LC</li>
        </ul>

        <div class="mt-6 flex gap-3">
          <ui-button @click="openRfq({ product: p.name, hs: p.hs })">Request Quote</ui-button>
          <ui-button to="/certificates" variant="outline">Request Documents</ui-button>
        </div>
      </div>
    </div>
  </section>

  <section v-else class="section">
    <ui-card>Product not found.</ui-card>
  </section>
</template>
