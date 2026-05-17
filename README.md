# Portfolio — Nguyen Van Thanh

Personal portfolio site for **Nguyen Van Thanh**, Senior Backend & Cloud Engineer with 10+ years building large-scale distributed systems for banking, fintech, and enterprise platforms.

**Live:** https://portfolio-jade-kappa-64.vercel.app

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | TailwindCSS v4 |
| UI Components | shadcn/ui (base-nova, neutral) |
| Icons | Lucide React |
| Font | Geist Variable (sans + mono) |
| Email | Resend |
| Analytics | Vercel Analytics |
| Hosting | Vercel |

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing — hero, skills, work experience |
| `/about` | Bio, expertise areas, company timeline |
| `/projects` | Project cards with problem/solution/tech |
| `/blog` | Engineering articles listing |
| `/blog/[slug]` | Individual article |
| `/contact` | Contact form + direct contact info |
| `/workspace` | Local dev port registry (developer reference) |

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3010
```

### Environment Variables

Create `.env.local`:

```env
# Resend — transactional email (contact form)
# Get a free key at https://resend.com
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=Thanh Nguyen <noreply@yourdomain.com>
EMAIL_NOTIFY_TO=thanhnv1022@gmail.com
```

> `EMAIL_FROM` must use a domain verified in your Resend account.
> Until then, use `onboarding@resend.dev` (limited to your own email only).

---

## Commands

```bash
npm run dev        # Start dev server on http://localhost:3010
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint
npm run test       # Vitest
```

### Shell Aliases (via `~/.zshrc`)

```bash
portfolio-start    # Start in background
portfolio-stop     # Stop
portfolio-restart  # Restart
portfolio-logs     # Tail logs
portfolio-status   # Check if running
```

---

## Project Structure

```
portfolio/
├── app/
│   ├── about/          # About page
│   ├── actions/        # Server actions (contact form)
│   ├── blog/           # Blog listing + article pages
│   ├── contact/        # Contact page
│   ├── projects/       # Projects page
│   ├── workspace/      # Dev port registry
│   ├── layout.tsx      # Root layout (Navbar, Footer)
│   └── page.tsx        # Home page
├── components/         # Reusable UI components
├── content/            # Markdown articles
├── data/
│   ├── profile.ts      # Source of truth for all profile data
│   └── workspace.ts    # Local dev app registry
├── lib/
│   ├── articles.ts     # Markdown article loader
│   ├── email.ts        # Resend email functions
│   └── utils.ts        # cn() helper
└── public/             # Static assets
```

---

## Content

All profile data (name, title, skills, experience, projects) lives in **`data/profile.ts`** — update this file to change any content on the site.

Articles are Markdown files in `content/articles/` with frontmatter:

```md
---
title: "Your Article Title"
date: "2025-01-15"
tags: ["PostgreSQL", "Backend"]
summary: "One-line summary shown in the article list."
---

Article body here...
```

---

## Contact Form

The contact form at `/contact` uses [Resend](https://resend.com) to send two emails on submission:

1. **Notification** → owner (`EMAIL_NOTIFY_TO`) with sender details and message, `replyTo` set for direct reply
2. **Acknowledgement** → sender confirming receipt within 24h

Both are fire-and-forget — the form shows success regardless of email delivery timing.
