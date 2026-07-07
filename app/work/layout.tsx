import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Case studies spanning 15+ years of enterprise SaaS, B2B, and government product design: Microsoft, Webscale, Decisions, and more.',
  openGraph: {
    title: 'Work | Sanjay Shrestha',
    description:
      'Case studies spanning 15+ years of enterprise SaaS, B2B, and government product design.',
    url: 'https://sanjayshrestha.com/work',
  },
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
