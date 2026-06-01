'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/theme-toggle'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-24 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-mono font-semibold text-foreground hover:text-muted-foreground transition-colors"
        >
          Thanh Nguyen
        </Link>

        <div className="flex items-center gap-1">
          {navLinks.map(({ label, href }) => {
            const isActive =
              href === '/about'
                ? pathname === '/about'
                : href === '/projects'
                ? pathname === '/projects'
                : href === '/contact'
                ? pathname === '/contact'
                : href === '/blog'
                ? pathname.startsWith('/blog')
                : false
            return (
              <Link
                key={label}
                href={href}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  isActive
                    ? 'text-foreground bg-subtle'
                    : 'text-muted-foreground hover:text-foreground hover:bg-subtle'
                }`}
              >
                {label}
              </Link>
            )
          })}
          <div className="hidden sm:flex items-center gap-1 ml-1">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}
