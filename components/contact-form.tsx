'use client'

import { useState, useTransition } from 'react'
import { submitContactAction } from '@/app/actions/contact'
import { Send } from 'lucide-react'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return
    startTransition(async () => {
      await submitContactAction({ name: name.trim(), email: email.trim(), message: message.trim() })
      setSubmitted(true)
    })
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-3 py-8">
        <p className="text-base font-semibold text-foreground">Message received!</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          I&apos;ll get back to you within 24 hours. Check your inbox for a confirmation email.
        </p>
        <button
          onClick={() => { setSubmitted(false); setName(''); setEmail(''); setMessage('') }}
          className="mt-2 self-start text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs font-mono text-muted-foreground">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-border"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-mono text-muted-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-border"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-mono text-muted-foreground">
          Message
        </label>
        <textarea
          id="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about your project..."
          rows={5}
          className="px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-border resize-none"
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={isPending || !name.trim() || !email.trim() || !message.trim()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 disabled:opacity-40 transition-opacity"
        >
          <Send size={14} />
          {isPending ? 'Sending…' : 'Send Message'}
        </button>
      </div>
    </form>
  )
}
