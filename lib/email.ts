import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const FROM = process.env.EMAIL_FROM ?? 'Thanh Nguyen <noreply@thanhnv.dev>'
const NOTIFY_TO = process.env.EMAIL_NOTIFY_TO ?? 'thanhnv1022@gmail.com'

export async function sendContactNotification(opts: {
  name: string
  email: string
  message: string
}): Promise<void> {
  if (!resend) return

  const preview = opts.message.slice(0, 60).replace(/\n/g, ' ')
  const subject = `[Portfolio] New message from ${opts.name} — ${preview}${opts.message.length > 60 ? '…' : ''}`

  await resend.emails.send({
    from: FROM,
    to: NOTIFY_TO,
    replyTo: opts.email,
    subject,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#111">
        <p style="margin:0 0 4px;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:.05em">
          Portfolio Contact · ${opts.name}
        </p>
        <h2 style="margin:8px 0 20px;font-size:18px">${opts.email}</h2>

        <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px">
          <tr>
            <td style="padding:8px 12px;background:#f5f5f5;font-weight:600;width:80px;border-radius:4px 0 0 4px">Name</td>
            <td style="padding:8px 12px;background:#fafafa">${opts.name}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Email</td>
            <td style="padding:8px 12px;background:#fafafa">${opts.email}</td>
          </tr>
        </table>

        <div style="padding:16px;background:#f5f5f5;border-radius:8px;font-size:14px;color:#333;white-space:pre-wrap;line-height:1.6">${opts.message}</div>

        <p style="margin:20px 0 0;font-size:13px;color:#555">
          Reply to this email to respond directly to <strong>${opts.email}</strong>.
        </p>
        <p style="margin:24px 0 0;font-size:11px;color:#bbb">Nguyen Van Thanh · Portfolio Contact Form</p>
      </div>
    `,
  })
}

export async function sendContactAcknowledgement(opts: {
  name: string
  email: string
}): Promise<void> {
  if (!resend) return

  const firstName = opts.name.split(' ')[0]

  await resend.emails.send({
    from: FROM,
    to: opts.email,
    subject: 'Thanks for reaching out — Nguyen Van Thanh',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;color:#111">
        <p style="margin:0 0 20px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#555">
          Nguyen Van Thanh
        </p>
        <p style="margin:0 0 16px;color:#555;font-size:14px;line-height:1.6">Hi ${firstName},</p>
        <p style="margin:0 0 16px;color:#555;font-size:14px;line-height:1.6">
          Thanks for reaching out. I've received your message and will get back to you within 24 hours.
        </p>
        <p style="margin:0 0 16px;color:#555;font-size:14px;line-height:1.6">
          If you have any additional details to share in the meantime, just reply to this email.
        </p>
        <p style="margin:0 0 16px;color:#555;font-size:14px;line-height:1.6">
          Best regards,<br/>Thanh
        </p>
        <p style="margin:32px 0 0;font-size:11px;color:#bbb">
          This is an automated confirmation of your message.
        </p>
      </div>
    `,
  })
}
