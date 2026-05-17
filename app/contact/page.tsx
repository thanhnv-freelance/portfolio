import { profile } from '@/data/profile'
import { Mail, Phone, Briefcase, Code2, Globe, MapPin, Clock } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Nguyen Van Thanh',
  description: 'Get in touch for freelance or contract backend and cloud engineering work.',
}

const contactItems = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
    icon: Phone,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/thanhnv2210',
    href: profile.linkedin,
    icon: Briefcase,
    external: true,
  },
  {
    label: 'GitHub',
    value: 'github.com/thanhnv-freelance',
    href: profile.github,
    icon: Code2,
    external: true,
  },
  {
    label: 'Upwork',
    value: 'upwork.com/freelancers/thanhnv2210',
    href: profile.upwork,
    icon: Globe,
    external: true,
  },
]

export default function ContactPage() {
  return (
    <main className="px-6 sm:px-12 lg:px-24 pt-24 pb-24 max-w-4xl mx-auto w-full">
      <h1 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-12">
        Contact
      </h1>

      <div className="flex flex-col gap-6 max-w-2xl">
        {/* Availability */}
        <div className="border border-border rounded-xl p-6 sm:p-8 bg-card flex flex-col gap-4">
          <p className="text-base font-semibold text-foreground">Availability</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
              {profile.availability}
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin size={14} className="shrink-0" />
              Singapore
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Clock size={14} className="shrink-0" />
              UTC+8 — open to remote collaboration across timezones
            </div>
          </div>
        </div>

        {/* Contact links */}
        <div className="border border-border rounded-xl p-6 sm:p-8 bg-card flex flex-col gap-4">
          <p className="text-base font-semibold text-foreground">Reach out</p>
          <div className="flex flex-col gap-3">
            {contactItems.map(({ label, value, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Icon size={15} className="shrink-0" />
                <span className="font-mono text-xs w-16 shrink-0 text-faint">{label}</span>
                <span className="group-hover:underline underline-offset-2">{value}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
