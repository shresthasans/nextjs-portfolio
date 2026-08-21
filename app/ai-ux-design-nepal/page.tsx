import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import Breadcrumbs from '@/components/Breadcrumbs'
import BlogCard, { BlogPost } from '@/components/BlogCard'
import CaseStudyCard from '@/components/CaseStudyCard'
import { allWork } from '@/lib/work-data'

export const metadata: Metadata = {
  title: 'AI UX Designer in Nepal for Human-Centered AI',
  description:
    'AI UX designer in Nepal, designing AI products people trust: confidence, editable output, explainability, and fallback states from real enterprise work.',
  alternates: {
    canonical: 'https://sanjayshrestha.com/ai-ux-design-nepal',
  },
  openGraph: {
    title: 'AI UX Designer in Nepal for Human-Centered AI',
    description:
      'AI UX designer in Nepal, designing AI products people trust: confidence, editable output, explainability, and fallback states from real enterprise work.',
    url: 'https://sanjayshrestha.com/ai-ux-design-nepal',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI UX Designer in Nepal for Human-Centered AI',
    description:
      'AI UX designer in Nepal, designing AI products people trust: confidence, editable output, explainability, and fallback states from real enterprise work.',
    images: ['/og-image.jpg'],
  },
}

const ARTICLE_SLUGS = [
  'ai-ux-design-patterns',
  'what-is-agent-ux',
  'ai-in-the-product-design-process',
  'ai-concepts-not-tools',
  'scaling-product-design-with-ai',
  'ai-native-workflow-transition',
]

function getArticles(): BlogPost[] {
  const dir = path.join(process.cwd(), 'content', 'blog')
  return ARTICLE_SLUGS.map((slug) => {
    const filePath = path.join(dir, `${slug}.mdx`)
    if (!fs.existsSync(filePath)) return null
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(raw)
    return { slug, ...data } as BlogPost
  }).filter((post): post is BlogPost => Boolean(post))
}

const principles = [
  {
    title: 'Confidence & Uncertainty',
    description:
      'Surfacing how sure the system is, not just its output. A confident-sounding wrong answer is more dangerous than one that visibly hedges: the interface should show its work.',
  },
  {
    title: 'Editable AI Output',
    description:
      'AI-generated content is a draft, not a decision. Every output needs a clear, low-friction path to correct it before it becomes the record of what happened.',
  },
  {
    title: 'Human Review',
    description:
      'For anything consequential (a decision, a vote, a commitment) a person confirms it. AI accelerates the path to that moment; it doesn&apos;t replace it.',
  },
  {
    title: 'Explainability',
    description:
      'If a user can&apos;t tell why the system produced a given output, they can&apos;t trust it or correct it. Explaining the &ldquo;why&rdquo; is part of the interface, not a debug log.',
  },
  {
    title: 'Failure & Fallback States',
    description:
      'AI features fail differently than normal software: confidently, silently, or in ways that look like success. Designing the failure states matters as much as the happy path.',
  },
  {
    title: 'Progressive Trust',
    description:
      'Nobody hands full autonomy to a new feature on day one. Trust is earned in stages, starting with suggestions a human approves and expanding scope as the system proves reliable.',
  },
  {
    title: 'Enterprise AI Constraints',
    description:
      'Enterprise AI adds compliance, audit trails, and NDA-covered data most consumer AI patterns ignore. The design has to hold up under review, not just a demo.',
  },
]

