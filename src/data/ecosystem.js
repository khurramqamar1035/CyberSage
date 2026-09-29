// Single source of truth for the CyberSage ecosystem: products, menus, services.

export const PRODUCTS = [
  {
    slug: 'nexus',
    name: 'Nexus',
    layer: 'Workspace',
    num: '01',
    color: '#B4C5FF',
    line: 'The secure workspace for modern organisations.',
    short: 'Where teams communicate and collaborate',
    with: 'Your teams’ chat, files and calendars in one place.',
    desc: 'Communication, collaboration, files, documents, calendars and AI assistance in one secure platform. Built for organisations that want their teams and information connected in one place.',
    cta: 'Book a Nexus demo',
    cta2: 'See how it works',
    visual: 'nexus',
    visualTitle: 'Nexus · #product',
    capHead: 'Everything your team needs, in one place.',
    ctaHead: 'Bring your team into one workspace.',
    caps: [
      { t: 'Chat and spaces', d: 'Channels, threads and direct messages, organised by team, project or client.' },
      { t: 'Files and documents', d: 'Create, share and co-edit documents without leaving the conversation.' },
      { t: 'Calendars', d: 'Meetings and schedules live next to the work they are about.' },
      { t: 'AI assistance', d: 'Summaries, drafts and answers from Sage Brain, grounded in your own workspace.' },
    ],
  },
  {
    slug: 'education',
    name: 'Sage Education',
    layer: 'Institutions',
    num: '02',
    color: '#44D8F1',
    line: 'The operating system for modern education.',
    short: 'Where institutions run every operation',
    with: 'Run every campus operation on one modular platform.',
    desc: 'Admissions, campus management, communication, assessment, finance, placements, library, hostel and transport in one modular ecosystem. White-label, multi-tenant and adaptable to each institution.',
    cta: 'Book an institution demo',
    cta2: 'View all modules',
    visual: 'education',
    visualTitle: 'Institution overview',
    capHead: 'One platform, shaped to each institution.',
    ctaHead: 'See it running under your own brand.',
    modules: [
      { n: 'Admissions', s: 'Intake open' }, { n: 'Campus', s: 'Timetables live' }, { n: 'Communication', s: 'Staff, students, parents' },
      { n: 'Assessment', s: 'Marks due Friday' }, { n: 'Finance', s: 'Fees and invoices' }, { n: 'Placements', s: 'Drives this term' },
      { n: 'Library', s: 'Catalogue synced' }, { n: 'Hostel', s: 'Rooms allocated' }, { n: 'Transport', s: 'Routes planned' },
    ],
    caps: [
      { t: 'Modular', d: 'Switch on only the modules an institution needs, and add more as it grows.' },
      { t: 'White-label', d: 'Runs under the institution’s own name, domain and brand colours.' },
      { t: 'Multi-tenant', d: 'One deployment serves many campuses or institutions, each with its own data.' },
      { t: 'Admission to placement', d: 'The whole student journey lives in a single record.' },
    ],
  },
  {
    slug: 'vault',
    name: 'Sage Vault',
    layer: 'Skills',
    num: '03',
    color: '#FFB95F',
    line: 'Learn cybersecurity through real-world practice.',
    short: 'Where people build real cyber capability',
    with: 'Train people on labs built from real incidents.',
    desc: 'Practical labs, simulations, incident scenarios, CTFs, SOC exercises and investigations, designed to develop real-world cybersecurity capabilities.',
    cta: 'Start practising',
    cta2: 'Browse training',
    cta2To: '/training',
    visual: 'vault',
    visualTitle: 'Vault · this week',
    capHead: 'Skills you only get by doing.',
    ctaHead: 'Give your people real practice.',
    exercises: [
      { n: 'Ransomware outbreak', t: 'Incident simulation · team of 5', p: 72 },
      { n: 'Phishing investigation', t: 'SOC exercise', p: 45 },
      { n: 'Web exploitation CTF', t: 'Capture the flag', p: 88 },
      { n: 'Linux hardening', t: 'Practical lab', p: 100 },
    ],
    caps: [
      { t: 'Practical labs', d: 'Realistic environments to break, fix and harden. No slides.' },
      { t: 'Simulations and incident scenarios', d: 'Respond to live-fire scenarios as a team, against the clock.' },
      { t: 'CTFs', d: 'Challenges for individuals, cohorts and whole organisations.' },
      { t: 'SOC exercises and investigations', d: 'Triage, investigate and report the way a working analyst does.' },
    ],
  },
  {
    slug: 'sentinel',
    name: 'Sage Sentinel',
    layer: 'Security ops',
    num: '04',
    color: '#FFB4AB',
    line: 'An autonomous security operations platform.',
    short: 'Where threats are detected and stopped',
    with: 'Detect and stop threats across your estate.',
    desc: 'An AI-powered SIEM, XDR and SOAR platform. Security monitoring, threat detection, investigation, response and automation work together to help you run a more autonomous SOC.',
    cta: 'Request a briefing',
    cta2: 'Security services',
    cta2To: '/security-services',
    visual: 'sentinel',
    visualTitle: 'Sentinel · incident',
    capHead: 'SIEM, XDR and SOAR without the stitching.',
    ctaHead: 'Move your SOC towards autonomous.',
    timeline: [
      { t: '02:48', m: 'Sign-in from London' },
      { t: '03:05', m: 'Sign-in from a new country, 17 min later' },
      { t: '03:07', m: 'Inbox rule forwards invoices externally' },
      { t: '03:07', m: 'Playbook revoked session, removed rule', hot: true },
    ],
    caps: [
      { t: 'SIEM', d: 'Collect, normalise and correlate security data from across your estate.' },
      { t: 'XDR', d: 'Detection and response across endpoint, cloud, identity, email and network.' },
      { t: 'SOAR', d: 'Playbooks that enrich, contain and close incidents, with approval gates where you want them.' },
      { t: 'AI investigation', d: 'Sage Brain builds the timeline and root cause for every incident.' },
    ],
  },
  {
    slug: 'brain',
    name: 'Sage Brain',
    layer: 'Intelligence',
    num: '05',
    color: '#2563EB',
    line: 'The intelligence layer for cybersecurity.',
    short: 'Understands and connects every layer above',
    with: 'Connect signals and support decisions.',
    desc: 'The intelligence layer behind the CyberSage ecosystem. Brain analyses complex security data, understands context, connects signals and supports high-level security decision-making.',
    cta: 'See Sage Brain',
    cta2: 'How it connects',
    cta2To: '/#ecosystem',
    visual: 'brain',
    visualTitle: 'Brain · signal feed',
    capHead: 'Context that no single tool has.',
    ctaHead: 'Ask your security posture a question.',
    caps: [
      { t: 'Analyse complex data', d: 'Reads telemetry from Sentinel, activity from Nexus and progress from Vault.' },
      { t: 'Understand context', d: 'Knows your assets, people and history, so answers fit your organisation.' },
      { t: 'Connect signals', d: 'Links events across platforms that would otherwise look unrelated.' },
      { t: 'Support decisions', d: 'Clear, cited recommendations for analysts and leadership.' },
    ],
  },
];

