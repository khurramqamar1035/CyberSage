// Single source of truth for the CyberSage platform: products, menus, services.
// Product copy follows CyberSage's own positioning. Interface data shown in product
// visuals is illustrative sample data, not live telemetry.

export const PRODUCTS = [
  {
    slug: 'nexus',
    name: 'Nexus',
    role: 'Workspace',
    key: '#2563EB',
    line: 'The secure workspace for modern organisations.',
    summary: 'Messaging, files, documents, calendars and AI assistance in one platform your security team can actually govern.',
    desc: 'Nexus brings communication, collaboration, files, documents, calendars and AI assistance into one secure platform. Teams get one place to work; security gets one place to see, classify and protect what they share.',
    figure: 'A Nexus space with a classified document, a scheduled review and an AI summary of the thread.',
    cta: 'Book a Nexus demo',
    caps: [
      { t: 'Spaces and messaging', d: 'Channels, threads and direct messages organised by team, project or client.' },
      { t: 'Files and documents', d: 'Create, co-edit and share documents with classification labels that follow the file.' },
      { t: 'Calendars', d: 'Meetings and deadlines live next to the work they are about.' },
      { t: 'AI assistance', d: 'Summaries, drafts and answers from Sage Brain, grounded only in your own workspace.' },
    ],
    inputs: ['People and teams', 'Files and documents', 'Calendars'],
    outputs: ['Activity to Sentinel', 'Context to Brain'],
    with: 'Where your teams work. Sentinel watches it, Brain summarises it.',
  },
  {
    slug: 'education',
    name: 'Sage Education',
    role: 'Institutions',
    key: '#0E9AB0',
    line: 'The operating system for modern education.',
    summary: 'One modular, white-label platform for admissions, campus, assessment, finance, placements, library, hostel and transport.',
    desc: 'Sage Education gives institutions a unified digital platform: admissions, campus management, communication, assessment, finance, placements, library, hostel and transport, in one modular ecosystem. It is white-label and multi-tenant, so each institution runs it under its own name.',
    figure: 'How Sage Education is layered: each institution is a tenant with its own modules, on a shared core.',
    cta: 'Book an institution demo',
    caps: [
      { t: 'Modular', d: 'Switch on only the modules an institution needs and add more as it grows.' },
      { t: 'White-label', d: 'Runs under the institution’s own name, domain and colours.' },
      { t: 'Multi-tenant', d: 'One deployment serves many campuses, each with its own isolated data.' },
      { t: 'Admission to placement', d: 'The whole student journey in a single record.' },
    ],
    inputs: ['Students and staff', 'Campus operations', 'Finance'],
    outputs: ['Messaging via Nexus', 'Telemetry to Sentinel'],
    with: 'Runs the institution. Nexus carries its communication.',
  },
  {
    slug: 'vault',
    name: 'Sage Vault',
    role: 'Skills',
    key: '#B76E00',
    line: 'Learn cybersecurity through real-world practice.',
    summary: 'Hands-on labs, simulations, incident scenarios, CTFs, SOC exercises and investigations.',
    desc: 'Sage Vault is where people build practical security skill. Learners work in real lab environments, respond to simulated incidents, play CTFs and run SOC investigations, then get assessed on what they actually did.',
    figure: 'A Vault lab in progress: a log investigation with tasks, a live terminal and a time limit.',
    cta: 'Start in Vault',
    caps: [
      { t: 'Practical labs', d: 'Real machines to break, fix and harden. No slide decks.' },
      { t: 'Simulations and incident scenarios', d: 'Respond to a live-fire incident as a team, against the clock.' },
      { t: 'CTFs', d: 'Challenges for individuals, cohorts and whole organisations.' },
      { t: 'SOC exercises and investigations', d: 'Triage, investigate and write up findings the way an analyst does.' },
    ],
    inputs: ['Learners and cohorts', 'Incidents from Sentinel'],
    outputs: ['Skills evidence', 'Training gaps to Brain'],
    with: 'Turns real incidents into practice for the people who respond.',
  },
  {
    slug: 'sentinel',
    name: 'Sage Sentinel',
    role: 'Security operations',
    key: '#C2412D',
    line: 'An autonomous security operations platform.',
    summary: 'SIEM, XDR and SOAR in one platform: monitoring, detection, investigation, response and automation.',
    desc: 'Sage Sentinel combines SIEM, XDR and SOAR. It collects and correlates security data, detects threats across endpoint, cloud, identity, email and network, and runs response playbooks, so your SOC spends its time on decisions rather than plumbing.',
    figure: 'Sentinel’s detection queue with event volume over the last hour.',
    cta: 'Request a briefing',
    caps: [
      { t: 'SIEM', d: 'Collect, normalise, search and retain security data from across your estate.' },
      { t: 'XDR', d: 'Detection and response across endpoint, cloud, identity, email and network.' },
      { t: 'SOAR', d: 'Playbooks that enrich, contain and close incidents, with approval steps where you want them.' },
      { t: 'Investigation', d: 'Sage Brain assembles the timeline and likely root cause for every incident.' },
    ],
    inputs: ['Endpoints', 'Cloud', 'Identity', 'Email', 'Network'],
    outputs: ['Detections and incidents', 'Signals to Brain', 'Scenarios to Vault'],
    with: 'Detects and responds. Feeds every incident to Brain.',
  },
  {
    slug: 'brain',
    name: 'Sage Brain',
    role: 'Intelligence',
    key: '#0C1324',
    line: 'The private intelligence and decision layer behind CyberSage.',
    summary: 'Analyses security data, understands context, connects signals and supports decisions.',
    desc: 'Sage Brain is CyberSage’s private intelligence layer. It analyses complex security data, understands your organisation’s context, connects signals across every product and proposes decisions, with the evidence behind each one and a person approving what matters.',
    figure: 'A Brain decision: the question, the evidence it used and the action waiting for approval.',
    cta: 'See Sage Brain',
    caps: [
      { t: 'Analyse', d: 'Reads telemetry from Sentinel, activity from Nexus and outcomes from Vault.' },
      { t: 'Understand context', d: 'Knows your assets, people and history, so answers fit your organisation.' },
      { t: 'Connect signals', d: 'Links events across products that look unrelated in any single tool.' },
      { t: 'Decide, with approval', d: 'Proposes actions with cited evidence. High-impact actions wait for a person.' },
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
  { name: 'Contact', to: '/contact', note: 'Sales, support and partnerships' },
];

export const RESOURCE_LINKS = [
  { name: 'Blog', to: '/blog', note: 'Research, guides and company news' },
  { name: 'FAQ', to: '/FAQ', note: 'Answers to common questions' },
  { name: 'Demo report', to: '/demo-report', note: 'A sample security assessment report' },
];

// Routes built in the new light design. Everything else keeps the original dark theme.
export const LIGHT_ROUTES = ['/', '/products', '/about'];
export const isLightRoute = (pathname) =>
  pathname === '/' || LIGHT_ROUTES.some((r) => r !== '/' && pathname.startsWith(r));
