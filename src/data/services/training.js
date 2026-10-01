// Content for the training pages (/training and its course pages; the internship page is separate).
// Extracted from the legacy pages; copy rewritten into plain British English.
// Extra per-service fields used by the hub cards: `tier`, `popular` and `cardSummary` (hub card text).
// Note: the hub page's internship button depends on GET /api/enrollment/status — keep that logic in the page.

export const TRAINING_HUB = {
  group: 'training',
  path: '/training',
  word: 'TRAINING',
  title: 'CyberSage Academy',
  intro:
    'Cybersecurity training built on real-world threats, with a focus on practical skills rather than theory.',
  sections: [
    {
      title: 'Internship programme',
      text:
        'Apply for a hands-on internship with the CyberSage team. Work alongside our security researchers, gain real-world experience and build a portfolio that stands out.',
      link: { to: '/training/internship', label: 'Apply for the internship', closedLabel: 'Enrolment closed', closedNote: 'Applications are currently closed. Please check back soon.' },
      items: [],
    },
    {
      title: 'The Crucible',
      text:
        'Our own simulation environment. The Crucible adapts to your skill level and runs evolving, AI-driven attacks against your defences in real time.',
      items: [
        { t: 'Real-time stress testing', d: 'Latency-based stress testing in real time.' },
        { t: 'Adaptive AI adversary', d: 'An AI opponent that adapts to how you defend.' },
        { t: 'Detailed performance analytics', d: 'Frame-by-frame analysis of your performance.' },
      ],
    },
  ],
};

