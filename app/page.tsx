import { Hero } from '@/components/hero'
import { Skills } from '@/components/skills'
import { Experience } from '@/components/experience'

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
      <div id="experience">
        <Experience />
      </div>
    </main>
  )
}
