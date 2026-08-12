import { CaseStudy } from '@/components/CaseStudyCard'

export const allWork: CaseStudy[] = [
  {
    slug: 'decisions-ai-mobile-meeting-app',
    title: 'Decisions AI',
    client: 'Decisions (active client project, NDA-covered)',
    role: 'Lead Product Designer',
    outcome:
      "Lead Product Designer for Decisions AI, the mobile companion to an AI-powered Microsoft Teams meeting platform used by 5,000+ organizations including Vestas, BDO, NHS, and Manpower. Active NDA-covered project — no internal research, usage data, or design rationale shared here, only what's publicly verifiable plus a direct account of the role.",
    type: 'Enterprise',
    year: '2019–Present',
    coverImage: '/images/work/decisions-platform/hero.webp',
    metaLabel: 'Active Client Project • Mobile App',
    productName: 'Decisions AI',
    caseStudyTitle: 'The Meeting Platform I Lead Mobile Design For',
    summary:
      "An overview of the product and my role, kept to what's publicly available — not a research-to-outcome case study, since this is an active, NDA-covered commercial project.",
    keyFocus: ['Mobile UX/UI', 'Microsoft Teams Integration', 'Product Management'],
    relatedBlogSlugs: [
      'ai-in-the-product-design-process',
      'scaling-product-design-with-ai',
      'ai-native-workflow-transition',
    ],
  },
  {
    slug: 'pagevamp-onboarding-redesign',
    title: 'Pagevamp',
    client: 'Pagevamp',
    role: 'Lead UX Designer',
    outcome:
      'Free trial signups up 30%. Privacy concerns dropped from 15% to under 5%. 99% of users completed basic info. Built a path for the 20% of trial users the product previously had no answer for.',
    type: 'SaaS',
    year: '2018',
    coverImage: '/images/work/pagevamp/hero.webp',
    metaLabel: 'Client Project • SaaS',
    productName: 'Pagevamp',
    caseStudyTitle: 'Fixing the First Five Minutes',
    summary:
      'Helping first-time users launch their websites faster by simplifying onboarding and reducing early friction.',
    keyFocus: ['User Onboarding', 'Information Architecture', 'Conversion Optimization'],
    relatedBlogSlugs: ['ux-fixes-boost-conversions'],
    stats: [
      { value: '+30%', label: 'Signup Lift' },
      { value: '15%→5%', label: 'Privacy Drop-off' },
      { value: '99%', label: 'Info Completion' },
    ],
  },
  {
    slug: 'streamshare-streaming-app-design',
    title: 'Streamshare',
    client: 'Personal Project',
    role: 'Product Designer',
    outcome:
      'Designed a video streaming mobile app concept that combined interest-based recommendations, location discovery, and stream scheduling, a gap no major competitor had filled.',
    type: 'SaaS',
    year: '2021',
    coverImage: '/images/work/streamshare/hero.webp',
    metaLabel: 'Personal Project • Concept',
    productName: 'Streamshare',
    caseStudyTitle: 'Rethinking Live Content Discovery',
    summary:
      'A personal exploration into making live content discovery faster through interest-based recommendations.',
    keyFocus: ['Mobile UX', 'Discovery Experience', 'Recommendation System'],
    stats: [
      { value: '5', label: 'Interviews' },
      { value: '5', label: 'Apps Compared' },
      { value: '4', label: 'Key Decisions' },
    ],
  },
  {
    slug: 'linkedin-feed-redesign',
    title: 'LinkedIn Homepage Feed Redesign',
    client: 'Personal Project',
    role: 'Product Designer',
    outcome:
      "A self-initiated audit and redesign of LinkedIn's homepage feed, cataloguing fourteen hierarchy and accessibility findings and rebuilding the page around one consistent rule for what earns visual weight. Validated directionally with 5 peers in a before/after usability test — not production analytics, but real timed tasks and real feedback, not just my own judgment.",
    type: 'SaaS',
    year: '2026',
    coverImage: '/images/work/linkedin/hero.webp',
    metaLabel: 'Self-Initiated Project • Audit & Redesign',
    productName: 'LinkedIn Homepage Feed Redesign',
    caseStudyTitle: 'Giving Every Pixel a Job',
    summary:
      "A self-initiated audit and redesign of LinkedIn's homepage feed, built to prove that hierarchy and accessibility are decisions, not decoration.",
    keyFocus: ['Accessibility (WCAG)', 'Visual Hierarchy', 'Usability Testing'],
    stats: [
      { value: '14', label: 'Findings' },
      { value: '4', label: 'Decisions' },
      { value: '5', label: 'Peers Tested' },
    ],
  },
  {
    slug: 'avira-antivirus-redesign',
    title: 'Avira Antivirus',
    client: 'Avira (Self-directed)',
    role: 'Lead Product Designer',
    outcome:
      "Full IA, design system, and high-fidelity UI for Avira's core flows: dashboard, scanning, quarantine, and free-to-paid upgrade path. Self-directed; no business metrics to report, and I won't imply otherwise.",
    type: 'Enterprise',
    year: '2020',
    coverImage: '/images/work/avira/hero.webp',
    metaLabel: 'Self-Initiated Project • Redesign',
    productName: 'Avira Antivirus',
    caseStudyTitle: 'Redesigning for Trust, Not Just for Looks',
    summary:
      "A self-initiated redesign of Avira Antivirus Free, diagnosing how visual inconsistency erodes trust in a security product and designing around that specific failure mode.",
    keyFocus: ['User Research', 'Design Systems', 'Information Architecture'],
  },
  {
    slug: 'stratus-maas-saas-dashboard-redesign',
    title: 'Stratus MaaS',
    client: 'MageMojo',
    role: 'Product Designer',
    outcome:
      "~40% fewer configuration-confusion tickets, ~30% faster resolutions, and full adoption from the developers and support staff who lived in this interface every day, on the same screen MageMojo's own merchants occasionally used too.",
    type: 'SaaS',
    year: '2016–2019',
    coverImage: '/images/work/webscale-stratus/hero.webp',
    metaLabel: 'Client Project • SaaS Dashboard',
    productName: 'Stratus MaaS',
    caseStudyTitle: 'One Control Panel, Three Different Depths of Use',
    summary:
      "Redesigning MageMojo's Magento hosting control panel around how deep each person actually needed to go, not who they were.",
    keyFocus: ['Information Architecture', 'Design Systems', 'Usability Testing'],
    stats: [
      { value: '-40%', label: 'Config Tickets' },
      { value: '-30%', label: 'Resolution Time' },
      { value: '100%', label: 'Team Adoption' },
    ],
  },
]
