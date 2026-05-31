import { skills } from '@/data/profile'

const categories = [
  { label: 'Backend', items: skills.backend },
  { label: 'Cloud & DevOps', items: skills.cloud },
  { label: 'Databases', items: skills.databases },
  { label: 'System Design', items: skills.systemDesign },
]

function TriangleLevel({ level }: { level: number }) {
  return (
    <span className="flex gap-px ml-1.5" aria-label={`Proficiency: ${level} of 3`}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={i <= level ? 'text-foreground/70' : 'text-foreground/15'}
          style={{ fontSize: '9px', lineHeight: 1 }}
        >
          ▲
        </span>
      ))}
    </span>
  )
}

export function Skills() {
  return (
    <section className="px-6 sm:px-12 lg:px-24 py-24 max-w-4xl mx-auto w-full">
      <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-12">
        Core Expertise
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {categories.map(({ label, items }) => (
          <div key={label}>
            <p className="text-sm font-semibold text-foreground mb-4">{label}</p>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-md bg-subtle text-sm text-muted-foreground font-mono"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* AI & Machine Learning — full width, triangle proficiency mode */}
        <div className="sm:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <p className="text-sm font-semibold text-foreground">AI & Machine Learning</p>
            <span className="text-xs font-mono text-muted-foreground/50 flex items-center gap-1">
              <span className="text-foreground/70" style={{ fontSize: '9px' }}>▲▲▲</span>
              {' '}proficiency
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.ai.map(({ name, level }) => (
              <span
                key={name}
                className="inline-flex items-center px-3 py-1 rounded-md bg-subtle text-sm text-muted-foreground font-mono"
              >
                {name}
                <TriangleLevel level={level} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
