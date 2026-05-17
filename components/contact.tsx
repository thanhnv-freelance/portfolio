import Link from 'next/link'
import { profile } from '@/data/profile'
import { Mail, Briefcase, ArrowRight } from 'lucide-react'

export function Contact() {
  return (
    <section className="px-6 sm:px-12 lg:px-24 py-24 max-w-4xl mx-auto w-full border-t border-border">
      <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-12">
        Contact
      </h2>

      <div className="flex flex-col gap-6 max-w-xl">
        <p className="text-2xl sm:text-3xl font-bold text-foreground leading-snug">
          Available for freelance &amp; contract work.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Looking for backend, cloud, or system design expertise? Let&apos;s talk about your project.
        </p>

        <div className="flex flex-wrap gap-3 mt-2">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Mail size={15} />
            Get in touch
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-subtle transition-colors"
          >
            <Briefcase size={15} />
            LinkedIn
          </a>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Full contact details
          <ArrowRight size={14} />
        </Link>
      </div>

    </section>
  )
}
