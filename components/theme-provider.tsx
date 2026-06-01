'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'
export type FontSize = 'small' | 'default' | 'large'

type ThemeContextValue = {
  theme: Theme
  setTheme: (t: Theme) => void
  fontSize: FontSize
  setFontSize: (s: FontSize) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  setTheme: () => {},
  fontSize: 'default',
  setFontSize: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')
  const [fontSize, setFontSizeState] = useState<FontSize>('default')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    const resolved: Theme = stored === 'light' ? 'light' : 'dark'
    setThemeState(resolved)
    document.documentElement.classList.toggle('dark', resolved === 'dark')

    const storedSize = localStorage.getItem('portfolio:font-size') as FontSize | null
    const resolvedSize: FontSize =
      storedSize === 'small' || storedSize === 'default' || storedSize === 'large'
        ? storedSize
        : window.innerWidth < 1280 ? 'small' : window.innerWidth >= 2560 ? 'large' : 'default'
    setFontSizeState(resolvedSize)
    document.documentElement.setAttribute('data-font-size', resolvedSize)
  }, [])

  function setTheme(t: Theme) {
    setThemeState(t)
    localStorage.setItem('theme', t)
    document.documentElement.classList.toggle('dark', t === 'dark')
  }

  function setFontSize(s: FontSize) {
    setFontSizeState(s)
    localStorage.setItem('portfolio:font-size', s)
    document.documentElement.setAttribute('data-font-size', s)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, fontSize, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  )
}
