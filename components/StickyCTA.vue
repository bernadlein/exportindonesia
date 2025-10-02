<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <!-- tampil di mobile -->
  <div class="fixed inset-x-0 bottom-3 md:hidden px-4 z-50">
    <div class="mx-auto max-w-md rounded-2xl shadow-lg border border-slate-200 bg-white p-2">
      <NuxtLink to="/contact" class="btn-primary w-full text-center">
        {{ t('cta.request') || 'Request Quote' }}
      </NuxtLink>
    </div>
  </div>
</template>
