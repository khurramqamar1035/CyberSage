// Single source of truth for the CyberSage platform: products, menus, services.
// Product copy follows CyberSage's own positioning and each product's published
// taglines. Product art uses each product's design language and contains no customer data.

export const PRODUCTS = [
  {
    slug: 'nexus',
    name: 'Nexus',
    role: 'Workspace',
    key: '#1466D6',
    url: 'https://nexus.cybersage.uk',
    tagline: 'Mail, chat, docs, meetings and AI. One secure workspace.',
    line: 'The secure workspace for modern organisations.',
    summary: 'Mail on your own domain, channels and calls, documents, meetings and AI that answers from your own workspace.',
    desc: 'Nexus brings communication, collaboration, files, documents, calendars and AI assistance into one secure platform, built by people who do security for a living.',
    figure: 'Product art in Nexus’s own design language.',
    cta: 'Book a Nexus demo',
    caps: [
      { t: 'Mail on your domain', d: 'Business email on your own domain, with sender verification you can see.' },
      { t: 'Sage Connect', d: 'Channels, calls and @Sage in the same place as your mail.' },
      { t: 'Docs, Sheets and Slides', d: 'Create and co-edit documents without leaving the workspace.' },
      { t: 'Meetings', d: 'Agenda in, notes out.' },
      { t: 'Ask Sage', d: 'AI that answers from your own workspace and shows its sources.' },
      { t: 'Roles and access', d: 'Permissions set from day one, with single sign-on for your identity provider.' },
    ],
    inputs: ['People and teams', 'Files and documents', 'Calendars'],
    outputs: ['Activity to Sentinel', 'Context to Brain'],
    with: 'Where your teams work. Sentinel watches it, Brain summarises it.',
  },
  {
    slug: 'education',
    name: 'Sage Education',
    role: 'Institutions',
    key: '#0F9D8C',
    tagline: 'Admissions to alumni. Classroom to campus.',
    line: 'The operating system for modern education.',
    summary: 'One modular, white-label platform that runs every operation of an institution, from admissions to alumni.',
    desc: 'Sage Education gives institutions a unified digital platform: admissions, campus management, communication, assessment, finance, placements, library, hostel and transport. It is white-label and multi-tenant, so each institution runs it under its own name and colours.',
    figure: 'Product art in Sage Education’s own design language.',
    cta: 'Book an institution demo',
    caps: [
      { t: 'Eight modules', d: 'Admissions, Campus ERP, Communication, Assessment, Finance, Placement, Library, Hostel and Transport.' },
      { t: 'Four surfaces', d: 'An admin dashboard, a faculty portal, a student app and a parent app.' },
      { t: 'White-label', d: 'Each institution runs on its own branded platform, in its own colours.' },
      { t: 'Multi-tenant', d: 'Every institution’s data is kept separate, enforced at the database.' },
    ],
    inputs: ['Students and staff', 'Campus operations', 'Finance'],
    outputs: ['Messaging via Nexus', 'Telemetry to Sentinel'],
    with: 'Runs the institution. Nexus carries its communication.',
  },
  {
    slug: 'vault',
    name: 'Sage Vault',
    role: 'Skills',
    key: '#10B981',
    url: 'https://www.cybersagevault.uk',
    tagline: 'Live incident simulations. Not walkthroughs.',
    line: 'Learn cybersecurity through real-world practice.',
    summary: 'Hands-on labs, live incident simulations, classrooms for instructors and hiring on verified performance.',
    desc: 'Sage Vault is a browser-based cyber range. Learners work through gated labs, run the SOC in live incident simulations and get graded on what they actually did, so their score works as evidence of skill.',
    figure: 'Product art in Sage Vault’s own design language.',
    cta: 'Talk to us about Vault',
    caps: [
      { t: 'Labs that teach through doing', d: 'CTF, Blue Team and Red Team labs. Each task unlocks only when you prove the last one.' },
      { t: 'Live incident simulations', d: 'Every session generates a unique company and attack. You run the SOC and get an A–F grade with a debrief.' },
      { t: 'Classrooms for instructors', d: 'Assign labs and simulations to a cohort, watch work live and download reports.' },
      { t: 'Hire on verified performance', d: 'Recruiters see scores verified by the platform, not self-reported skills.' },
    ],
    inputs: ['Learners and cohorts', 'Incidents from Sentinel'],
    outputs: ['Skills evidence', 'Training gaps to Brain'],
    with: 'Turns real incidents into practice for the people who respond.',
  },
  {
    slug: 'sentinel',
    name: 'Sage Sentinel',
    role: 'Security operations',
    key: '#C8102E',
    tagline: 'No integration needed. Every feature built natively.',
    line: 'An autonomous security operations platform.',
    summary: 'SIEM, XDR and SOAR in one platform: monitoring, detection, investigation, response and automation.',
    desc: 'Sage Sentinel combines SIEM, XDR and SOAR, built natively rather than bolted together. It collects and correlates security data, detects threats mapped to MITRE ATT&CK and runs response playbooks, with a person confirming the actions that matter.',
    figure: 'Product art in Sage Sentinel’s own design language.',
    cta: 'Request a briefing',
    caps: [
      { t: 'Collect anything', d: 'A lightweight forwarder ships logs and metrics from Linux and Windows servers in one command.' },
      { t: 'Detect', d: 'Rule-based detection mapped to MITRE ATT&CK, including rules that count across the event stream.' },
      { t: 'Respond', d: 'Playbooks that isolate, contain or restrict automatically, and ask an analyst before touching critical systems.' },
      { t: 'Report and govern', d: 'Dashboards, scheduled compliance reports, role-based access and per-tenant data retention.' },
    ],
    inputs: ['Endpoints', 'Cloud', 'Identity', 'Email', 'Network'],
    outputs: ['Detections and incidents', 'Signals to Brain', 'Scenarios to Vault'],
    with: 'Detects and responds. Feeds every incident to Brain.',
  },
  {
    slug: 'brain',
    name: 'Sage Brain',
    role: 'Intelligence',
    key: '#2563EB',
    line: 'The private intelligence and decision layer behind CyberSage.',
    summary: 'Analyses security data, understands context, connects signals and supports decisions.',
    desc: 'Sage Brain is CyberSage’s private intelligence layer. It analyses complex security data, understands your organisation’s context, connects signals across every product and supports decisions, with a person approving what matters.',
    figure: 'Product art in CyberSage’s own design language.',
    cta: 'Talk to us about Brain',
    caps: [
      { t: 'Analyse', d: 'Reads what Sentinel sees across your estate.' },
      { t: 'Understand context', d: 'Weighs events against your organisation, your assets and your history.' },
      { t: 'Connect signals', d: 'Links events that look unrelated in any single tool.' },
      { t: 'Support decisions', d: 'Recommends what to do next. High-impact actions wait for a person.' },
    ],
    inputs: ['Signals from Sentinel', 'Activity from Nexus', 'Outcomes from Vault'],
    outputs: ['Decisions and recommendations', 'Summaries for people'],
    with: 'Connects the signals and proposes what to do next.',
  },
];

