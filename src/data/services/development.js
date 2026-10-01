// Content for the development service pages (/development-services and children).
// Extracted from the legacy pages; copy rewritten into plain British English.
// Extra per-service fields used by the hub cards: `stack` (hub badge) and `cardSummary` (hub card text).

export const DEVELOPMENT_HUB = {
  group: 'development',
  path: '/development-services',
  word: 'DEVELOPMENT',
  title: 'Secure software development',
  intro:
    'We build fast, secure applications for web, Android and iOS, from low-level optimisation through to polished Material Design interfaces.',
  sections: [
    {
      title: 'How every project starts',
      text:
        'We design security in from the start rather than adding it later. Every project begins with a zero-trust security audit of the proposed tech stack.',
      items: [
        { t: 'Phase 01: Design analysis', d: 'We review the proposed design and tech stack before any build work begins.' },
        { t: 'Phase 02: Low-level hardening', d: 'We harden the system down to kernel level.' },
        { t: 'Phase 03: UI/UX audit', d: 'We check the interface runs smoothly and is easy to use.' },
      ],
    },
  ],
};

export const DEVELOPMENT_SERVICES = [
  {
    slug: 'android',
    group: 'development',
    path: '/development-services/android',
    word: 'ANDROID',
    name: 'Android Development',
    stack: 'Kotlin',
    cardSummary:
      'Native Android apps built with Kotlin and Material Design 3, with fast performance and solid hardware integration.',
    title: 'Native Android apps, built in Kotlin.',
    summary:
      'We build fast, secure Android applications using Kotlin and modern architecture patterns.',
    facts: [
      { label: 'Pricing', value: 'Custom quote' },
      { label: 'Language', value: 'Kotlin' },
    ],
    features: [
      {
        t: 'Kotlin and modern architecture',
        d: 'We use MVVM architecture and Jetpack Compose to build interfaces that are smooth and respond to what the user is trying to do.',
        tags: ['Coroutines', 'Dagger Hilt', 'Room DB'],
      },
      {
        t: 'Material Design 3',
        d: 'Dynamic colour and adaptive layouts that feel native across the Android ecosystem.',
        tags: [],
      },
      {
        t: 'Play Store deployment',
        d: 'We manage the full release cycle, from internal testing to worldwide production release.',
        tags: [],
      },
      {
        t: 'Ongoing support',
        d: '24/7 technical monitoring and regular updates to keep your app compatible and protected against newly discovered vulnerabilities.',
        tags: [],
      },
    ],
    process: [
      { t: 'Discovery', d: 'We define what the app needs to do and the technical constraints of the mobile interface.' },
      { t: 'Blueprint', d: 'We wireframe the user journey, following Material Design ergonomics.' },
      { t: 'Build', d: 'Native Kotlin development with continuous integration and automated testing.' },
      { t: 'Launch', d: 'Final optimisation, store deployment and scaling.' },
    ],
    extra: [],
    cta: {
      title: 'Ready to build your Android app?',
      text: 'Talk to our core team about your project requirements and get a technical evaluation.',
    },
  },
  {
    slug: 'ios',
    group: 'development',
    path: '/development-services/ios',
    word: 'IOS',
    name: 'iOS Development',
    stack: 'Swift',
    cardSummary:
      'Swift and SwiftUI apps built for smooth performance and strong security, using Core Data, CryptoKit and Combine.',
    title: 'Native iOS apps, built in Swift.',
    summary:
      'We build native Swift applications for the Apple ecosystem that are fast, secure and smooth to use.',
    facts: [
      { label: 'Pricing', value: 'Custom quote' },
      { label: 'Minimum iOS', value: 'iOS 17.0+' },
      { label: 'Compliance', value: 'GDPR & Apple Privacy compliant' },
    ],
    features: [
      {
        t: 'Swift and SwiftUI first',
        d: "We use Apple's modern language and declarative UI framework to build apps that are lighter, faster and easier to maintain, from reactive state to smooth animations.",
        tags: ['Swift', 'SwiftUI'],
      },
      {
        t: 'Native security',
        d: "Integration with Keychain, biometrics (Face ID / Touch ID) and Apple's Secure Enclave to protect user data.",
        tags: ['Keychain', 'Face ID', 'Touch ID', 'Secure Enclave'],
      },
      {
        t: 'App Store submission',
        d: "Full deployment support, making sure your app follows Apple's Human Interface Guidelines so it is ready for approval.",
        tags: [],
      },
      {
        t: 'Across Apple devices',
        d: 'Shared logic across iPhone, iPad, Apple Watch and Apple Vision Pro using modern native patterns.',
        tags: ['iPhone', 'iPad', 'Apple Watch', 'Apple Vision Pro'],
      },
      {
        t: 'Custom quote',
        d: 'Every project is different. We provide a detailed feasibility report and pricing based on your requirements.',
        tags: [],
      },
    ],
    process: [
      {
        t: 'Discovery',
        d: 'We start with your business logic and user personas, mapping every interaction and data flow before any Swift is written.',
      },
      {
        t: 'Interface prototyping',
        d: "We design interfaces using Apple's Human Interface Guidelines (HIG) so they feel at home on Apple hardware.",
      },
      {
        t: 'Agile sprints',
        d: 'Weekly builds let you follow progress on TestFlight as the product develops.',
      },
    ],
    extra: [
      {
        title: 'Technical specification',
        items: [
          { t: 'Deployment target', d: 'iOS 17.0+' },
          { t: 'Language', d: 'Swift 5.10' },
          { t: 'UI framework', d: 'SwiftUI / Combine' },
          { t: 'Architecture', d: 'MVVM-C / TCA' },
          { t: 'Encryption standard', d: 'AES-256 GCM' },
          { t: 'Compliance', d: 'GDPR & Apple Privacy compliant' },
        ],
      },
    ],
    cta: {
      title: 'Ready to start your iOS app?',
      text: "Work with CyberSage's iOS engineers to build a secure native app.",
    },
  },
  {
    slug: 'web',
    group: 'development',
    path: '/development-services/web',
    word: 'WEB',
    name: 'Web Development',
    stack: 'Full-stack',
    cardSummary:
      'Responsive, scalable web systems built for heavy traffic and high uptime, with security built in from front end to infrastructure.',
    title: 'Secure web platforms, built to scale.',
    summary:
      'We build resilient web platforms using modern reactive frameworks and cloud-native infrastructure.',
    facts: [
      { label: 'Pricing', value: 'Custom quote' },
    ],
    features: [
      {
        t: 'Modern frameworks',
        d: 'We use React, Next.js and other reactive stacks for fast, high-performance user experiences.',
        tags: ['React', 'Next.js'],
      },
      {
        t: 'Cloud native',
        d: 'AWS, Azure and Google Cloud infrastructure with automatic scaling.',
        tags: ['AWS', 'Azure', 'Google Cloud'],
      },
      {
        t: 'SEO',
        d: 'Structured metadata and Core Web Vitals optimisation to improve search rankings.',
        tags: ['Core Web Vitals'],
      },
      {
        t: 'Responsive design',
        d: 'Interfaces that adapt to every screen, from mobile phones to ultra-wide displays.',
        tags: [],
      },
      {
        t: 'Scalability',
        d: 'Infrastructure designed to grow from MVP to millions of concurrent users without rewriting code.',
        tags: [],
      },
    ],
    process: [],
    extra: [],
    cta: {
      title: 'Ready to build your web platform?',
      text: 'Contact us for a custom assessment. Our engineers will plan your web presence with you.',
    },
  },
  {
    slug: 'cross-platform',
    group: 'development',
    path: '/development-services/cross-platform',
    word: 'CROSS',
    name: 'Cross-Platform Development',
    stack: 'Flutter',
    cardSummary:
      'One codebase for iOS and Android using React Native and Flutter, without lowering security standards.',
    title: 'One codebase for iOS and Android.',
    summary:
      'Build once and deploy to every platform with React Native and Flutter.',
    facts: [
      { label: 'Pricing', value: 'Custom quote (tiered)' },
    ],
    features: [
      {
        t: 'Shared codebase',
        d: 'Reduce technical debt with a single development pipeline. Write the logic once and run it natively on every mobile platform.',
        tags: [],
      },
      {
        t: 'Native performance',
        d: 'JIT/AOT-compiled for speed.',
        tags: ['JIT', 'AOT'],
      },
      {
        t: 'Cost-effective',
        d: 'One codebase for iOS and Android means less to build and maintain.',
        tags: [],
      },
      {
        t: 'Android',
        d: 'Full Android API integration.',
        tags: [],
      },
      {
        t: 'iOS',
        d: "Faithful to Apple's (Cupertino) design conventions.",
        tags: [],
      },
    ],
    process: [],
    extra: [
      {
        title: 'Tech stack',
        text: 'We use widely adopted frameworks for long-term support and scalability.',
        items: [
          { t: 'Flutter', d: '' },
          { t: 'React Native', d: '' },
          { t: 'TypeScript', d: '' },
          { t: 'Firebase', d: '' },
        ],
      },
    ],
    cta: {
      title: 'Ready to start your app?',
      text: 'Work with CyberSage to build a mobile app that performs well on every device.',
    },
  },
];
