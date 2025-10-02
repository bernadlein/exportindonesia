// server/api/email.post.ts
// Safe email sender: works even if "resend" package is not installed.
// - If RESEND_API_KEY is missing OR package not installed, it returns 501 (feature disabled)
// - Otherwise, it sends an email with the RFQ payload.

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Feature flag: only try email if API key exists
  if (!process.env.RESEND_API_KEY) {
    setResponseStatus(event, 501)
    return { ok: false, error: 'Email disabled: RESEND_API_KEY not set' }
  }

  // Lazy import to avoid build/runtime error when package is not installed
  let Resend: any
  try {
    ;({ Resend } = await import('resend'))
  } catch {
    setResponseStatus(event, 501)
    return { ok: false, error: 'Email disabled: "resend" package not installed' }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  // Recipients (comma separated in env). Fallback to placeholder.
  const toList =
    (process.env.RFQ_TO || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  if (toList.length === 0) toList.push('you@example.com')

  try {
    const { data } = await resend.emails.send({
      from: 'RFQ <rfq@yourdomain.io>',
      to: toList,
      subject: `RFQ: ${body?.product || 'New Inquiry'}`,
      text: JSON.stringify(body ?? {}, null, 2)
    })
    return { ok: true, id: data?.id ?? null }
  } catch (e: any) {
    setResponseStatus(event, 500)
    return { ok: false, error: String(e?.message || e) }
  }
})