export const productBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug);

// Existing service pages (kept from the live site)
export const SERVICE_GROUPS = [
  {
    title: 'Security services',
    to: '/security-services',
    items: [
      { name: 'AI security audit', to: '/security-services/ai-audit' },
      { name: 'Vulnerability assessment', to: '/security-services/vulnerability-assessment' },
      { name: 'Penetration testing', to: '/security-services/penetration-testing' },
      { name: 'Real-time monitoring', to: '/security-services/real-time-monitoring' },
      { name: 'Security consultation', to: '/security-services/security-consultation' },
      { name: 'Compliance audit', to: '/security-services/compliance-audit' },
    ],
  },
  {
    title: 'Development',
    to: '/development-services',
    items: [
      { name: 'Web development', to: '/development-services/web' },
      { name: 'Android', to: '/development-services/android' },
      { name: 'iOS', to: '/development-services/ios' },
      { name: 'Cross-platform', to: '/development-services/cross-platform' },
    ],
  },
  {
    title: 'Training',
    to: '/training',
    items: [
      { name: 'Beginner', to: '/training/beginner' },
      { name: 'Intermediate', to: '/training/intermediate' },
      { name: 'Advanced', to: '/training/advanced' },
      { name: 'Internships', to: '/training/internship' },
    ],
  },
];

export const COMPANY_LINKS = [
  { name: 'About us', to: '/about', note: 'Who we are and how we work' },
  { name: 'Core team', to: '/core-team', note: 'The people behind CyberSage' },
  { name: 'Internships', to: '/training/internship', note: 'Join the next cohort' },
  { name: 'Gallery', to: '/gallery', note: 'Our team, interns and events' },
  { name: 'Contact', to: '/contact', note: 'Sales, support and partnerships' },
];

export const RESOURCE_LINKS = [
  { name: 'Blog', to: '/blog', note: 'Research, guides and company news' },
  { name: 'FAQ', to: '/FAQ', note: 'Answers to common questions' },
  { name: 'Demo report', to: '/demo-report', note: 'A sample security assessment report' },
  { name: 'Verify a certificate', to: '/verify', note: 'Check a CyberSage certificate ID' },
];

// Routes built in the new light design. Everything else keeps the original dark theme.
export const LIGHT_ROUTES = ['/', '/products', '/about'];
export const isLightRoute = (pathname) =>
  pathname === '/' || LIGHT_ROUTES.some((r) => r !== '/' && pathname.startsWith(r));
