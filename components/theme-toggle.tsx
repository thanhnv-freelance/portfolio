'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-subtle transition-colors"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
