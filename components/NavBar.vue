<script setup lang="ts">
const { t, locale, setLocale } = useI18n()
const config = useRuntimeConfig()
const currency = useCurrency()

// Mobile dropdown
const mobileOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
    <div class="container h-16 flex items-center justify-between">
      <!-- Brand -->
      <NuxtLink to="/" class="flex items-center gap-3">
        <img src="/favicon.svg" alt="PR" class="h-9 w-9 rounded-xl shadow" />
        <div class="leading-tight">
          <p class="text-xs text-slate-500">Export Company</p>
          <h1 class="text-base font-bold">{{ config.public.company }}</h1>
        </div>
      </NuxtLink>

      <!-- Desktop nav (CSS-only hover) -->
      <nav class="hidden lg:flex items-center gap-6 text-sm">
        <!-- Wrapper: trigger + panel dalam 1 group -->
        <div class="relative group">
          <!-- Trigger -->
          <button type="button" aria-haspopup="true" aria-expanded="false"
                  class="inline-flex items-center gap-2 hover:text-brand-600 focus:outline-none">
            Products
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:rotate-180"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <!-- Panel (keluar saat group-hover) -->
          <div
            class="absolute left-0 top-full mt-2 w-[680px] rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl z-[60]
                   invisible opacity-0 translate-y-2 pointer-events-none
                   group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
                   transition duration-200"
          >
            <div class="grid grid-cols-2 gap-4">
              <NuxtLink to="/catalog?category=spices"   class="card p-4 hover:shadow cursor-pointer">
                <h4 class="font-semibold">Spices</h4>
                <p class="text-xs text-slate-600">Browse spices</p>
              </NuxtLink>
              <NuxtLink to="/catalog?category=coffee"   class="card p-4 hover:shadow cursor-pointer">
                <h4 class="font-semibold">Coffee</h4>
                <p class="text-xs text-slate-600">Browse coffee</p>
              </NuxtLink>
              <NuxtLink to="/catalog?category=charcoal" class="card p-4 hover:shadow cursor-pointer">
                <h4 class="font-semibold">Charcoal</h4>
                <p class="text-xs text-slate-600">Browse charcoal</p>
              </NuxtLink>
              <NuxtLink to="/catalog?category=umkm"     class="card p-4 hover:shadow cursor-pointer">
                <h4 class="font-semibold">UMKM</h4>
                <p class="text-xs text-slate-600">Browse UMKM</p>
              </NuxtLink>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <NuxtLink to="/catalog" class="btn-outline text-sm">View All Products</NuxtLink>
              <NuxtLink to="/contact" class="btn-primary text-sm">Get Quote</NuxtLink>
            </div>
          </div>
        </div>

        <NuxtLink to="/services" class="hover:text-brand-600">Services</NuxtLink>
        <NuxtLink to="/projects" class="hover:text-brand-600">{{ t('nav.projects') }}</NuxtLink>
        <NuxtLink to="/certificates" class="hover:text-brand-600">{{ t('nav.certificates') }}</NuxtLink>
        <NuxtLink to="/about" class="hover:text-brand-600">{{ t('nav.about') }}</NuxtLink>
        <NuxtLink to="/contact" class="hover:text-brand-600">{{ t('nav.contact') }}</NuxtLink>
      </nav>

      <!-- Controls -->
      <div class="flex items-center gap-2">
        <div class="hidden md:flex items-center gap-1 rounded-xl border border-slate-200 p-1">
          <button class="px-2 py-1 text-xs rounded-lg"
                  :class="{'bg-slate-900 text-white': currency.value==='IDR'}"
                  @click="currency.value='IDR'">IDR</button>
          <button class="px-2 py-1 text-xs rounded-lg"
                  :class="{'bg-slate-900 text-white': currency.value==='USD'}"
                  @click="currency.value='USD'">USD</button>
        </div>
        <div class="flex items-center gap-1 rounded-xl border border-slate-200 p-1">
          <button class="px-2 py-1 text-xs rounded-lg"
                  :class="{'bg-slate-900 text-white': locale==='id'}"
                  @click="setLocale('id')">ID</button>
          <button class="px-2 py-1 text-xs rounded-lg"
                  :class="{'bg-slate-900 text-white': locale==='en'}"
                  @click="setLocale('en')">EN</button>
        </div>

        <!-- Mobile trigger -->
        <button class="lg:hidden btn-outline text-xs" @click="mobileOpen = !mobileOpen">
          Menu
        </button>

        <NuxtLink to="/contact" class="ml-1 btn-primary text-sm">{{ t('cta.request') }}</NuxtLink>
      </div>
    </div>

    <!-- Mobile dropdown -->
    <div v-if="mobileOpen" class="lg:hidden border-t border-slate-200 bg-white">
      <div class="container py-3 space-y-2 text-sm">
        <details class="group">
          <summary class="cursor-pointer py-2 font-semibold flex items-center justify-between">
            Products
            <span class="ml-2 text-slate-500 group-open:rotate-180 transition">⌄</span>
          </summary>
          <div class="pl-3 grid grid-cols-2 gap-3 pt-2">
            <NuxtLink to="/catalog?category=spices"   @click="mobileOpen=false" class="btn-outline text-xs">Spices</NuxtLink>
            <NuxtLink to="/catalog?category=coffee"   @click="mobileOpen=false" class="btn-outline text-xs">Coffee</NuxtLink>
            <NuxtLink to="/catalog?category=charcoal" @click="mobileOpen=false" class="btn-outline text-xs">Charcoal</NuxtLink>
            <NuxtLink to="/catalog?category=umkm"     @click="mobileOpen=false" class="btn-outline text-xs">UMKM</NuxtLink>
          </div>
        </details>
        <NuxtLink to="/services"     @click="mobileOpen=false" class="block py-2">Services</NuxtLink>
        <NuxtLink to="/projects"     @click="mobileOpen=false" class="block py-2">{{ t('nav.projects') }}</NuxtLink>
        <NuxtLink to="/certificates" @click="mobileOpen=false" class="block py-2">{{ t('nav.certificates') }}</NuxtLink>
        <NuxtLink to="/about"        @click="mobileOpen=false" class="block py-2">{{ t('nav.about') }}</NuxtLink>
        <NuxtLink to="/contact"      @click="mobileOpen=false" class="block py-2">{{ t('nav.contact') }}</NuxtLink>
      </div>
    </div>
  </header>
</template>
