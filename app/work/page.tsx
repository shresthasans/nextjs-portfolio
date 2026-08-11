import type { Metadata } from 'next'
import AnimatedSection from '@/components/AnimatedSection'
import { CaseStudyRow } from '@/components/CaseStudyCard'
import { allWork } from '@/lib/work-data'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Case studies in enterprise SaaS, government, and AI-powered product design by Sanjay Shrestha.',
  alternates: {
    canonical: 'https://sanjayshrestha.com/work',
  },
  openGraph: {
    title: 'Work | Sanjay Shrestha',
    description:
      'Case studies in enterprise SaaS, government, and AI-powered product design.',
    url: 'https://sanjayshrestha.com/work',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work | Sanjay Shrestha',
    description:
      'Case studies in enterprise SaaS, government, and AI-powered product design.',
    images: ['/og-image.jpg'],
  },
}

export default function WorkPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Selected Work',
    description:
      'Case studies in enterprise SaaS, government, and AI-powered product design by Sanjay Shrestha.',
    url: 'https://sanjayshrestha.com/work',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: allWork.map((study, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: study.title,
        url: `https://sanjayshrestha.com/work/${study.slug}`,
      })),
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sanjayshrestha.com/' },
      { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://sanjayshrestha.com/work' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    <section className="pt-36 pb-24">
      <div className="container-portfolio">
        <AnimatedSection className="max-w-2xl">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-4">
            Work
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-[1.1] mb-6 text-balance">
            Selected Work
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
            A curated selection of client work, personal explorations and product design exercises
            that showcase how I approach solving complex product challenges. Much of my recent
            enterprise work remains confidential, but the principles behind it are reflected
            throughout these projects.
          </p>
        </AnimatedSection>

        {/* Enterprise statement */}
        <AnimatedSection className="max-w-[700px] mx-auto text-center border-t border-stone-200 dark:border-stone-800 mt-16 pt-12 pb-12 lg:mt-16 lg:pt-16 lg:pb-16">
          <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
            Most of my recent enterprise work is protected by confidentiality agreements. While I
            can&apos;t share those projects publicly, the case studies below reflect the same
            product thinking, design decisions and execution I apply in production every day.
          </p>
        </AnimatedSection>

        <div className="border-t border-stone-200 dark:border-stone-800 mb-20" />

        {/* Rows */}
        <div className="flex flex-col gap-28 lg:gap-40">
          {allWork.map((study, idx) => (
            <CaseStudyRow key={study.slug} study={study} index={idx} />
          ))}
        </div>

        {/* Closing note */}
        <AnimatedSection className="mt-32 lg:mt-40 mb-8 max-w-2xl mx-auto text-center border-t border-stone-200 dark:border-stone-800 pt-16">
          <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
            While many of the products I&apos;ve worked on can&apos;t be shared publicly due to
            confidentiality, I&apos;m always happy to discuss the product challenges, design
            decisions and outcomes behind them.
          </p>
        </AnimatedSection>
      </div>
    </section>
    </>
  )
}