export const productBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug);

export const BRAIN_FEED = [
  { t: '02:41', src: 'Nexus', msg: 'Email with a lookalike invoice link opened by 6 staff' },
  { t: '02:48', src: 'Sentinel', msg: 'Sign-in from London for finance-user-04' },
  { t: '03:05', src: 'Sentinel', msg: 'Same account signs in from a new country' },
  { t: '03:07', src: 'Sentinel', msg: 'Playbook revoked the session' },
  { t: '03:09', src: 'Brain', msg: 'Linked the sign-ins to the 02:41 email' },
  { t: '07:30', src: 'Vault', msg: 'Phishing scenario drafted for the finance team' },
  { t: '08:15', src: 'Education', msg: 'Admissions portal traffic normal' },
  { t: '08:40', src: 'Nexus', msg: 'Overnight summary posted to #leadership' },
];

export const FEED_TAG = {
  Nexus: ['#23293C', '#B4C5FF'],
  Sentinel: ['#3A1F1E', '#FFB4AB'],
  Vault: ['#3A2C15', '#FFB95F'],
  Brain: ['#2563EB', '#FFFFFF'],
  Education: ['#10323A', '#44D8F1'],
};

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
  { name: 'About us', to: '/about', note: 'Our story, offices and approach' },
  { name: 'Core team', to: '/core-team', note: 'The people behind CyberSage' },
  { name: 'Internships', to: '/training/internship', note: 'Join the next cohort' },
  { name: 'Contact', to: '/contact', note: 'Talk to sales or support' },
];

export const RESOURCE_LINKS = [
  { name: 'Blog', to: '/blog', note: 'Research, guides and news' },
  { name: 'FAQ', to: '/FAQ', note: 'Answers to common questions' },
  { name: 'Demo report', to: '/demo-report', note: 'See a sample security report' },
];
