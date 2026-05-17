import { Hero } from '@/components/hero'
import { Skills } from '@/components/skills'
import { Projects } from '@/components/projects'
import { Experience } from '@/components/experience'
import { Contact } from '@/components/contact'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <div className="border-t border-border" />
      <Skills />
      <div className="border-t border-border" />
      <Projects />
      <div className="border-t border-border" />
      <Experience />
      <Contact />
    </main>
  )
}
