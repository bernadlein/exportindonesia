
<script setup lang="ts">
const props = defineProps<{ p: any, price: string }>()
const { t } = useI18n()
</script>
<template>
  <article class="card overflow-hidden">
    <img :src="p.img" :alt="p.name" class="h-48 w-full object-cover"/>
    <div class="p-5">
      <div class="flex items-center justify-between">
        <h4 class="font-semibold">{{ p.name }}</h4>
        <span class="text-xs rounded-full bg-slate-100 px-3 py-1 text-slate-700">{{ t('catalog.hs') }} {{ p.hs }}</span>
      </div>
      <p class="mt-1 text-sm text-slate-600">{{ t('catalog.moq') }}: {{ p.moq }}</p>
      <p class="mt-1 text-sm"><span class="text-slate-500">{{ t('catalog.price') }}:</span> <b>{{ price }}</b></p>
      <div class="mt-4 flex items-center gap-2">
        <NuxtLink to="/contact" class="btn-primary text-sm">{{ t('catalog.rfq') }}</NuxtLink>
        <NuxtLink to="/contact" class="btn-outline text-sm">{{ t('catalog.details') }}</NuxtLink>
      </div>
    </div>
  </article>
</template>
