// server/api/email.post.ts
import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!process.env.RESEND_API_KEY) {
    setResponseStatus(event, 500)
    return { ok: false, error: 'RESEND_API_KEY is not set' }
  }
  const resend = new Resend(process.env.RESEND_API_KEY)

  const to = (process.env.RFQ_TO || '').split(',').map(s => s.trim()).filter(Boolean)
  const toList = to.length ? to : ['you@example.com']

  try {
    const { data } = await resend.emails.send({
      from: 'RFQ <rfq@yourdomain.io>',
      to: toList,
      subject: `RFQ: ${body.product || 'New Inquiry'}`,
      text: JSON.stringify(body, null, 2)
    })
    return { ok: true, id: data?.id }
  } catch (e:any) {
    setResponseStatus(event, 500)
    return { ok: false, error: String(e?.message || e) }
  }
})
