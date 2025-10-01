
<script setup lang="ts">
const { t, locale, setLocale } = useI18n()
const config = useRuntimeConfig()
const currency = useCurrency()
const links = [
  { to: '/', label: t('nav.home') },
  { to: '/catalog', label: t('nav.catalog') },
  { to: '/certificates', label: t('nav.certificates') },
  { to: '/projects', label: t('nav.projects') },
  { to: '/about', label: t('nav.about') },
  { to: '/contact', label: t('nav.contact') }
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

      <nav class="hidden lg:flex items-center gap-6 text-sm">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="hover:text-brand">
          {{ l.label }}
        </NuxtLink>
      </nav>

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
