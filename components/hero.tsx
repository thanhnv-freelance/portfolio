import { Code2, Briefcase, Globe, Mail } from 'lucide-react'

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/thanhnguyen',
    icon: Code2,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/thanhnguyen',
    icon: Briefcase,
  },
  {
    label: 'Upwork',
    href: 'https://upwork.com/freelancers/thanhnguyen',
    icon: Globe,
  },
  {
    label: 'Email',
    href: 'mailto:hello@thanhnguyen.dev',
    icon: Mail,
  },
]

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-24 max-w-4xl mx-auto w-full">
      {/* Availability badge */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground border border-border rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Available for freelance &amp; contract
        </span>
      </div>

      {/* Name */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
        Thanh Nguyen
      </h1>

      {/* Title */}
      <p className="mt-3 text-lg sm:text-xl font-mono text-muted-foreground">
        Full-Stack Engineer · Cloud &amp; Architecture
      </p>

      {/* Bio */}
      <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
        I build scalable backend systems, cloud-native applications, and API
        integrations — specializing in{' '}
        <span className="text-foreground font-medium">Java, Spring Boot</span>,{' '}
        <span className="text-foreground font-medium">AWS</span>, and{' '}
        <span className="text-foreground font-medium">Next.js</span>.
        5+ years delivering production systems for banking, payments, and
        remittance platforms.
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
      </div>
    </section>
  )
}
