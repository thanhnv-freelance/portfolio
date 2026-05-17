import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Hero } from '@/components/hero'
import { Skills } from '@/components/skills'
import { Projects } from '@/components/projects'
import { Experience } from '@/components/experience'
import { Contact } from '@/components/contact'

export default function HomePage() {
  return (
    <main>
      <div id="about">
        <Hero />
      </div>
      <div className="border-t border-border" />
      <div id="skills">
        <Skills />
      </div>
      <div className="border-t border-border" />
      <div id="projects">
        <Projects />
        <div className="px-6 sm:px-12 lg:px-24 pb-16 max-w-4xl mx-auto w-full -mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all projects
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
      <div className="border-t border-border" />
      <div id="experience">
        <Experience />
      </div>
      <Contact />
    </main>
  )
}
