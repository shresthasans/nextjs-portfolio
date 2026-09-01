import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import HomePageClient from '@/components/HomePageClient'
import { homeFaqs } from '@/lib/home-faqs'

export const metadata: Metadata = {
  title: {
    absolute: 'Senior Product Designer for Enterprise SaaS & AI | Sanjay Shrestha',
  },
  description:
    'Senior product designer with 15+ years designing enterprise SaaS, AI products and scalable design systems for teams worldwide.',
  openGraph: {
    title: 'Senior Product Designer for Enterprise SaaS & AI | Sanjay Shrestha',
    description:
      'Senior product designer with 15+ years designing enterprise SaaS, AI products and scalable design systems for teams worldwide.',
    url: 'https://sanjayshrestha.com',
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
    title: 'Senior Product Designer for Enterprise SaaS & AI | Sanjay Shrestha',
    description:
      'Senior product designer with 15+ years designing enterprise SaaS, AI products and scalable design systems for teams worldwide.',
    images: ['/og-image.jpg'],
  },
}

const webPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://sanjayshrestha.com/',
  url: 'https://sanjayshrestha.com/',
  name: 'Senior Product Designer for Enterprise SaaS & AI | Sanjay Shrestha',
  isPartOf: { '@id': 'https://sanjayshrestha.com/#website' },
  about: { '@id': 'https://sanjayshrestha.com/#person' },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['#speakable-headline', '#speakable-summary'],
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homeFaqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
}

function getLatestPosts(limit = 3) {
  const dir = path.join(process.cwd(), 'content', 'blog')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const { data } = matter(fs.readFileSync(path.join(dir, filename), 'utf-8'))
      return {
        slug: filename.replace('.mdx', ''),
        title: data.title as string,
        excerpt: data.excerpt as string,
        tag: data.tag as 'UX' | 'Design Systems' | 'AI' | 'Career' | 'Agent UX',
        date: data.date as string,
        readingTime: data.readingTime as string,
        coverImage: data.coverImage as string | undefined,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}

export default function Home() {
  const latestPosts = getLatestPosts()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HomePageClient latestPosts={latestPosts} />
    </>
  )
}
