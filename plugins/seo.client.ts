export default defineNuxtPlugin(() => {
  useHead({
    script: [{
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: useRuntimeConfig().public.company,
        url: 'https://example.com',
        sameAs: [],
        logo: '/favicon.svg'
      })
    }]
  })
})
