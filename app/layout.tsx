import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Archivo, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf9' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0a09' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://sanjayshrestha.com'),
  title: {
    default: 'Sanjay Shrestha | Senior Product Designer',
    template: '%s | Sanjay Shrestha',
  },
  description:
    'Senior Product Designer with 15+ years crafting enterprise SaaS, B2B, and government digital products. CUA™ Certified. Open to global remote roles.',
  authors: [{ name: 'Sanjay Shrestha', url: 'https://sanjayshrestha.com' }],
  creator: 'Sanjay Shrestha',
  alternates: {
    canonical: 'https://sanjayshrestha.com/',
  },
  verification: {
    google: 'pzogUBsdk8njT0U3VwdLvF24uJLvxCEvS5Zqir89u1M',
    yandex: '25c4df6c7b3e7a11',
    other: {
      'msvalidate.01': 'EA2070FD155C3AFE859582C9E85454DE',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sanjayshrestha.com',
    siteName: 'Sanjay Shrestha',
    title: 'Sanjay Shrestha | Senior Product Designer',
    description:
      'Senior Product Designer with 15+ years crafting enterprise SaaS, B2B, and government digital products.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sanjay Shrestha | Senior Product Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@shresthasans',
    title: 'Sanjay Shrestha | Senior Product Designer',
    description:
      'Senior Product Designer with 15+ years crafting enterprise SaaS, B2B, and government digital products.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://sanjayshrestha.com/#person',
      name: 'Sanjay Shrestha',
      jobTitle: 'Senior Product Designer',
      description:
        'Senior Product Designer with 15+ years designing digital products used by millions. Specialising in Design Systems, AI-Powered UX, and B2B SaaS.',
      url: 'https://sanjayshrestha.com/',
      image: 'https://sanjayshrestha.com/og-image.jpg',
      email: 'contact@sanjayshrestha.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kathmandu',
        addressCountry: 'NP',
      },
      sameAs: [
        'https://www.linkedin.com/in/shresthasans',
        'https://www.behance.net/shresthasans',
        'https://dribbble.com/shresthasans',
        'https://twitter.com/shresthasans',
        'https://github.com/shresthasans',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://sanjayshrestha.com/#website',
      name: 'Sanjay Shrestha',
      url: 'https://sanjayshrestha.com/',
      description: 'Portfolio of Sanjay Shrestha — Senior Product Designer',
      author: { '@id': 'https://sanjayshrestha.com/#person' },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${archivo.variable} ${spaceGrotesk.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xj9xba34in");
          `}
        </Script>
        <ThemeProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <GoogleAnalytics gaId="G-6LG770RY6S" />
      </body>
    </html>
  )
}
