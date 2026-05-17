import { profile } from '@/data/profile'
import { ContactForm } from '@/components/contact-form'
import { Mail, Phone, Briefcase, Code2, Globe, MapPin } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Nguyen Van Thanh',
  description: 'Get in touch for freelance or contract backend and cloud engineering work.',
}

export default function ContactPage() {
  return (
    <main className="px-6 sm:px-12 lg:px-24 pt-24 pb-24 max-w-4xl mx-auto w-full">
      <h1 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-12">
        Contact
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-start">
        {/* Left: form */}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Get in Touch</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Looking for backend, cloud, or system design expertise? Send me a message and I&apos;ll
              get back to you.
            </p>
          </div>
          <ContactForm />
        </div>

        {/* Right: contact info */}
        <div className="flex flex-col gap-8">
          {/* Direct contact */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Direct
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail size={14} className="shrink-0" />
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone size={14} className="shrink-0" />
              {profile.phone}
            </a>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin size={14} className="shrink-0" />
              Singapore (UTC+8)
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Online
            </p>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Briefcase size={14} className="shrink-0" />
              linkedin.com/in/thanhnv2210
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Code2 size={14} className="shrink-0" />
              github.com/thanhnv-freelance
            </a>
            <a
              href={profile.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe size={14} className="shrink-0" />
              Upwork profile
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
