import { CaseStudy } from '@/components/CaseStudyCard'

export const allWork: CaseStudy[] = [
  {
    slug: 'pagevamp',
    title: 'Pagevamp',
    client: 'Pagevamp',
    role: 'Lead UX Designer',
    outcome:
      'Free trial signups up 30%. Privacy concerns dropped from 15% to under 5%. 99% of users completed basic info. Built a path for the 20% of trial users the product previously had no answer for.',
    type: 'SaaS',
    year: '2018',
    coverImage: '/images/work/pagevamp/hero.jpg',
    metaLabel: 'Client Project • SaaS',
    productName: 'Pagevamp',
    caseStudyTitle: 'Fixing the First Five Minutes',
    summary:
      'Helping first-time users launch their websites faster by simplifying onboarding and reducing early friction.',
    keyFocus: ['User Onboarding', 'Information Architecture', 'Conversion Optimization'],
  },
  {
    slug: 'webscale-stratus',
    title: 'Webscale Stratus Platform',
    client: 'Webscale Networks',
    role: 'Senior Product Designer',
    outcome:
      'Designed a global eCommerce SaaS platform for Fortune 500 retailers. Improved onboarding conversion by 60% and reduced support tickets by 35%.',
    type: 'eCommerce',
    year: '2021',
    coverImage: '/images/work/webscale-stratus/hero.jpg',
    metaLabel: 'Client Project • Enterprise SaaS',
    productName: 'Webscale Stratus Platform',
    caseStudyTitle: 'Simplifying Enterprise Infrastructure Management',
    summary:
      'Simplifying complex cloud infrastructure management for enterprise retailers through a scalable SaaS experience.',
    keyFocus: ['Enterprise Workflows', 'Dashboard UX', 'Scalable SaaS'],
  },
  {
    slug: 'streamshare',
    title: 'Streamshare',
    client: 'Personal Project',
    role: 'Product Designer',
    outcome:
      'Designed a video streaming mobile app concept that combined interest-based recommendations, location discovery, and stream scheduling, a gap no major competitor had filled.',
    type: 'SaaS',
    year: '2021',
    coverImage: '/images/work/streamshare/hero.jpg',
    metaLabel: 'Personal Project • Concept',
    productName: 'Streamshare',
    caseStudyTitle: 'Rethinking Live Content Discovery',
    summary:
      'A personal exploration into making live content discovery faster through interest-based recommendations.',
    keyFocus: ['Mobile UX', 'Discovery Experience', 'Recommendation System'],
  },
  {
    slug: 'avira',
    title: 'Avira Antivirus',
    client: 'Avira (Self-directed)',
    role: 'Product Designer',
    outcome:
      'Full IA, design system, and high-fidelity UI for Avira Free: dashboard, scanning, quarantine, and upgrade path. Reframed a visual-consistency problem as a trust problem — and designed around that specific failure mode.',
    type: 'Enterprise',
    year: '2020',
    coverImage: '/images/work/avira/hero.webp',
    metaLabel: 'Product Design Exercise',
    productName: 'Avira Antivirus',
    caseStudyTitle: 'Designing for Trust, Not Just Security',
    summary: 'Reimagining the antivirus experience by improving clarity, trust and usability.',
    keyFocus: ['Visual Redesign', 'Information Hierarchy', 'User Trust'],
  },
  {
    slug: 'linkedin-feed-redesign',
    title: 'LinkedIn Feed Redesign',
    client: 'Personal Project',
    role: 'Product Designer',
    outcome:
      "A self-initiated redesign of LinkedIn's homepage feed. Kept the three-column structure but rebuilt the hierarchy inside it, treating a WCAG accessibility audit as the actual mechanism for the fix, not a separate pass.",
    type: 'SaaS',
    year: '2026',
    coverImage: '/images/work/linkedin/hero.jpg',
    metaLabel: 'Self-Initiated Project • Redesign',
    productName: 'LinkedIn Feed Redesign',
    caseStudyTitle: 'A Case Study in Hierarchy and Access',
    summary:
      "A self-initiated redesign of LinkedIn's homepage feed, built to prove that focus, hierarchy, and accessibility are decisions, not decoration.",
    keyFocus: ['Visual Hierarchy', 'Accessibility (WCAG)', 'Information Architecture'],
  },
]
