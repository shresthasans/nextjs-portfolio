import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import { MotionConfig } from 'framer-motion'
import { Archivo, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { getPersonSchema } from '@/lib/person-schema'

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
    'Sanjay Shrestha is a senior product designer with 15+ years designing enterprise SaaS and AI products for Microsoft, Decisions and global teams, based in Kathmandu, Nepal.',
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
      'Sanjay Shrestha is a senior product designer with 15+ years designing enterprise SaaS and AI products for Microsoft, Decisions and global teams, based in Kathmandu, Nepal.',
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
      'Sanjay Shrestha is a senior product designer with 15+ years designing enterprise SaaS and AI products for Microsoft, Decisions and global teams, based in Kathmandu, Nepal.',
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
    getPersonSchema(),
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
          <MotionConfig reducedMotion="user">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-stone-900 focus:text-stone-50 dark:focus:bg-stone-50 dark:focus:text-stone-900 focus:text-sm focus:font-medium"
            >
              Skip to main content
            </a>
            <Nav />
            <main id="main-content" tabIndex={-1}>{children}</main>
            <Footer />
          </MotionConfig>
        </ThemeProvider>
        <GoogleAnalytics gaId="G-2JWGG06GGX" />
      </body>
    </html>
  )
}
