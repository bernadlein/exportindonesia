<script setup lang="ts">
const items = [
  { name:'Buyer – UAE', quote:'Great response time and professional documentation. Shipments arrived as planned.' },
  { name:'Importer – Germany', quote:'Pricing transparent, HS mapping and specs were clear. Smooth process.' },
  { name:'Distributor – KSA', quote:'Reliable monthly shipments for charcoal with consistent quality.' }
]
</script>

<template>
  <section class="section">
    <h3 class="section-title">What partners say</h3>
    <p class="section-sub">Selected testimonials from recent buyers</p>

    <div class="mt-6 grid md:grid-cols-3 gap-6">
      <article v-for="t in items" :key="t.name" class="card p-6">
        <p class="text-slate-700">“{{ t.quote }}”</p>
        <p class="mt-4 font-semibold text-slate-900">{{ t.name }}</p>
      </article>
    </div>
  </section>
</template>
