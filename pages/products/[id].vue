<script setup lang="ts">
const route = useRoute()
const { data: list } = await useFetch('/api/products')
const p = computed(() => (list.value || []).find((x:any) => x.id === route.params.id))
const currency = useCurrency()

const priceLabel = (range:[number,number]) => {
  const [min,max] = range
  return `${formatMoney(min, currency.value)} – ${formatMoney(max, currency.value)} / MT`
}
</script>

<template>
  <section class="section" v-if="p">
    <div class="grid md:grid-cols-2 gap-6 items-start">
      <img :src="p.img" :alt="p.name" class="rounded-2xl shadow object-cover w-full h-80">
      <div>
        <ui-badge>HS {{ p.hs }}</ui-badge>
        <h1 class="mt-3 text-3xl font-extrabold">{{ p.name }}</h1>
        <p class="mt-2 text-slate-600">MOQ: {{ p.moq }}</p>
        <p class="mt-1">Price range: <b>{{ priceLabel(p.priceUSD) }}</b></p>

        <ul class="mt-4 list-disc pl-5 text-sm text-slate-700 space-y-1">
          <li>Incoterms: FOB/CFR/CIF available</li>
          <li>Packing: Standard export / Palletized / Bulk</li>
          <li>Payment: TT or LC</li>
        </ul>

        <div class="mt-6 flex gap-3">
          <ui-button to="/contact">Request Quote</ui-button>
          <ui-button to="/certificates" variant="outline">Request Documents</ui-button>
        </div>
      </div>
    </div>
  </section>
  <section v-else class="section">
    <ui-card>Product not found.</ui-card>
  </section>
</template>
