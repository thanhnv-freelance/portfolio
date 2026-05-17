import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'

export const metadata = {
  title: 'Blog — Nguyen Van Thanh',
  description: 'Engineering articles on backend systems, PostgreSQL, microservices, and distributed architecture.',
}

export default function BlogPage() {
  const articles = getAllArticles()

  return (
    <main className="px-6 sm:px-12 lg:px-24 pt-24 pb-24 max-w-4xl mx-auto w-full">
      <h1 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-12">
        Writing
      </h1>

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
