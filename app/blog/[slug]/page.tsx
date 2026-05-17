import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllSlugs, getArticleBySlug } from '@/lib/articles'
import { ArrowLeft } from 'lucide-react'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: `${article.title} — Nguyen Van Thanh`,
    description: article.summary,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  return (
    <main className="px-6 sm:px-12 lg:px-24 pt-24 pb-24 max-w-3xl mx-auto w-full">
      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors mb-12"
      >
        <ArrowLeft size={13} />
        All articles
      </Link>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 flex-wrap mb-4">
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
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-snug mb-4">
          {article.title}
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed border-l-2 border-border pl-4">
          {article.summary}
        </p>
      </div>

      {/* Article body */}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </main>
  )
}
