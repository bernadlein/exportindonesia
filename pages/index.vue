<script setup lang="ts">
const { t } = useI18n()

// helper: kalau key i18n belum ada, pakai fallback agar halaman tetap tampil rapi
const tr = (key: string, fallback: string) => {
  const val = t(key) as string
  return val === key ? fallback : val
}
</script>

<template>
  <Hero />

  <section class="section">
    <h3 class="section-title">
      {{ tr('why.title', 'Why choose us') }}
    </h3>
    <p class="section-sub mt-1">
      {{ tr('why.sub', 'Compliance, speed, and clear communication.') }}
    </p>

    <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <ui-card>
        <h4 class="font-semibold mb-1">
          {{ tr('why.cards.compliance.title', 'Compliance & Docs') }}
        </h4>
        <p class="text-sm text-slate-600 dark:text-slate-300">
          {{ tr('why.cards.compliance.desc', 'NIB, HS, Halal/COA, Phytosanitary.') }}
        </p>
      </ui-card>

      <ui-card>
        <h4 class="font-semibold mb-1">
          {{ tr('why.cards.rfq.title', 'RFQ that Converts') }}
        </h4>
        <p class="text-sm text-slate-600 dark:text-slate-300">
          {{ tr('why.cards.rfq.desc', 'Step-by-step wizard + 24h SLA.') }}
        </p>
      </ui-card>

      <ui-card>
        <h4 class="font-semibold mb-1">
          {{ tr('why.cards.intl.title', 'International Ready') }}
        </h4>
        <p class="text-sm text-slate-600 dark:text-slate-300">
          {{ tr('why.cards.intl.desc', 'ID/EN & currency IDR/USD.') }}
        </p>
      </ui-card>

      <ui-card>
        <h4 class="font-semibold mb-1">
          {{ tr('why.cards.leads.title', 'Leads Tracked') }}
        </h4>
        <p class="text-sm text-slate-600 dark:text-slate-300">
          {{ tr('why.cards.leads.desc', 'Every RFQ recorded & exportable.') }}
        </p>
      </ui-card>
    </div>
  </section>

  <CTAWide />

  <Testimonials />
</template>
