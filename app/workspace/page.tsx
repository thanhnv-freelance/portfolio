import { workspaceApps } from '@/data/workspace'
import { cn } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'

const statusLabel: Record<string, string> = {
  active: 'Active',
  'in-progress': 'In Progress',
  archived: 'Archived',
}

const statusClass: Record<string, string> = {
  active:
    'text-green-600 border-green-300 bg-green-50 dark:text-green-400 dark:border-green-800 dark:bg-green-950/30',
  'in-progress':
    'text-amber-600 border-amber-300 bg-amber-50 dark:text-amber-400 dark:border-amber-800 dark:bg-amber-950/30',
  archived:
    'text-faint border-border bg-subtle',
}

export const metadata = {
  title: 'Workspace — Local Apps',
  description: 'Local development application port registry for the AI_WS workspace.',
}

export default function WorkspacePage() {
  return (
    <main className="px-6 sm:px-12 lg:px-24 pt-24 pb-24 max-w-4xl mx-auto w-full">
      <h1 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-12">
        Local App Registry
      </h1>

      <div className="flex flex-col gap-3">
        {workspaceApps.map((app) => (
          <div
            key={app.name}
            className="border border-border rounded-xl p-5 bg-card flex flex-col sm:flex-row sm:items-center gap-4"
          >
            {/* Port badge */}
            <div className="shrink-0 w-16 text-center">
              {app.port ? (
                <span className="text-lg font-mono font-bold text-foreground">
                  {app.port}
                </span>
              ) : (
                <span className="text-sm font-mono text-faint">—</span>
              )}
            </div>

            {/* Main info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-sm font-semibold text-foreground font-mono">
                  {app.name}
                </span>
                <span
                  className={cn(
                    'text-xs font-mono px-2 py-0.5 rounded-full border',
                    statusClass[app.status]
                  )}
                >
                  {statusLabel[app.status]}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{app.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {app.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded bg-subtle text-xs font-mono text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: path + link */}
            <div className="shrink-0 flex flex-col items-end gap-2">
              {app.url && (
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink size={12} />
                  {app.url.replace('http://', '')}
                </a>
              )}
              <span className="text-xs font-mono text-faint">{app.path}</span>
              <span className="text-xs font-mono text-faint opacity-70">{app.command}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Note on freelancer-copilot */}
      <p className="mt-8 text-xs font-mono text-faint">
        * freelancer-copilot has no fixed port — defaults to 3000. Avoid running alongside other apps that default to 3000.
      </p>
    </main>
  )
}
