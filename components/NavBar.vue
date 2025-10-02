<script setup lang="ts">
const { t, locale, setLocale } = useI18n()
const config = useRuntimeConfig()
const currency = useCurrency()

// state untuk mega menu (dipakai hover di desktop & click di mobile)
const openMega = ref(false)
let closeTimer: ReturnType<typeof setTimeout> | null = null

const openNow = () => {
  if (closeTimer) clearTimeout(closeTimer)
  openMega.value = true
}
const scheduleClose = () => {
  if (closeTimer) clearTimeout(closeTimer)
  closeTimer = setTimeout(() => (openMega.value = false), 150)
}
const toggleClick = () => (openMega.value = !openMega.value)
const onEscape = (e: KeyboardEvent) => e.key === 'Escape' && (openMega.value = false)
onMounted(() => document.addEventListener('keydown', onEscape))
onBeforeUnmount(() => document.removeEventListener('keydown', onEscape))

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
      <!-- Brand -->
      <NuxtLink to="/" class="flex items-center gap-3">
        <img src="/favicon.svg" alt="PR" class="h-9 w-9 rounded-xl shadow" />
        <div class="leading-tight">
          <p class="text-xs text-slate-500">Export Company</p>
          <h1 class="text-base font-bold">{{ config.public.company }}</h1>
        </div>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden lg:flex items-center gap-6 text-sm">
        <!-- WRAPPER menampung trigger + panel -->
        <div class="relative"
             @mouseenter="openNow" @mouseleave="scheduleClose">
          <!-- Trigger -->
          <button class="inline-flex items-center gap-2 hover:text-brand-600"
                  type="button" @click="toggleClick">
            Products
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform"
                 :class="openMega ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <!-- Panel -->
          <div v-show="openMega"
               class="absolute left-0 top-full translate-y-2 w-[680px] rounded-2xl
                      border border-slate-200 bg-white p-6 shadow-2xl z-[60]">
            <div class="grid grid-cols-2 gap-4">
              <NuxtLink v-for="c in productCats" :key="c.to" :to="c.to"
                        class="card p-4 hover:shadow cursor-pointer">
                <h4 class="font-semibold">{{ c.name }}</h4>
                <p class="text-xs text-slate-600">Browse {{ c.name.toLowerCase() }}</p>
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
        <NuxtLink to="/contact" class="ml-1 btn-primary text-sm">{{ t('cta.request') }}</NuxtLink>
      </div>
    </div>
  </header>
</template>
