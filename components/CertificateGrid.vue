<script setup lang="ts">
const { data: items } = await useFetch('/api/certificates')
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
    <div v-for="c in items" :key="c.id" class="card overflow-hidden">
      <img 
        :src="c.img" 
        :alt="c.title" 
        loading="lazy"
        class="h-28 w-full object-cover">
      <div class="p-3 text-center">
        <p class="text-sm font-semibold">{{ c.title }}</p>
      </div>
    </div>
  </div>

  <div class="mt-8 card p-5">
    <h3 class="font-semibold text-lg">Traceability & Verification</h3>
    <p class="mt-1 text-sm text-slate-700">
      Dokumen dapat dibagikan on-request: Halal, COA, Phytosanitary, Fumigation, ISO/SNI. Setiap file memiliki nomor & tanggal verifikasi.
    </p>
    <div class="mt-3 flex gap-3">
      <NuxtLink to="/contact" class="btn-primary">Request Documents</NuxtLink>
      <NuxtLink to="/projects" class="btn-outline">See Recent Shipments</NuxtLink>
    </div>
  </div>
</template>
