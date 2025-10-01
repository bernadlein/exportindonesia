
<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="section grid grid-cols-1 md:grid-cols-2 gap-10">
    <div class="flex flex-col justify-center">
      <span class="badge">★ {{ t('hero.badge') }}</span>
      <h2 class="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
        {{ t('hero.title1') }} <span class="text-brand">{{ t('hero.title2') }}</span> {{ t('hero.title3') }}
      </h2>
      <p class="mt-4 text-slate-600">{{ t('hero.sub') }}</p>
      <div class="mt-6 flex flex-wrap items-center gap-3">
        <NuxtLink to="/contact" class="btn-primary">{{ t('cta.request') }}</NuxtLink>
        <NuxtLink to="/catalog" class="btn-outline">{{ t('cta.browse') }}</NuxtLink>
      </div>
      <ul class="mt-6 grid grid-cols-3 gap-4 text-sm">
        <li class="card p-4"><p class="text-2xl font-extrabold">30+</p><p class="text-slate-600">Countries</p></li>
        <li class="card p-4"><p class="text-2xl font-extrabold">5000t+</p><p class="text-slate-600">Capacity</p></li>
        <li class="card p-4"><p class="text-2xl font-extrabold">24h</p><p class="text-slate-600">SLA</p></li>
      </ul>
    </div>
    <div class="relative">
      <img class="h-full w-full rounded-3xl object-cover shadow-xl" src="https://images.unsplash.com/photo-1516211881204-3d145708d993?q=80&w=1600&auto=format&fit=crop" alt="Hero"/>
      <div class="absolute -bottom-6 -left-6 hidden md:block rounded-3xl border border-slate-200 bg-white p-4 shadow-xl">
        <p class="text-xs text-slate-500">Demo only – placeholder images</p>
      </div>
    </div>
  </section>

  <section class="section">
    <SectionHeading :title="t('why.title')" />
    <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <FeatureCard icon="📑" :title="t('why.c1')" :desc="t('why.c1d')" />
      <FeatureCard icon="🧭" :title="t('why.c2')" :desc="t('why.c2d')" />
      <FeatureCard icon="🌐" :title="t('why.c3')" :desc="t('why.c3d')" />
      <FeatureCard icon="📈" :title="t('why.c4')" :desc="t('why.c4d')" />
    </div>
  </section>
</template>
