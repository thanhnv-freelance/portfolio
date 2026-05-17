export type AppStatus = 'active' | 'in-progress' | 'archived'

export interface WorkspaceApp {
  name: string
  path: string
  port: number | null
  url: string | null
  stack: string[]
  description: string
  status: AppStatus
  command: string
}

export const workspaceApps: WorkspaceApp[] = [
  {
    name: 'portfolio',
    path: 'AI_WS/portfolio',
    port: 3010,
    url: 'http://localhost:3010',
    stack: ['Next.js 16', 'TailwindCSS v4'],
    description: 'Personal engineering portfolio site.',
    status: 'active',
    command: 'npm run dev',
  },
  {
    name: 'job-evolution/ui',
    path: 'AI_WS/job-evolution/ui',
    port: 3001,
    url: 'http://localhost:3001',
    stack: ['Vite', 'React 19', 'TailwindCSS v4', 'shadcn'],
    description: 'Job evolution tracking UI.',
    status: 'active',
    command: 'npm run dev',
  },
  {
    name: 'company-simulator/frontend',
    path: 'AI_WS/company-simulator/frontend',
    port: 3002,
    url: 'http://localhost:3002',
    stack: ['Vite', 'React 19'],
    description: 'Company simulator frontend.',
    status: 'in-progress',
    command: 'npm run dev',
  },
  {
    name: 'english-learning-app',
    path: 'AI_WS/english-learning-app/apps/web',
    port: 3003,
    url: 'http://localhost:3003',
    stack: ['Next.js 15', 'TailwindCSS v4'],
    description: 'IELTS / English learning app.',
    status: 'active',
    command: 'pnpm dev',
  },
  {
    name: 'architecture-practice',
    path: 'AI_WS/architecture-practice',
    port: 3004,
    url: 'http://localhost:3004',
    stack: ['Vite', 'React 18'],
    description: 'Architecture documentation viewer — markdown & PlantUML diagrams.',
    status: 'active',
    command: 'npm run dev',
  },
  {
    name: 'ai-architect-os/frontend',
    path: 'AI_WS/ai-architect-os/frontend',
    port: 8051,
    url: 'http://localhost:8051',
    stack: ['Next.js 16', 'TailwindCSS v4'],
    description: 'AI architect OS frontend.',
    status: 'in-progress',
    command: 'npm run dev',
  },
  {
    name: 'freelancer-copilot',
    path: 'AI_WS/freelancer-copilot',
    port: null,
    url: 'http://localhost:3000',
    stack: ['Next.js 16', 'TailwindCSS v4', 'Drizzle ORM'],
    description: 'AI-powered freelancing assistant — job scoring, proposals, pipeline tracking.',
    status: 'in-progress',
    command: 'npm run dev',
  },
]