export const TRAINING_SERVICES = [
  {
    slug: 'beginner',
    group: 'training',
    path: '/training/beginner',
    word: 'BEGINNER',
    name: 'Basic Cybersecurity',
    tier: 'Tier 01',
    popular: false,
    cardSummary:
      'Core defence strategies and good digital hygiene: infrastructure essentials and encryption standards.',
    title: 'Beginner: Basic Cybersecurity',
    summary:
      'The foundation course. Learn the core principles of modern defence, recognise common threats and put solid protection in place from the ground up.',
    facts: [
      { label: 'Price', value: '$199' },
      { label: 'Duration', value: '4 weeks' },
      { label: 'Level', value: 'Beginner (Tier 01)' },
      { label: 'Certificate', value: 'Verified certificate' },
    ],
    features: [
      { t: 'Security fundamentals', d: 'The core concepts every later module builds on.', tags: ['Core component 01'] },
      { t: 'Basic protection', d: 'Setting up essential layers of defence for personal and business environments.', tags: [] },
      { t: 'Common threats', d: 'How phishing, malware and social engineering attacks work.', tags: ['Phishing', 'Malware', 'Social engineering'] },
      { t: 'Verified certificate', d: 'An industry-recognised certificate confirming your foundational security skills.', tags: [] },
    ],
    process: [
      { t: 'Environment setup', d: '' },
      { t: 'Network reconnaissance', d: '' },
      { t: 'Offensive awareness', d: '' },
      { t: 'Hardening', d: '' },
    ],
    extra: [],
    cta: {
      title: 'Start the beginner course',
      text: 'Secure your place in the next cohort.',
    },
  },
  {
    slug: 'intermediate',
    group: 'training',
    path: '/training/intermediate',
    word: 'PRACTICAL',
    name: 'Intermediate Cybersecurity',
    tier: 'Tier 02',
    popular: true,
    cardSummary:
      'Active threat hunting and strengthening network architecture, including Red Team simulations and cloud security mesh deployment.',
    title: 'Intermediate Cybersecurity',
    summary:
      'Move from foundational knowledge to practical skill. Learn to apply security controls in high-pressure environments.',
    facts: [
      { label: 'Price', value: '$399' },
      { label: 'Duration', value: '8 weeks' },
      { label: 'Level', value: 'Intermediate (Tier 02)' },
      { label: 'Certification', value: 'Pro certification' },
      { label: 'Live lab scenarios', value: '120+' },
      { label: 'Lab access', value: '24/7, via VPN' },
    ],
    features: [
      {
        t: 'Advanced concepts and practical implementation',
        d: 'Labs simulate real-world breaches where you deploy countermeasures in real time while the system is under simulated stress.',
        tags: [],
      },
      {
        t: 'Network security',
        d: 'Hardening network perimeters and configuring intrusion prevention systems (IPS) for enterprise-scale networks.',
        tags: ['Module 02', 'Network deployment'],
      },
      {
        t: 'Penetration testing',
        d: 'Learn to think like an attacker and find vulnerabilities first, using industry-standard toolkits and custom scripts.',
        tags: ['Module 04', 'Offensive operations'],
      },
      {
        t: 'Incident response',
        d: 'When a breach happens, seconds matter. Use the OODA loop (observe, orient, decide, act) to contain and remove threats.',
        tags: ['Detection', 'Containment', 'Forensics'],
      },
    ],
    process: [],
    extra: [
      {
        title: 'Dedicated labs',
        text:
          'Every student gets their own virtual infrastructure. These are live, persistent environments, not pre-recorded demos, so your configuration choices have real effects.',
        items: [
          { t: '120+', d: 'Live scenarios' },
          { t: '24/7', d: 'Access' },
          { t: 'VPN', d: 'Secure entry' },
          { t: 'Pro', d: 'Certification' },
        ],
      },
    ],
    cta: {
      title: 'Take the next step in your career',
      text: 'Secure your place in the next cohort.',
    },
  },
  {
    slug: 'advanced',
    group: 'training',
    path: '/training/advanced',
    word: 'ADVANCED',
    name: 'Advanced Cybersecurity',
    tier: 'Tier 03',
    popular: false,
    cardSummary:
      'Preventing zero-day exploitation and AI-based defence systems, plus quantum cryptography and global incident response.',
    title: 'Advanced: Cybersecurity',
    summary:
      'Go beyond perimeter defence. Learn counter-offensive intelligence, complex security architecture and how to deal with advanced persistent threats.',
    facts: [
      { label: 'Price', value: '$699' },
      { label: 'Duration', value: '12 weeks' },
      { label: 'Level', value: 'Advanced (Tier 03)' },
      { label: 'Lab hours', value: '120+' },
      { label: 'Tier level', value: 'Pro' },
      { label: 'Certifications', value: '10' },
      { label: 'Range access', value: '24/7' },
    ],
    features: [
      {
        t: 'Advanced threats',
        d: 'In-depth analysis of zero-day exploits, polymorphic malware and complex APT campaigns.',
        tags: ['Module 01'],
      },
      {
        t: 'Security architecture',
        d: 'Designing resilient networks, hardening cloud-native systems and implementing zero-trust frameworks at scale.',
        tags: ['Module 02'],
      },
      {
        t: 'Expert-led training',
        d: 'Mentoring from working CyberSage security professionals with real-world incident experience.',
        tags: [],
      },
      {
        t: 'Compliance',
        d: 'Turning regulatory frameworks into practical controls: NIST, ISO and others.',
        tags: ['NIST', 'ISO'],
      },
      {
        t: 'Capstone project',
        d: 'A full-scale red team / blue team simulation where you prove your skills in a live environment under pressure.',
        tags: [],
      },
    ],
    process: [],
    extra: [
      {
        title: 'Technical skills covered',
        items: [
          { t: 'Kernel-level defence', d: '' },
          { t: 'Encrypted communication protocols', d: '' },
          { t: 'Offensive countermeasures', d: '' },
          { t: 'Forensic artefact analysis', d: '' },
        ],
      },
    ],
    cta: {
      title: 'Join the advanced course',
      text: 'Threats keep changing, so your defences need to keep up. Places in the next cohort are limited.',
    },
  },
];
