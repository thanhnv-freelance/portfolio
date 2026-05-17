'use server'

import { sendContactNotification, sendContactAcknowledgement } from '@/lib/email'

export type ContactInput = {
  name: string
  email: string
  message: string
}

export async function submitContactAction(input: ContactInput): Promise<void> {
  const { name, email, message } = input

  // Both fire-and-forget — user sees success regardless of email delivery
  sendContactNotification({ name, email, message }).catch((err) =>
    console.error('[contact] notification failed:', err),
  )
  sendContactAcknowledgement({ name, email }).catch((err) =>
    console.error('[contact] acknowledgement failed:', err),
  )
}
