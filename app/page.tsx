import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
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
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does Sanjay Shrestha specialise in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sanjay Shrestha is a Senior Product Designer specialising in Design Systems, AI-Powered UX, and B2B SaaS product design. With 15+ years of experience, he focuses on end-to-end product design including user research, interaction design, accessibility, and engineering handoff.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Sanjay Shrestha available for freelance or full-time work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Sanjay Shrestha is open to Senior Product Designer and Lead UX Designer opportunities — both freelance and full-time. He is based in Kathmandu, Nepal and is open to global remote roles or relocation.',
      },
    },
    {
      '@type': 'Question',
      name: "What is Sanjay Shrestha's professional background?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sanjay Shrestha has 15+ years of experience designing digital products used by millions. He has worked at Decisions, Microsoft, and Webscale Networks, designing products for enterprise B2B SaaS platforms, government citizen services, and global eCommerce brands. He is a CUA™ (Certified Usability Analyst) certified by Human Factors International.',
      },
    },
    {
      '@type': 'Question',
      name: 'What tools and technologies does Sanjay Shrestha use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sanjay Shrestha primarily uses Figma for product design and prototyping, along with Microsoft Teams, Google Workspace, and AI tools like Claude and ChatGPT. He also has front-end development skills in HTML and CSS, enabling close collaboration with engineering teams.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I contact Sanjay Shrestha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can contact Sanjay Shrestha via email at hello@sanjayshrestha.com, or connect with him on LinkedIn at linkedin.com/in/shresthasans. His portfolio is available at sanjayshrestha.com.',
      },
    },
    {
      '@type': 'Question',
      name: 'What certifications does Sanjay Shrestha hold?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sanjay Shrestha holds the CUA™ (Certified Usability Analyst) certification from Human Factors International (HFI), one of the most respected credentials in the UX field. He also has Verified International Academic Qualifications from World Education Services (WES).',
      },
    },
  ],
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
        tag: data.tag as string,
        date: data.date as string,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HomePageClient latestPosts={latestPosts} />
    </>
  )
}
