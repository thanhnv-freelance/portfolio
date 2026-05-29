// Quick smoke test for the Resend email config
// Usage: node scripts/test-email.mjs
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Load .env.local manually (no dotenv dependency needed)
const envPath = resolve(process.cwd(), '.env.local')
for (const line of readFileSync(envPath, 'utf8').split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const [key, ...rest] = trimmed.split('=')
  process.env[key.trim()] = rest.join('=').trim()
}

const { Resend } = await import('resend')

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.EMAIL_FROM
const NOTIFY_TO = process.env.EMAIL_NOTIFY_TO

console.log('Config:')
console.log('  RESEND_API_KEY :', process.env.RESEND_API_KEY ? `${process.env.RESEND_API_KEY.slice(0, 8)}…` : '(missing)')
console.log('  EMAIL_FROM     :', FROM)
console.log('  EMAIL_NOTIFY_TO:', NOTIFY_TO)
console.log('')

// Test 1: Notification email to owner
console.log('Sending notification email to owner…')
const r1 = await resend.emails.send({
  from: FROM,
  to: NOTIFY_TO,
  replyTo: 'test-sender@example.com',
  subject: '[Portfolio Test] Contact form notification',
  html: `
    <div style="font-family:sans-serif;max-width:520px;padding:32px 24px;color:#111">
      <p style="font-size:12px;color:#888;text-transform:uppercase">Portfolio Contact · Test User</p>
      <h2 style="margin:8px 0 20px">test-sender@example.com</h2>
      <div style="padding:16px;background:#f5f5f5;border-radius:8px;font-size:14px;color:#333">
        This is a test message from the portfolio contact form smoke test.
      </div>
      <p style="margin:20px 0 0;font-size:13px;color:#555">
        Reply to this email to respond directly to <strong>test-sender@example.com</strong>.
      </p>
    </div>
  `,
})
console.log('  Result:', r1.error ? `ERROR — ${r1.error.message}` : `OK — id: ${r1.data?.id}`)

// Test 2: Acknowledgement email to user
// Note: with onboarding@resend.dev, this only works if NOTIFY_TO is the Resend account email
console.log('')
console.log('Sending acknowledgement email to user…')
const r2 = await resend.emails.send({
  from: FROM,
  to: NOTIFY_TO, // using NOTIFY_TO as proxy — onboarding@resend.dev can't send to arbitrary emails
  subject: '[Portfolio Test] Thanks for reaching out',
  html: `
    <div style="font-family:sans-serif;max-width:480px;padding:32px 24px;color:#111">
      <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#555;margin:0 0 20px">
        Nguyen Van Thanh
      </p>
      <p style="margin:0 0 16px;color:#555;font-size:14px;line-height:1.6">Hi Test,</p>
      <p style="margin:0 0 16px;color:#555;font-size:14px;line-height:1.6">
        Thanks for reaching out. I've received your message and will get back to you within 24 hours.
      </p>
      <p style="margin:32px 0 0;font-size:11px;color:#bbb">This is an automated confirmation of your message.</p>
    </div>
  `,
})
console.log('  Result:', r2.error ? `ERROR — ${r2.error.message}` : `OK — id: ${r2.data?.id}`)
