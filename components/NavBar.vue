<script setup lang="ts">
const { t, locale, setLocale } = useI18n()
const config = useRuntimeConfig()
const currency = useCurrency()
const showMega = ref(false)

const productCats = [
  { name: 'Spices', to: '/catalog?category=spices' },
  { name: 'Coffee', to: '/catalog?category=coffee' },
  { name: 'Charcoal', to: '/catalog?category=charcoal' },
  { name: 'UMKM', to: '/catalog?category=umkm' }
]
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
    <div class="container h-16 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-3">
        <img src="/favicon.svg" alt="PR" class="h-9 w-9 rounded-xl shadow" />
        <div class="leading-tight">
          <p class="text-xs text-slate-500">Export Company</p>
          <h1 class="text-base font-bold">{{ config.public.company }}</h1>
        </div>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden lg:flex items-center gap-6 text-sm relative">
        <!-- Mega menu trigger -->
        <button class="hover:text-brand" @mouseenter="showMega=true" @focus="showMega=true">
          Products
        </button>
        <NuxtLink to="/services" class="hover:text-brand">Services</NuxtLink>
        <NuxtLink to="/projects" class="hover:text-brand">{{ t('nav.projects') }}</NuxtLink>
        <NuxtLink to="/certificates" class="hover:text-brand">{{ t('nav.certificates') }}</NuxtLink>
        <NuxtLink to="/about" class="hover:text-brand">{{ t('nav.about') }}</NuxtLink>
        <NuxtLink to="/contact" class="hover:text-brand">{{ t('nav.contact') }}</NuxtLink>

        <!-- Mega panel -->
        <div v-show="showMega"
             @mouseleave="showMega=false"
             class="absolute left-0 top-full mt-2 w-[640px] rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
          <div class="grid grid-cols-2 gap-4">
            <NuxtLink v-for="c in productCats" :key="c.to" :to="c.to"
              class="card p-4 hover:shadow cursor-pointer">
              <h4 class="font-semibold">{{ c.name }}</h4>
              <p class="text-xs text-slate-600">Browse {{ c.name.toLowerCase() }} catalog</p>
            </NuxtLink>
          </div>
          <div class="mt-4 flex items-center justify-between">
            <NuxtLink to="/catalog" class="btn-outline text-sm">View All Products</NuxtLink>
            <NuxtLink to="/contact" class="btn-primary text-sm">Get Quote</NuxtLink>
          </div>
        </div>
      </nav>

      <!-- Controls -->
      <div class="flex items-center gap-2">
        <div class="hidden md:flex items-center gap-1 rounded-xl border border-slate-200 p-1">
          <button class="px-2 py-1 text-xs rounded-lg" :class="{'bg-slate-900 text-white': currency.value==='IDR'}" @click="currency.value='IDR'">IDR</button>
          <button class="px-2 py-1 text-xs rounded-lg" :class="{'bg-slate-900 text-white': currency.value==='USD'}" @click="currency.value='USD'">USD</button>
        </div>
        <div class="flex items-center gap-1 rounded-xl border border-slate-200 p-1">
          <button class="px-2 py-1 text-xs rounded-lg" :class="{'bg-slate-900 text-white': locale==='id'}" @click="setLocale('id')">ID</button>
          <button class="px-2 py-1 text-xs rounded-lg" :class="{'bg-slate-900 text-white': locale==='en'}" @click="setLocale('en')">EN</button>
        </div>
        <NuxtLink to="/contact" class="ml-1 btn-primary text-sm">{{ t('cta.request') }}</NuxtLink>
      </div>
    </div>
  </header>
</template>
