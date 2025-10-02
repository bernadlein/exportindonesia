<template>
  <section class="container">
    <div class="rounded-3xl overflow-hidden relative">
      <div class="absolute inset-0 bg-gradient-to-r from-brand-700 via-brand-600 to-limex-500 opacity-95"></div>
      <img class="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
           src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1600&auto=format&fit=crop" alt="">
      <div class="relative p-8 md:p-12 text-white">
        <h3 class="text-2xl md:text-3xl font-extrabold">Ready to ship the best of Indonesia?</h3>
        <p class="mt-2 text-white/90 max-w-3xl">
          Get a detailed quotation (Incoterms, packing, lead time) within 24 hours. We handle documentation end-to-end.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <ui-button to="/contact" variant="accent">Request Quote</ui-button>
          <ui-button to="/certificates" variant="outline">Request Documents</ui-button>
        </div>
      </div>
    </div>
  </section>
</template>
