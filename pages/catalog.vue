<script setup lang="ts">
const currency = useCurrency()
const route = useRoute()
const { data: products, pending } = await useFetch('/api/products')

const query = ref('')
const category = ref('all')

// baca query pertama kali
onMounted(() => {
  const c = String(route.query.category || '')
  if (['spices','coffee','charcoal','umkm'].includes(c)) category.value = c
})
// kalau query berubah, update juga
watch(() => route.query.category, (v) => {
  const c = String(v || '')
  if (['spices','coffee','charcoal','umkm'].includes(c)) category.value = c
})

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
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
      <div>
        <h1 class="section-title">Product Catalog</h1>
        <p class="section-sub">Items with HS code, MOQ & price-range.</p>
      </div>
    
      <div class="flex flex-wrap items-center gap-2">
        <div class="flex flex-wrap gap-2">
          <button @click="category='all'"       :class="['px-3 py-1.5 rounded-full text-sm', category==='all'?'bg-brand-600 text-white':'bg-white border border-slate-300']">All</button>
          <button @click="category='spices'"    :class="['px-3 py-1.5 rounded-full text-sm', category==='spices'?'bg-brand-600 text-white':'bg-white border border-slate-300']">Spices</button>
          <button @click="category='coffee'"    :class="['px-3 py-1.5 rounded-full text-sm', category==='coffee'?'bg-brand-600 text-white':'bg-white border border-slate-300']">Coffee</button>
          <button @click="category='charcoal'"  :class="['px-3 py-1.5 rounded-full text-sm', category==='charcoal'?'bg-brand-600 text-white':'bg-white border border-slate-300']">Charcoal</button>
          <button @click="category='umkm'"      :class="['px-3 py-1.5 rounded-full text-sm', category==='umkm'?'bg-brand-600 text-white':'bg-white border border-slate-300']">UMKM</button>
        </div>
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
