<script setup lang="ts">
const props = defineProps<{ p: any, price: string }>()
</script>

<template>
  <article class="card overflow-hidden group">
    <NuxtLink :to="`/products/${p.id}`" class="block">
      <img :src="p.img" :alt="p.name" class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"/>
    </NuxtLink>
    <div class="p-5">
      <div class="flex items-center justify-between">
        <NuxtLink :to="`/products/${p.id}`" class="font-semibold hover:text-brand-600">{{ p.name }}</NuxtLink>
        <span class="text-xs rounded-full bg-slate-100 px-3 py-1 text-slate-700">HS {{ p.hs }}</span>
      </div>
      <p class="mt-1 text-sm text-slate-600">MOQ: {{ p.moq }}</p>
      <p class="mt-1 text-sm"><span class="text-slate-500">Price range:</span> <b>{{ price }}</b></p>
      <div class="mt-4 flex items-center gap-2">
        <ui-button to="/contact">Get Latest Price</ui-button>
        <ui-button :to="`/products/${p.id}`" variant="outline">Details</ui-button>
      </div>
    </div>
  </article>
</template>
