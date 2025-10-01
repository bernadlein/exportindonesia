
<script setup lang="ts">
const { t } = useI18n()
const currency = useCurrency()
const { data: products } = await useFetch('/api/products')
const query = ref('')
const category = ref('all')

const priceLabel = (range:[number,number]) => {
  const [min,max] = range
  return `${formatMoney(min, currency.value)} – ${formatMoney(max, currency.value)} / MT`
}

const filtered = computed(() => (products.value || []).filter((p:any) => {
  const okCat = category.value === 'all' || p.category === category.value
  const q = query.value.toLowerCase()
  const okQ = !q || p.name.toLowerCase().includes(q) || (p.hs||'').includes(q)
  return okCat && okQ
}))
</script>

<template>
  <section class="section">
    <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
      <SectionHeading :title="t('catalog.title')" :sub="t('catalog.sub')" />
      <div class="flex flex-wrap items-center gap-2">
        <select v-model="category" class="rounded-xl border border-slate-300 px-3 py-2 text-sm">
          <option value="all">All</option>
          <option value="spices">Spices</option>
          <option value="coffee">Coffee</option>
          <option value="charcoal">Charcoal</option>
          <option value="umkm">UMKM</option>
        </select>
        <input v-model="query" type="text" placeholder="HS code / keyword" class="rounded-xl border border-slate-300 px-3 py-2 text-sm"/>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard v-for="p in filtered" :key="p.id" :p="p" :price="priceLabel(p.priceUSD)" />
    </div>
  </section>
</template>
