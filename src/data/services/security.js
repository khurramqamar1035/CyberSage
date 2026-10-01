// Content for the Security services hub and its six service pages.
// Extracted from the legacy pages (src/pages/SecurityPage.jsx and
// src/pages/services/*.jsx). Copy rewritten into plain British English;
// prices, durations and list items kept as published.

export const SECURITY_HUB = {
  group: 'security',
  path: '/security-services',
  word: 'SECURITY',
  title: 'Security services that find and fix weaknesses before attackers do.',
  intro:
    'Practical security work for modern threats, from AI-assisted audits to hands-on penetration testing. Each service has a fixed price and a clear delivery time.',
  sections: [
    {
      title: 'Services',
      items: [
        {
          t: 'AI Security Audit',
          d: 'A review of your AI models and automated decision systems for bias, data leakage and adversarial weaknesses.',
          to: '/security-services/ai-audit',
          price: '$20',
          meta: '24h response',
        },
        {
          t: 'Vulnerability Assessment',
          d: 'Automated and manual scanning of your perimeter to find exploitable entry points across your whole infrastructure.',
          to: '/security-services/vulnerability-assessment',
          price: '$50',
          meta: '48h response',
        },
        {
          t: 'Penetration Testing',
          d: 'A simulated attack using red team methods to test how well you detect, respond to and contain a real-world breach.',
          to: '/security-services/penetration-testing',
          price: '$150',
          meta: '5 days',
        },
        {
          t: 'Real-time Monitoring',
          d: 'Round-the-clock monitoring of network traffic and system logs, with an alert as soon as unusual activity is detected.',
          to: '/security-services/real-time-monitoring',
          price: '$99/mo',
          meta: 'Per month',
        },
        {
          t: 'Security Consultation',
          d: 'Advisory sessions with a security expert on hardening your architecture, reducing risk and planning your defences.',
          to: '/security-services/security-consultation',
          price: '$75',
          meta: 'Per hour',
        },
        {
          t: 'Compliance Audit',
          d: 'A check of how well you meet SOC 2, GDPR and HIPAA, so you stay within the law and protect your data.',
          to: '/security-services/compliance-audit',
          price: '$200',
          meta: '7 days',
        },
      ],
    },
  ],
  spotlight: {
    label: 'Sage Sentinel',
    title: 'Defence that keeps running',
    text: 'Real-time defence, monitoring and fast response for high-risk environments. Each layer is built to detect, isolate and stop hostile activity before it escalates.',
    links: [
      { label: 'Book a briefing', to: '/contact' },
      { label: 'Explore monitoring', to: '/security-services/real-time-monitoring' },
    ],
  },
  cta: {
    title: 'Need a tailored security plan?',
    text: 'For larger organisations or specialist needs, our core team designs custom defences that adapt as your threats change. Talk to our advisers in confidence.',
    links: [
      { label: 'Book a consultation', to: '/contact' },
      { label: 'Contact our team', to: '/contact' },
    ],
  },
};

