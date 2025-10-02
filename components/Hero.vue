<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="hero-bg">
    <div class="section grid grid-cols-1 md:grid-cols-2 gap-10">
      <div class="flex flex-col justify-center">
        <ui-badge>🌿 {{ t('hero.badge') }}</ui-badge>
        <h2 class="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
          {{ t('hero.title1') }} <span class="text-brand-700">{{ t('hero.title2') }}</span> {{ t('hero.title3') }}
        </h2>
        <p class="mt-4 text-slate-600">
          {{ t('hero.sub') }}
        </p>
        <div class="mt-6 flex flex-wrap items-center gap-3">
          <ui-button to="/contact"> {{ t('cta.request') }} </ui-button>
          <ui-button to="/catalog" variant="outline"> {{ t('cta.browse') }} </ui-button>
        </div>
        <div class="mt-8 opacity-80"><LogoCloud/></div>
      </div>

      <div class="relative">
        <img class="h-full w-full rounded-3xl object-cover shadow-lift"
             src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1600&auto=format&fit=crop"
             loading="lazy"
             alt="Agriculture fields">
        <div class="absolute -bottom-5 -left-5 hidden md:block rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <p class="text-xs text-slate-500">Demo only – placeholder image</p>
        </div>
      </div>
    </div>
  </section>
</template>
