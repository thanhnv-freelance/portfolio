# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal engineering portfolio for Thanh Nguyen — a Full-Stack Engineer specializing in backend systems, cloud-native applications, and API integrations. The portfolio targets technical clients (startups, engineering managers, technical founders) and emphasizes engineering depth over visual flair.

## Tech Stack (confirmed from workspace patterns)

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | TailwindCSS v4 |
| UI Components | shadcn/ui — style `base-nova`, base color `neutral` |
| Icons | Lucide React |
| Font | Geist Variable (sans + mono) |
| Charts | Recharts |
| Testing | Vitest |
| Hosting | Vercel |
| Content | Markdown / JSON in `content/` and `data/` |

## UI Theme Conventions

Consistent across all workspace projects — follow these exactly:

- Dark/light mode via CSS variables on `:root` / `.dark` class on `<html>`
- Semantic tokens: `--background`, `--foreground`, `--card`, `--border`, `--muted`, `--muted-foreground`
- Never write `bg-white dark:bg-gray-800` — always use semantic utility classes (`bg-background`, `text-foreground`, etc.)
- Neutral gray palette — no accent color (matches engineer positioning)
- Border radius base: `0.625rem`

## Planned Repository Structure

```
portfolio/
├── app/          # Next.js App Router pages and layouts
├── components/   # Reusable UI components
├── content/      # Markdown content for projects/blog
├── data/         # JSON data (skills, projects, experience)
├── public/       # Static assets (images, diagrams)
└── styles/       # Global styles
```

## Commands

```bash
npm run dev       # Start dev server on http://localhost:3010
npm run build     # Production build
npm run lint      # ESLint
npm run start     # Start production server
npm run test      # Run Vitest
```

## Portfolio Sections

1. **Hero** — Name, title, one-liner, links (GitHub, LinkedIn, Upwork, Email)
2. **Skills** — Categorized: Backend, Cloud & DevOps, Database, Frontend
3. **Featured Projects** (core) — 3 projects initially:
   - Freelancer Copilot
   - Payment/Remittance System
   - Cloud Monitoring Dashboard
4. **Experience Summary** — Years, domains, technical strengths (not a full resume)
5. **Contact** — Simple CTA for freelance/contract work

## Design Principles

- Minimalist, clean typography, dashboard feel
- No excessive animations, no 3D effects
- Architecture-focused project descriptions (emphasize systems thinking, not feature lists)
- Responsive design is required; dark/light mode is optional

## Content Tone

Project descriptions should highlight architecture and engineering decisions, e.g.:
> "Designed a scalable remittance backend supporting asynchronous transaction processing, API integrations, and audit logging."

Not:
> "Built a payment app."
