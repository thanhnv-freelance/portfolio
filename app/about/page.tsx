import { profile, experience } from '@/data/profile'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Nguyen Van Thanh',
  description: 'Senior Backend & Cloud Engineer with 10+ years building distributed systems for banking, fintech, and enterprise platforms.',
}

const expertise = [
  'Distributed systems design',
  'High-volume payment & remittance systems',
  'Event-driven microservices',
  'Spring Boot & Java backend',
  'AWS cloud architecture',
  'PostgreSQL & relational databases',
  'API design & integration',
  'Production observability & monitoring',
  'Banking & fintech platforms',
  'Cross-border transaction processing',
]

export default function AboutPage() {
  return (
    <main className="px-6 sm:px-12 lg:px-24 pt-24 pb-24 max-w-4xl mx-auto w-full">
      <h1 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-12">
        About
      </h1>

      <div className="flex flex-col gap-14">
        {/* Bio */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
            Hey, I&apos;m Thanh
          </h2>
          <div className="flex flex-col gap-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
            <p>
              I&apos;m a Senior Backend &amp; Cloud Engineer with over 10 years of experience designing
              and building large-scale distributed systems — primarily in banking, fintech, and
              enterprise platforms.
            </p>
            <p>
              My core focus is backend engineering: high-throughput transaction systems, event-driven
              microservices, and cloud infrastructure on AWS. I&apos;ve worked across Singapore,
              Vietnam, and Thailand, shipping production systems that process millions of
              financial transactions.
            </p>
            <p>
              Currently at{' '}
              <span className="text-foreground font-medium">
                {experience[0].company}
              </span>
              {' '}in Singapore, where I build cross-border remittance infrastructure and
              real-time payment processing systems.
            </p>
            <p>
              Outside of work I&apos;m usually exploring new system design patterns, writing about
              backend engineering, or looking for the next interesting distributed systems problem
              to solve.
            </p>
          </div>
        </div>

        {/* Expertise */}
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
            Expertise
          </p>
          <div className="flex flex-wrap gap-2">
            {expertise.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-md bg-subtle text-sm text-muted-foreground font-mono"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Experience companies */}
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
            Experience
          </p>
          <div className="flex flex-col gap-3">
            {experience.map((role, i) => (
              <div key={i} className="flex items-baseline justify-between gap-4 py-2 border-b border-border last:border-0">
                <div>
                  <span className="text-sm font-medium text-foreground">{role.company}</span>
                  <span className="text-xs text-muted-foreground ml-2">{role.title}</span>
                </div>
                <span className="text-xs font-mono text-muted-foreground shrink-0">{role.period}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Currently */}
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
            Currently
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
            Based in <span className="text-foreground">Singapore (UTC+8)</span>.{' '}
            {profile.availability} — open to remote collaboration across timezones.
            Reach me at{' '}
            <a
              href={`mailto:${profile.email}`}
              className="text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              {profile.email}
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  )
}
