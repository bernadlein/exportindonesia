
<script setup lang="ts">
const { t } = useI18n()
</script>
<template>
  <section class="section">
    <SectionHeading :title="t('about.title')" :sub="t('about.sub')" />
    <div class="card p-6 mt-6 grid md:grid-cols-2 gap-6 items-center">
      <div>
        <p class="text-slate-700 leading-relaxed">
          We are a professional export company based in Indonesia, focusing on high-quality agricultural commodities and curated UMKM products.
          Our process emphasizes transparency, compliance, and on-time delivery to global ports.
        </p>
        <ul class="mt-4 list-disc pl-5 text-slate-700 text-sm space-y-1">
          <li>Complete documentation: NIB, HS code mapping, Halal/COA, phytosanitary.</li>
          <li>Clear Incoterms & payment terms for each deal.</li>
          <li>RFQ workflow that captures all necessary details for faster quotations.</li>
        </ul>
      </div>
      <img class="rounded-2xl shadow object-cover w-full h-72" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop" alt="About">
    </div>
  </section>
</template>
