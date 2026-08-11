import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Contact Sanjay Shrestha | Product Design Enquiries' },
  description:
    'Get in touch with Sanjay Shrestha. Open to senior design roles, contracts, and consulting engagements globally.',
  alternates: {
    canonical: 'https://sanjayshrestha.com/contact',
  },
  openGraph: {
    title: 'Contact Sanjay Shrestha | Product Design Enquiries',
    description:
      'Open to senior design roles, contracts, and consulting engagements globally.',
    url: 'https://sanjayshrestha.com/contact',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Sanjay Shrestha | Product Design Enquiries',
    description:
      'Open to senior design roles, contracts, and consulting engagements globally.',
    images: ['/og-image.jpg'],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact',
    description:
      'Get in touch with Sanjay Shrestha. Open to senior design roles, contracts, and consulting engagements globally.',
    url: 'https://sanjayshrestha.com/contact',
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sanjayshrestha.com/' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://sanjayshrestha.com/contact' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  )
}