export default function AiUxDesignNepalPage() {
  const decisionsAI = allWork.find((w) => w.slug === 'decisions-ai-mobile-meeting-app')
  const articles = getArticles()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      '@id': 'https://sanjayshrestha.com/#person',
      name: 'Sanjay Shrestha',
      jobTitle: 'Senior Product Designer',
      url: 'https://sanjayshrestha.com/ai-ux-design-nepal',
      image: 'https://sanjayshrestha.com/images/profile/sanjay.webp',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kathmandu',
        addressCountry: 'NP',
      },
      description:
        'AI UX designer based in Kathmandu, Nepal, designing human-centered AI products for enterprise SaaS: confidence, explainability, editable output and fallback states.',
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sanjayshrestha.com/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'AI UX Designer in Nepal',
        item: 'https://sanjayshrestha.com/ai-ux-design-nepal',
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="pt-36 pb-20">
        <div className="container-portfolio">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'AI UX Designer in Nepal' }]} />
          <AnimatedSection className="max-w-3xl">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-4">
              AI UX Design
            </p>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-[1.1] mb-6 text-balance">
              Designing AI Products People Can Understand and Trust
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              Most AI features fail the same way: they hide their reasoning, offer no way to
              correct a wrong output, and fail silently when they&apos;re unsure. I design AI
              products the other way, with output people can see through, edit, and trust
              incrementally as it proves itself. I&apos;m an AI UX designer based in Kathmandu,
              Nepal, currently leading design for Decisions AI, an enterprise AI meeting assistant
              used inside Microsoft Teams by 5,000+ organizations.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 border-y border-stone-200 dark:border-stone-800">
        <div className="container-portfolio">
          <AnimatedSection className="mb-12">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">
              Principles
            </p>
            <h2 className="font-heading text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              How I Design AI UX
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map(({ title, description }) => (
              <StaggerItem key={title}>
                <div className="h-full p-6 bg-white/70 dark:bg-stone-900/60 backdrop-blur-xl border border-stone-200/60 dark:border-stone-700/40 rounded-2xl shadow-sm hover:shadow-md hover:bg-white/90 dark:hover:bg-stone-900/80 transition-all duration-300">
                  <h3 className="font-heading text-lg font-semibold text-stone-900 dark:text-stone-50 mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    {description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Decisions AI evidence */}
      {decisionsAI && (
        <section className="py-20">
          <div className="container-portfolio">
            <AnimatedSection className="mb-12 max-w-3xl">
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">
                Applied in Production
              </p>
              <h2 className="font-heading text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight mb-4">
                Enterprise AI, Not a Demo
              </h2>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                Decisions AI runs inside Microsoft Teams for organizations including Vestas, BDO,
                NHS, and Manpower. Every AI-generated summary or suggested action needs a
                clear confidence signal, an easy way to correct it, and a human still making the
                actual decision. It&apos;s an active, NDA-covered engagement, so what&apos;s shared
                here is limited to what&apos;s publicly verifiable and a direct account of the
                design constraints, not internal research or metrics.
              </p>
            </AnimatedSection>
            <StaggerContainer className="max-w-2xl">
              <StaggerItem>
                <CaseStudyCard {...decisionsAI} />
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Articles */}
      {articles.length > 0 && (
        <section className="py-20 bg-stone-100/50 dark:bg-stone-900/50 border-y border-stone-200 dark:border-stone-800">
          <div className="container-portfolio">
            <AnimatedSection className="mb-12">
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">
                Further Reading
              </p>
              <h2 className="font-heading text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
                Writing on AI UX and Product Design
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((post, i) => (
                <AnimatedSection key={post.slug} delay={i * 0.06}>
                  <BlogCard {...post} />
                </AnimatedSection>
              ))}
            </div>
            <AnimatedSection className="mt-10 text-center">
              <Link
                href="/blog/topics/ai-product-design"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-700 dark:text-amber-400 hover:underline underline-offset-2"
              >
                See all AI Product Design articles
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20">
        <div className="container-portfolio">
          <AnimatedSection>
            <div className="rounded-3xl bg-stone-900 dark:bg-stone-800 p-12 sm:p-16 text-center space-y-6">
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-stone-50 tracking-tight max-w-xl mx-auto text-balance">
                Building an AI feature people will actually trust?
              </h2>
              <p className="text-stone-400 max-w-2xl mx-auto">
                If you&apos;re designing AI into a product and want the trust, failure states, and
                human oversight handled properly from the start, I&apos;d love to hear about it.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium text-sm transition-colors duration-200 cursor-pointer"
              >
                Get in Touch
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
