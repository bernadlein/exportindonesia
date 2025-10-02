<script setup lang="ts">
const currency = useCurrency()
const { data: products, pending } = await useFetch('/api/products')
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
      <div>
        <h1 class="section-title">Product Catalog</h1>
        <p class="section-sub">Items with HS code, MOQ & price-range.</p>
      </div>
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

    <div v-if="pending" class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Skeleton v-for="i in 6" :key="i" class="h-64"/>
    </div>

    <div v-else class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard v-for="p in filtered" :key="p.id" :p="p" :price="priceLabel(p.priceUSD)" />
    </div>
  </section>
</template>
