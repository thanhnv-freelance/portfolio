import { projects } from '@/data/profile'
import Link from 'next/link'
import Image from 'next/image'
import { Code2, Globe, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects — Nguyen Van Thanh',
  description: 'Backend and cloud engineering projects — remittance platforms, loan systems, and developer tools.',
}

export default function ProjectsPage() {
  return (
    <main className="px-6 sm:px-12 lg:px-24 pt-24 pb-24 max-w-4xl mx-auto w-full">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <h1 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-12">
        Projects
      </h1>

      <div className="flex flex-col gap-6">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="border border-border rounded-xl p-6 sm:p-8 bg-card flex flex-col gap-5"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-base font-semibold text-foreground">
                  {project.title}
                </h2>
                <span
                  className={cn(
                    'text-xs font-mono px-2 py-0.5 rounded-full border',
                    project.status === 'in-progress'
                      ? 'text-amber-600 border-amber-300 bg-amber-50 dark:text-amber-400 dark:border-amber-800 dark:bg-amber-950/30'
                      : 'text-green-600 border-green-300 bg-green-50 dark:text-green-400 dark:border-green-800 dark:bg-green-950/30'
                  )}
                >
                  {project.status === 'in-progress' ? 'In Progress' : 'Production'}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Code2 size={16} />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live demo"
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Globe size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Problem */}
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                Problem
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-foreground leading-relaxed">
              {project.description}
            </p>

            {/* Architecture screenshot */}
            {project.image && (
              <div className="rounded-lg overflow-hidden border border-border">
                <Image
                  src={project.image}
                  alt={`${project.title} architecture`}
                  width={800}
                  height={400}
                  className="w-full object-cover"
                />
              </div>
            )}

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md bg-subtle text-xs font-mono text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
