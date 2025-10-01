
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@pinia/nuxt'],
  css: ['@/assets/css/tailwind.css'],
  app: {
    head: {
      title: 'Piter Ritiauw Exports – International Export Company',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Professional international export website with product catalog, RFQ and compliance.' },
        { name: 'theme-color', content: '#0ea5e9' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap' }
      ]
    }
  },
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
  tailwindcss: { viewer: false },
})
