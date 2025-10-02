// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // Matikan devtools biar konsol bersih
  devtools: { enabled: false },

  // Hilangkan warning compatibilityDate dari Nitro
  nitro: { compatibilityDate: '2025-10-02' },

  // PostCSS di sini (hapus file postcss.config.js jika masih ada)
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  // JANGAN override vite.optimizeDeps
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@pinia/nuxt'],
  css: ['@/assets/css/tailwind.css'],

  app: {
    head: {
      title: 'Piter Ritiauw Exports – International Export Company',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Professional international export website with product catalog, RFQ and compliance.' },
        { name: 'theme-color', content: '#166534' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Piter Ritiauw Exports' },
        { property: 'og:description', content: 'Exporting Indonesia’s best agricultural & UMKM products.' },
        { property: 'og:image', content: '/og-cover.jpg' },
        { property: 'og:url', content: 'https://example.com' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Piter Ritiauw Exports' },
        { name: 'twitter:description', content: 'Exporting Indonesia’s best agricultural & UMKM products.' },
        { name: 'twitter:image', content: '/og-cover.jpg' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'canonical', href: 'https://example.com' }
      ]
    }
  }, // ⬅️ penting: tutup `app` dan beri koma

  runtimeConfig: {
    public: {
      company: process.env.NUXT_PUBLIC_COMPANY || 'Piter Ritiauw Exports',
      whatsapp: process.env.NUXT_PUBLIC_WHATSAPP || '+6282285097317',
      defaultCurrency: process.env.NUXT_PUBLIC_DEFAULT_CURRENCY || 'IDR'
    }
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'id', name: 'Bahasa Indonesia', file: 'id.json' }
    ],
    lazy: true,
    langDir: 'locales'
  },

  tailwindcss: { viewer: false }
})
