import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles')

export interface ArticleMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
}

export interface Article extends ArticleMeta {
  content: string
}

export function getAllArticles(): ArticleMeta[] {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.md'))

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8')
      const { data } = matter(raw)
      return {
        slug: data.slug as string,
        title: data.title as string,
        date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
        tags: (data.tags as string[]) ?? [],
        summary: data.summary as string,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getArticleBySlug(slug: string): Article | null {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.md'))

  for (const file of files) {
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8')
    const { data, content } = matter(raw)
    if (data.slug === slug) {
      return {
        slug: data.slug as string,
        title: data.title as string,
        date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
        tags: (data.tags as string[]) ?? [],
        summary: data.summary as string,
        content: marked(content) as string,
      }
    }
  }
  return null
}

export function getAllSlugs(): string[] {
  return getAllArticles().map((a) => a.slug)
}
