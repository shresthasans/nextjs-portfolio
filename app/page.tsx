import type { Metadata } from 'next'
import HomePageClient from '@/components/HomePageClient'

export const metadata: Metadata = {
  title: {
    absolute: 'Sanjay Shrestha | Senior Product Designer',
  },
  description:
    'Senior Product Designer with 15+ years crafting enterprise SaaS, B2B, and government digital products. CUA™ Certified. Open to global remote roles.',
  openGraph: {
    title: 'Sanjay Shrestha | Senior Product Designer',
    description:
      'Senior Product Designer with 15+ years crafting enterprise SaaS, B2B, and government digital products.',
    url: 'https://sanjayshrestha.com',
  },
}

export default function Home() {
  return <HomePageClient />
}
