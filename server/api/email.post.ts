export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!process.env.RESEND_API_KEY) {
    setResponseStatus(event, 501)
    return { ok: false, error: 'Email disabled: RESEND_API_KEY not set' }
  }

  let Resend: any
  try { ({ Resend } = await import('resend')) }
  catch {
    setResponseStatus(event, 501)
    return { ok: false, error: 'Email disabled: "resend" package not installed' }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const to = (process.env.RFQ_TO || '').split(',').map(s=>s.trim()).filter(Boolean)
  if (!to.length) to.push('you@example.com')

  try {
    const { data } = await resend.emails.send({
      from: 'RFQ <rfq@yourdomain.io>',
      to,
      subject: `RFQ: ${body?.product || 'New Inquiry'}`,
      text: JSON.stringify(body ?? {}, null, 2)
    })
    return { ok: true, id: data?.id ?? null }
  } catch (e:any) {
    setResponseStatus(event, 500)
    return { ok: false, error: String(e?.message || e) }
  }
})
