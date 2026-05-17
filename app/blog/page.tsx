import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'

export const metadata = {
  title: 'Blog — Nguyen Van Thanh',
  description: 'Engineering articles on backend systems, PostgreSQL, microservices, and distributed architecture.',
}

export default function BlogPage() {
  const articles = getAllArticles()

  return (
    <main className="px-6 sm:px-12 lg:px-24 py-24 max-w-4xl mx-auto w-full">
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
        Writing
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
        Engineering Articles
      </h1>
      <p className="text-sm text-muted-foreground mb-12 max-w-xl">
        Deep-dives on backend systems, PostgreSQL performance, distributed architecture, and lessons from production incidents.
      </p>

      <div className="flex flex-col divide-y divide-border">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="py-8 group flex flex-col gap-3 hover:no-underline"
          >
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-mono text-faint">{article.date}</span>
              <div className="flex gap-1.5 flex-wrap">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2 py-0.5 rounded bg-subtle text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <h2 className="text-base font-semibold text-foreground group-hover:text-muted-foreground transition-colors leading-snug">
              {article.title}
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {article.summary}
            </p>
          </Link>
        ))}
      </div>
    </main>
  )
}
