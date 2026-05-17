import { skills } from '@/data/profile'

const categories = [
  { label: 'Backend', items: skills.backend },
  { label: 'Cloud & DevOps', items: skills.cloud },
  { label: 'Databases', items: skills.databases },
  { label: 'System Design', items: skills.systemDesign },
]

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
      </div>
    </section>
  )
}
