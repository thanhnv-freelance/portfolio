import { experience } from '@/data/profile'

export function Experience() {
  return (
    <section className="px-6 sm:px-12 lg:px-24 py-24 max-w-4xl mx-auto w-full">
      <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-12">
        Experience
      </h2>

      <div className="flex flex-col gap-10">
        {experience.map((role, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2 sm:gap-8">
            {/* Left: meta */}
            <div className="sm:pt-0.5">
              <p className="text-xs font-mono text-muted-foreground">{role.period}</p>
              <p className="text-xs font-mono text-faint mt-0.5">{role.location}</p>
            </div>

            {/* Right: content */}
            <div>
              <p className="text-sm font-semibold text-foreground">{role.company}</p>
              <p className="text-xs text-muted-foreground mt-0.5 mb-3">{role.title}</p>
              <ul className="flex flex-col gap-1.5">
                {role.highlights.map((h, j) => (
                  <li key={j} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-faint mt-1.5 shrink-0">—</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
