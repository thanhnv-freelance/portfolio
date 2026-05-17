# Portfolio TODO

## Confirmed Tech Stack

Based on workspace analysis across all projects — this is what you actually use:

| Layer | Choice | Source |
|-------|--------|--------|
| Framework | Next.js 16 (App Router) | freelancer-copilot, ai-architect-os, english-learning-app |
| Language | TypeScript 5 | all projects |
| Styling | TailwindCSS v4 | all frontend projects |
| UI Components | shadcn/ui (`base-nova`, neutral) | job-evolution, ai-architect-os |
| Icons | Lucide React | job-evolution, ai-architect-os |
| Font | Geist Variable (sans + mono) | freelancer-copilot, job-evolution |
| Charts | Recharts | freelancer-copilot, job-evolution, ai-architect-os |
| Testing | Vitest | freelancer-copilot, job-evolution |
| Hosting | Vercel | (planned, confirmed in initial.md) |

## Confirmed UI Theme

- **Dark/light mode** via CSS variables on `:root` / `.dark`
- **Semantic tokens**: `--background`, `--foreground`, `--card`, `--border`, `--muted`, `--muted-foreground`
- **Color palette**: neutral grays (no accent color — matches "engineer, not designer" positioning)
- **Radius**: `0.625rem` base
- **Pattern**: never write `bg-white dark:bg-gray-800` — always use semantic utility classes

## Phase 1 — Scaffold (Week 1)

- [x] Scaffold Next.js 16 + TypeScript + TailwindCSS v4 + App Router (manual, create-next-app blocked by existing files)
- [x] Install Lucide React, Geist font, clsx, tailwind-merge, tw-animate-css, Recharts
- [x] Set up CSS variables in `app/globals.css` (semantic tokens, dark/light mode)
- [x] `app/layout.tsx` with Geist font + FOUC prevention script
- [x] `lib/utils.ts` with `cn()` helper
- [x] `components.json` for shadcn/ui (style: `base-nova`, base color: `neutral`)
- [ ] Run `npx shadcn@latest add` for needed components as sections are built
- [ ] Deploy empty shell to Vercel and connect GitHub repo

## Phase 2 — Core Sections (Week 1-2)

- [ ] **Hero section** — name, title, one-liner, links (GitHub, LinkedIn, Upwork, Email)
- [ ] **Skills section** — categorized: Backend / Cloud & DevOps / Database / Frontend
- [ ] **Featured Projects** — 3 cards (Freelancer Copilot, Payment System, Cloud Monitoring)
  - Each card: problem, stack badges, architecture note, links (GitHub + live)
- [ ] **Experience summary** — 5+ years, banking/payments/remittance/cloud domains
- [ ] **Contact section** — CTA for freelance/contract

## Phase 3 — Polish (Week 2-3)

- [ ] Add architecture diagrams or screenshots per project
- [ ] Write strong project descriptions (systems-thinking framing, not feature lists)
- [ ] Mobile responsiveness audit
- [ ] Add downloadable resume link
- [ ] Add `og:image` and basic meta tags for social sharing

## Phase 4 — Nice to Have

- [ ] Blog/articles section (Markdown files in `content/`)
- [ ] Analytics (Plausible)
- [ ] Light/dark toggle persisted via `localStorage`

## Project Data to Prepare

Write these up before building the UI — drop into `data/projects.ts`:

1. **Freelancer Copilot** — AI-assisted proposal/scope drafting tool (Next.js 16, Drizzle ORM, Anthropic Claude, PostgreSQL)
2. **Payment / Remittance System** — enterprise backend for async transaction processing, audit logging, API integrations (Spring Boot 3, WebFlux, R2DBC, PostgreSQL)
3. **Cloud Monitoring Dashboard** — platform engineering / observability (FastAPI, PostgreSQL, pgvector, AWS)