export const SECURITY_SERVICES = [
  {
    slug: 'ai-audit',
    group: 'security',
    path: '/security-services/ai-audit',
    word: 'AI-AUDIT',
    name: 'AI Security Audit',
    title: 'An AI-assisted security audit of your systems, delivered in 24 hours.',
    summary:
      'We use AI-driven scanning to find weaknesses across your digital perimeter in a single audit cycle.',
    facts: [
      { label: 'Fee', value: '$20 single node deployment' },
      { label: 'Delivery', value: '24 hours' },
    ],
    features: [
      {
        t: 'Comprehensive assessment',
        d: 'An in-depth analysis of your infrastructure, using neural networks to find unusual entry points and structural weaknesses that older scanners miss.',
        tags: [],
      },
      { t: 'Threat detection', d: 'Real-time pattern matching for emerging zero-day exploits.', tags: [] },
      { t: 'Auto-scan', d: 'Automated vulnerability discovery at machine speed.', tags: [] },
      { t: 'Detailed reports', d: 'Clear documentation for both leadership and engineering teams.', tags: [] },
    ],
    process: [
      { t: 'Infrastructure crawling', d: 'We map every exposed endpoint, subdomain and API gateway.' },
      { t: 'Simulated attacks', d: 'We simulate attacker behaviour with predictive AI models to test where your defences give way.' },
      { t: 'Remediation roadmap', d: 'Fixes ranked by their impact on your systems and how likely each threat is.' },
    ],
    extra: [],
    cta: {
      title: 'Start your AI security audit',
      text: 'The audit begins as soon as we have access. Your systems are covered within 24 hours.',
    },
  },
  {
    slug: 'vulnerability-assessment',
    group: 'security',
    path: '/security-services/vulnerability-assessment',
    word: 'ASSESS',
    name: 'Vulnerability Assessment',
    title: 'We find the weaknesses in your systems before they are exploited.',
    summary:
      'A thorough review of your digital perimeter to identify and close structural weaknesses before attackers can use them.',
    facts: [
      { label: 'Fee', value: '$50 standard entry' },
      { label: 'Delivery', value: '48 hours' },
    ],
    features: [
      {
        t: 'Deep dive analysis',
        d: 'A thorough search for security weaknesses across every layer of your architecture. We map the whole threat landscape, not just individual gaps.',
        tags: [],
      },
      {
        t: 'Manual security testing',
        d: 'Attack simulations led by people, using custom scripts and creative exploitation techniques to catch what automated scanners miss.',
        tags: [],
      },
      { t: 'Code review', d: 'Static and dynamic analysis.', tags: [] },
      { t: 'Network analysis', d: 'Traffic pattern monitoring.', tags: [] },
      { t: 'Reporting standard', d: 'ISO/IEC 27001 compliant.', tags: [] },
    ],
    process: [],
    extra: [
      {
        title: 'Why CyberSage',
        items: [
          { t: 'Zero-trust approach', d: 'We assume a breach from the start, so nothing in your defences goes unchecked.' },
          { t: 'Real-time intelligence', d: 'Our assessments draw on the latest threat data from incident response worldwide.' },
          { t: 'Actionable remediation', d: 'Not just a list of problems: a clear, prioritised plan to fix them.' },
        ],
      },
      {
        title: 'What is included',
        items: [
          { t: '48-hour rapid delivery', d: '' },
          { t: 'Full source code audit', d: '' },
          { t: 'Executive briefing included', d: '' },
        ],
      },
    ],
    cta: {
      title: 'Ready to secure your systems?',
      text: 'Book your vulnerability assessment.',
    },
  },
  {
    slug: 'penetration-testing',
    group: 'security',
    path: '/security-services/penetration-testing',
    word: 'PENTEST',
    name: 'Penetration Testing',
    title: 'We find and safely exploit weaknesses in your systems before attackers do.',
    summary:
      'Ethical hackers identify, analyse and exploit vulnerabilities in your infrastructure, so you can fix them before someone malicious finds them.',
    facts: [
      { label: 'Fee', value: '$150 per engagement' },
      { label: 'Duration', value: '5 business days' },
    ],
    features: [
      {
        t: 'Ethical hacking and vulnerability research',
        d: 'Our testers use the same tactics as advanced persistent threats (APTs) to find hidden entry points, misconfigurations and logic flaws in your applications and network.',
        tags: ['Network layer', 'AppSec'],
      },
      {
        t: 'Full penetration testing',
        d: 'A complete test covering reconnaissance, scanning, vulnerability assessment and exploitation.',
        tags: [],
      },
      {
        t: 'Exploit demonstration',
        d: 'We do not just report issues, we demonstrate them. Safe proofs of concept show exactly how a weakness could be used to compromise critical assets.',
        tags: [],
      },
      {
        t: 'Remediation guidance',
        d: 'After the test you receive a prioritised plan, with the exact code snippets and configuration changes needed to fix every issue found.',
        tags: [],
      },
    ],
    process: [
      { t: 'Scoping', d: 'Agreeing the boundaries and the critical assets to be tested.' },
      { t: 'Active reconnaissance', d: 'Automated and manual probing of your external attack surface.' },
      { t: 'Exploitation', d: 'Attempting to gain unauthorised access through the flaws we find.' },
      { t: 'Debrief', d: 'Delivery of a full remediation report and analysis.' },
    ],
    extra: [],
    cta: {
      title: 'Ready to test your defences?',
      text: 'Talk to the CyberSage team to schedule your penetration test. We can start straight away.',
    },
  },
  {
    slug: 'real-time-monitoring',
    group: 'security',
    path: '/security-services/real-time-monitoring',
    word: 'MONITOR',
    name: 'Real-time Monitoring',
    title: 'Round-the-clock threat detection and alerts for your infrastructure.',
    summary:
      'A 24/7 detection and alerting service that keeps constant watch over your systems.',
    facts: [
      { label: 'Fee', value: '$99/mo' },
      { label: 'Setup', value: 'Under 3 minutes' },
    ],
    features: [
      {
        t: '24/7 monitoring',
        d: 'Continuous automated monitoring of your whole infrastructure, spotting anomalies before they escalate.',
        tags: [],
      },
      {
        t: 'Instant alerts',
        d: 'Real-time notifications through secure channels as soon as a threat is confirmed.',
        tags: ['Slack', 'PagerDuty', 'SMS'],
      },
      {
        t: 'Monthly reports',
        d: 'Detailed reports summarising every threat stopped and trends in your infrastructure health.',
        tags: [],
      },
      {
        t: 'Detection that adapts',
        d: 'The system learns as it watches. Behavioural analysis with neural networks isolates zero-day patterns before they compromise your data.',
        tags: [],
      },
      {
        t: 'Instant setup',
        d: 'Automated deployment through our CLI or cloud provider integrations. Be up and running in under 3 minutes.',
        tags: [],
      },
    ],
    process: [],
    extra: [],
    cta: {
      title: 'Start monitoring today',
      text: 'Get full visibility of your infrastructure for $99/mo.',
    },
  },
  {
    slug: 'security-consultation',
    group: 'security',
    path: '/security-services/security-consultation',
    word: 'CONSULT',
    name: 'Security Consultation',
    title: 'Expert advice to strengthen your security strategy.',
    summary:
      'Detailed, one-to-one consultation that helps you build strong defences and keep your digital assets out of attackers’ reach.',
    facts: [{ label: 'Fee', value: '$75.00 per session' }],
    features: [
      {
        t: 'Expert guidance',
        d: 'Security architecture designed around your organisation. No generic templates, only a strategy built for you.',
        tags: [],
      },
      {
        t: 'One-to-one',
        d: 'Direct access to our security experts, with real-time problem solving over secure channels.',
        tags: [],
      },
      { t: 'Custom strategy', d: 'Detailed technical roadmaps you can act on straight away.', tags: [] },
      { t: 'Implementation', d: 'Support from start to finish while you put changes in place.', tags: [] },
      { t: 'Flexible delivery', d: 'Scheduled around your working hours and time zone.', tags: [] },
    ],
    process: [
      {
        t: 'Threat surface mapping',
        d: 'We identify every way in and every systemic weakness across your current digital footprint. Everything else builds on this.',
      },
      {
        t: 'Strategy drafting',
        d: 'We draft your custom security strategy together, and test each proposed measure against simulated attacks from highly capable adversaries.',
      },
      {
        t: 'Handover',
        d: 'We support implementation and make sure your team can maintain the security level reached during the consultation.',
      },
    ],
    extra: [],
    cta: {
      title: 'Ready to get started?',
      text: 'Book your consultation slot.',
    },
  },
  {
    slug: 'compliance-audit',
    group: 'security',
    path: '/security-services/compliance-audit',
    word: 'COMPLIANCE',
    name: 'Compliance Audit',
    title: 'A full audit that brings your systems in line with regulation.',
    summary:
      'Our audit checks your architecture against regulatory requirements and goes beyond the minimum, so you are compliant both legally and technically.',
    facts: [
      { label: 'Fee', value: '$200' },
      { label: 'Duration', value: '7 days' },
      { label: 'Outcome', value: 'Regulatory compliant' },
    ],
    features: [
      {
        t: 'Regulatory protection',
        d: 'We review your current compliance position and rebuild it on industry-leading encryption and governance standards, protecting you from serious liability.',
        tags: [],
      },
      { t: 'Compliance roadmap', d: 'A step-by-step plan written for your internal engineering teams.', tags: [] },
      {
        t: 'Gap analysis',
        d: 'We identify every weakness in your architecture that could lead to non-compliance penalties.',
        tags: [],
      },
      {
        t: 'Audit documentation',
        d: 'We produce the technical documentation needed for GDPR and HIPAA audits, so you are ready for third-party review.',
        tags: ['GDPR', 'HIPAA'],
      },
    ],
    process: [
      {
        t: 'Internal infrastructure map',
        d: 'A detailed scan of data flows, storage and encryption points across your whole network.',
      },
      {
        t: 'Privileged access review',
        d: 'A thorough audit of user roles and admin controls to confirm you follow the principle of least privilege.',
      },
      {
        t: 'Vulnerability cross-referencing',
        d: 'Aligning your patch management cycles with what regulators expect for timely threat response.',
      },
    ],
    extra: [
      {
        title: 'What is included',
        items: [
          { t: 'Full system regulatory alignment', d: '' },
          { t: 'GDPR / HIPAA governance pack', d: '' },
          { t: 'Technical documentation review', d: '' },
          { t: 'Strategic compliance roadmap', d: '' },
        ],
      },
    ],
    cta: {
      title: 'Ready to start your audit?',
      text: 'Secure your organisation’s future with a CyberSage compliance audit, completed in 7 days.',
    },
  },
];

export const securityServiceBySlug = (slug) => SECURITY_SERVICES.find((s) => s.slug === slug);
