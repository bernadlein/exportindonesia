<!-- components/ProductCard.vue -->
<script setup lang="ts">
import { openRfq } from '@/composables/useRfq'
const props = defineProps<{ p: any; price: string }>()
</script>

<template>
  <article
    class="card overflow-hidden group transition duration-300 hover:-translate-y-0.5 hover:shadow-lift focus-within:ring-2 focus-within:ring-brand-400"
  >
    <!-- Media -->
    <NuxtLink :to="`/products/${p.id}`" class="relative block">
      <img
        :src="p.img"
        :alt="p.name"
        loading="lazy"
        class="h-48 w-full object-cover transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-105"
      />
      <!-- Overlay gradient muncul saat hover -->
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <!-- Quick action muncul saat hover -->
      <div
        class="pointer-events-none absolute bottom-3 left-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <span class="badge">View details</span>
      </div>
    </NuxtLink>

    <!-- Content -->
    <div class="p-5">
      <div class="flex items-center justify-between">
        <NuxtLink
          :to="`/products/${p.id}`"
          class="font-semibold hover:text-brand-600 transition-colors"
        >
          {{ p.name }}
        </NuxtLink>
        <span
          class="text-xs rounded-full bg-slate-100 px-3 py-1 text-slate-700"
          >HS {{ p.hs }}</span
        >
      </div>

      <p class="mt-1 text-sm text-slate-600">MOQ: {{ p.moq }}</p>
      <p class="mt-1 text-sm">
        <span class="text-slate-500">Price range:</span>
        <b>{{ price }}</b>
      </p>

      <div class="mt-4 flex items-center gap-2">
        <ui-button @click="openRfq({ product: p.name, hs: p.hs })">Get Latest Price</ui-button>
        <ui-button :to="`/products/${p.id}`" variant="outline">Details</ui-button>
      </div>
    </div>
  </article>
</template>
