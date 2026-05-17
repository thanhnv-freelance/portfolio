export const profile = {
  name: 'Nguyen Van Thanh',
  title: 'Senior Backend & Cloud Engineer',
  email: 'thanhnv1022@gmail.com',
  phone: '+65 8433 8479',
  linkedin: 'https://linkedin.com/in/thanhnv2210',
  github: 'https://github.com/thanhnv-freelance',
  upwork: 'https://upwork.com/freelancers/thanhnv2210',
  summary:
    '10+ years designing and building large-scale distributed systems for banking, fintech, and enterprise platforms. Specialized in Spring Boot microservices, AWS, high-volume payment & remittance systems, and event-driven architectures.',
  availability: 'Available for freelance & contract',
  resume: '/resume.pdf',
}

export const skills = {
  backend: ['Java', 'Spring Boot', 'Spring WebFlux', 'REST APIs', 'SOAP APIs', 'Microservices', 'Event-driven systems', 'Transaction processing'],
  cloud: ['AWS (EC2, S3, RDS, Lambda, API Gateway)', 'Docker', 'Kubernetes', 'CI/CD', 'Production monitoring & observability'],
  databases: ['PostgreSQL', 'Oracle', 'MySQL', 'DB2'],
  systemDesign: ['Distributed systems', 'Scalable backend design', 'Integration architecture', 'Workflow/BPM systems'],
}

export const experience = [
  {
    title: 'Senior Software Engineer (Data & Platform)',
    company: 'Singtel / NCS',
    location: 'Singapore',
    period: '2022 – Present',
    highlights: [
      'Designed and built high-throughput backend services for cross-border remittance systems',
      'Developed event-driven microservices for real-time transaction processing',
      'Optimized PostgreSQL performance for large-scale financial datasets',
      'Built observability systems for production monitoring and issue detection',
      'Delivered secure, compliant systems with audit logging and encryption',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'MoneyTap',
    location: 'Vietnam',
    period: '2021 – 2022',
    highlights: [
      'Built backend services for credit lifecycle management (loan, repayment, interest)',
      'Integrated banking and payment gateway APIs with strong consistency guarantees',
      'Developed API mocking framework using WireMock for parallel development',
    ],
  },
  {
    title: 'Senior Software Engineer (IoT & Data Systems)',
    company: 'Onelink',
    location: 'Thailand',
    period: '2019 – 2020',
    highlights: [
      'Built real-time telemetry ingestion system for vehicle tracking data',
      'Designed streaming pipelines for GPS and sensor data processing',
    ],
  },
  {
    title: 'Senior Software Engineer (BPM Systems)',
    company: 'Techcom Security',
    location: 'Vietnam',
    period: '2017 – 2019',
    highlights: [
      'Developed workflow-based backend systems for financial operations automation',
      'Built REST APIs supporting business process analytics and reporting',
    ],
  },
  {
    title: 'Senior Software Engineer (BPM & Loan Systems)',
    company: 'MB Bank',
    location: 'Vietnam',
    period: '2014 – 2017',
    highlights: [
      'Designed end-to-end loan processing workflows (approval, appraisal, asset management)',
      'Built high-volume transactional backend systems for banking operations',
    ],
  },
]

export const projects = [
  {
    slug: 'freelancer-copilot',
    title: 'Freelancer Copilot',
    status: 'in-progress' as const,
    problem: 'Manual job hunting on Upwork is slow and unstructured — no way to systematically score fit or track pipeline performance.',
    description: 'AI-powered freelancing assistant that analyzes job opportunities, scores project fit, generates proposal strategies, and tracks applications.',
    tech: ['Next.js', 'PostgreSQL', 'OpenAI API'],
    github: 'https://github.com/thanhnv2210/freelancer-copilot',
    live: null,
    image: null, // add: '/images/projects/freelancer-copilot.png'
  },
  {
    slug: 'remittance-platform',
    title: 'Cross-Border Remittance Platform',
    status: 'production' as const,
    problem: 'High-volume cross-border transactions required real-time processing, compliance reporting, and integration with multiple global payment partners.',
    description: 'High-throughput transaction processing system integrating global payment partners, designed for real-time processing and compliance reporting.',
    tech: ['Java', 'Spring Boot', 'AWS', 'PostgreSQL'],
    github: null,
    live: null,
    image: null, // add: '/images/projects/remittance-platform.png'
  },
  {
    slug: 'banking-bpm',
    title: 'Banking BPM Loan Platform',
    status: 'production' as const,
    problem: 'Manual loan approval workflows created bottlenecks and compliance risks across a high-volume banking operation.',
    description: 'Automated loan lifecycle workflows covering end-to-end approval, appraisal, asset management, and compliance — processing high transaction volumes.',
    tech: ['Java', 'Spring Boot', 'BPM', 'Oracle'],
    github: null,
    live: null,
    image: null, // add: '/images/projects/banking-bpm.png'
  },
]
