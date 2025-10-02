export default defineEventHandler((event) => {
  const base = 'https://example.com' // ganti saat live
  const urls = [
    '', '/catalog', '/services', '/projects', '/certificates', '/about', '/contact'
  ].map(p => `<url><loc>${base}${p}</loc><changefreq>weekly</changefreq><priority>${p===''?1.0:0.7}</priority></url>`).join('')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`
  event.node.res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  return xml
})
