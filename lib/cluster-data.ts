export interface Cluster {
  slug: string
  name: string
  description: string
}

export const CLUSTERS: Cluster[] = [
  {
    slug: 'ai-product-design',
    name: 'AI Product Design',
    description:
      'How AI actually changes the product design process, from concepts and UX patterns to shipping AI-generated UI.',
  },
  {
    slug: 'design-systems',
    name: 'Design Systems',
    description:
      'Building and scaling design systems in practice: from-scratch decisions, icon systems, and what real ownership looks like.',
  },
  {
    slug: 'product-design-practice',
    name: 'Product Design Practice',
    description:
      'The research, process, and career judgment behind senior product design work, independent of any specific tool.',
  },
]

export function getCluster(slug: string): Cluster | undefined {
  return CLUSTERS.find((c) => c.slug === slug)
}

// Case studies most relevant to each cluster, surfaced on the hub page.
// Slugs reference lib/work-data.ts.
export const CLUSTER_CASE_STUDIES: Record<string, string[]> = {
  'ai-product-design': ['decisions-ai-mobile-meeting-app'],
  // Both candidate case studies (Stratus MaaS, Avira) are unlisted/not ready to
  // go live yet — see UNLISTED_SLUGS in app/work/[slug]/page.tsx. Re-add here
  // once either is ready to publish.
  'design-systems': [],
  'product-design-practice': [
    'pagevamp-onboarding-redesign',
    'streamshare-streaming-app-design',
    'linkedin-feed-redesign',
  ],
}
