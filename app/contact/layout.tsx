import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Sanjay Shrestha. Open to senior design roles, contracts, and consulting engagements globally.',
  openGraph: {
    title: 'Contact | Sanjay Shrestha',
    description:
      'Open to senior design roles, contracts, and consulting engagements globally.',
    url: 'https://sanjayshrestha.com/contact',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Sanjay Shrestha',
    description:
      'Open to senior design roles, contracts, and consulting engagements globally.',
    images: ['/og-image.jpg'],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
