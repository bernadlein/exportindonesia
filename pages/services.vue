<script setup lang="ts"></script>
<template>
  <section class="section">
    <div class="grid md:grid-cols-2 gap-6 items-start">
      <div>
        <h1 class="text-3xl font-extrabold">Services & Solutions</h1>
        <p class="mt-2 text-slate-600">
          Single-source platform for quotes, documentation and compliance—terinspirasi dari Flexport & Maersk UX.
        </p>
        <ul class="mt-6 space-y-3 text-sm">
          <li class="card p-4"><b>Quotes Fast</b> — RFQ wizard, SLA 24 jam, multi-currency.</li>
          <li class="card p-4"><b>Documents & Compliance</b> — Halal, COA, Phytosanitary, Fumigation, HS code mapping.</li>
          <li class="card p-4"><b>Logistics</b> — Incoterms jelas, opsi packing, koordinasi port.</li>
          <li class="card p-4"><b>Partners UMKM</b> — kurasi & standardisasi siap ekspor.</li>
        </ul>
        <div class="mt-6 flex gap-3">
          <NuxtLink to="/contact" class="btn-primary">Request Quote</NuxtLink>
          <NuxtLink to="/certificates" class="btn-outline">See Certificates</NuxtLink>
        </div>
      </div>
      <img class="rounded-2xl shadow object-cover w-full h-80"
           src="https://images.unsplash.com/photo-1517957754644-7688f16e6a36?q=80&w=1600&auto=format&fit=crop"
           alt="Services">
    </div>
  </section>
</template>
