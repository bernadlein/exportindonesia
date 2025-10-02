<script setup lang="ts">
const { t } = useI18n()
</script>
<template>
  <section class="hero-bg">
    <div class="section grid grid-cols-1 md:grid-cols-2 gap-10">
      <div class="flex flex-col justify-center">
        <ui-badge>★ {{ t('hero.badge') }}</ui-badge>
        <h2 class="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
          {{ t('hero.title1') }} <span class="text-brand-600">{{ t('hero.title2') }}</span> {{ t('hero.title3') }}
        </h2>
        <p class="mt-4 text-slate-600">{{ t('hero.sub') }}</p>
        <div class="mt-6 flex flex-wrap items-center gap-3">
          <ui-button to="/contact"> {{ t('cta.request') }} </ui-button>
          <ui-button to="/catalog" variant="outline"> {{ t('cta.browse') }} </ui-button>
        </div>
        <div class="mt-8"><LogoCloud/></div>
      </div>
      <div class="relative">
        <img class="h-full w-full rounded-3xl object-cover shadow-lift"
             src="https://images.unsplash.com/photo-1516211881204-3d145708d993?q=80&w=1600&auto=format&fit=crop"
             alt="Hero">
      </div>
    </div>
  </section>
</template>
