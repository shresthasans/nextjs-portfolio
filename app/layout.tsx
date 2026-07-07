import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  metadataBase: new URL('https://sanjayshrestha.com'),
  title: {
    default: 'Sanjay Shrestha | Senior Product Designer',
    template: '%s | Sanjay Shrestha',
  },
  description:
    'Senior Product Designer with 15+ years crafting enterprise SaaS, B2B, and government digital products. CUA™ Certified. Open to global remote roles.',
  keywords: [
    'product designer',
    'UX designer',
    'design systems',
    'enterprise SaaS',
    'CUA certified',
    'Nepal',
  ],
  authors: [{ name: 'Sanjay Shrestha', url: 'https://sanjayshrestha.com' }],
  creator: 'Sanjay Shrestha',
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
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sanjay Shrestha | Senior Product Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanjay Shrestha | Senior Product Designer',
    description:
      'Senior Product Designer with 15+ years crafting enterprise SaaS, B2B, and government digital products.',
    images: ['/og-image.png'],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${archivo.variable} ${spaceGrotesk.variable}`}>
      <body>
        <ThemeProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
