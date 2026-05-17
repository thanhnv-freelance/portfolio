import { Code2, Briefcase, Globe, Mail, FileDown } from 'lucide-react'
import { profile } from '@/data/profile'

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/thanhnv-freelance',
    icon: Code2,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/thanhnv2210',
    icon: Briefcase,
  },
  {
    label: 'Upwork',
    href: 'https://upwork.com/freelancers/thanhnv2210',
    icon: Globe,
  },
  {
    label: 'Email',
    href: 'mailto:thanhnv1022@gmail.com',
    icon: Mail,
  },
]

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-24 max-w-4xl mx-auto w-full pt-14">
      {/* Availability badge */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground border border-border rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Available for freelance &amp; contract
        </span>
      </div>

      {/* Name */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
        Nguyen Van Thanh
      </h1>

      {/* Title */}
      <p className="mt-3 text-lg sm:text-xl font-mono text-muted-foreground">
        Senior Backend &amp; Cloud Engineer
      </p>

      {/* Bio */}
      <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
        10+ years designing and building large-scale distributed systems for
        banking, fintech, and enterprise platforms. Specialized in{' '}
        <span className="text-foreground font-medium">Spring Boot microservices</span>,{' '}
        <span className="text-foreground font-medium">AWS</span>, high-volume{' '}
        <span className="text-foreground font-medium">payment &amp; remittance systems</span>,
        and event-driven architectures.
      </p>

      {/* Links */}
      <div className="mt-10 flex flex-wrap gap-3">
        {links.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-subtle transition-colors"
          >
            <Icon size={15} />
            {label}
          </a>
        ))}
        <a
          href={profile.resume}
          download
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-subtle transition-colors"
        >
          <FileDown size={15} />
          Resume
        </a>
      </div>
    </section>
  )
}
