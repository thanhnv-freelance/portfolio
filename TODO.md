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
- [x] shadcn components — not needed for Phase 2; all sections built with plain Tailwind
- [x] Deployed to Vercel: https://portfolio-jade-kappa-64.vercel.app/

## Phase 2 — Core Sections (Week 1-2)

- [x] **Hero section** — name, title, one-liner, links (GitHub, LinkedIn, Upwork, Email)
- [x] **Skills section** — categorized: Backend / Cloud & DevOps / Databases / System Design
- [x] **Featured Projects** — 3 cards with problem, description, tech badges, status, links
- [x] **Experience summary** — 5 roles, timeline layout, highlights per role
- [x] **Contact section** — CTA with email + LinkedIn CTA, copyright footer

## Phase 3 — Polish (Week 2-3)

- [ ] Add architecture diagrams/screenshots — drop PNGs into `public/images/projects/`, set `image` field in `data/profile.ts`
- [x] Strong project descriptions — problem-focused framing already in `data/profile.ts`
- [x] Mobile responsiveness — contact button fixed, unused imports removed, flex-wrap on all link rows
- [x] Downloadable resume — Resume button in hero, drop PDF at `public/resume.pdf`
- [x] `og:image` — dynamic `ImageResponse` at `/opengraph-image`
- [x] Meta tags — full `openGraph` + `twitter` + `robots` in `layout.tsx`

## Phase 4 — Nice to Have

- [x] Blog/articles section — 4 articles in `content/articles/`, static SSG at `/blog` and `/blog/[slug]`
- [ ] Analytics (Plausible or Vercel Analytics — needs site ID)
- [x] Light/dark toggle persisted via `localStorage` — done in Phase 1 (ThemeProvider)

## Profile (from CV — source of truth: `data/profile.ts`)

- **Name**: Nguyen Van Thanh
- **Title**: Senior Backend & Cloud Engineer
- **Experience**: 10+ years
- **Email**: thanhnv1022@gmail.com | **Phone**: +65 8433 8479
- **LinkedIn**: linkedin.com/in/thanhnv2210
- **Current**: Singtel / NCS, Singapore (2022 – Present)

## Project Data (`data/profile.ts`)

1. **Freelancer Copilot** *(in-progress)* — Next.js, PostgreSQL, OpenAI API
2. **Cross-Border Remittance Platform** *(production)* — Java, Spring Boot, AWS, PostgreSQL
3. **Banking BPM Loan Platform** *(production)* — Java, Spring Boot, BPM, Oracle

> GitHub/Upwork URLs are placeholders — update once confirmed.
