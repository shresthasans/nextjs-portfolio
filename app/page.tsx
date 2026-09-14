import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import HeroSection from '@/components/HeroSection'
import TrackedLink from '@/components/TrackedLink'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { CaseStudyRow } from '@/components/CaseStudyCard'
import BlogCard from '@/components/BlogCard'
import Testimonials from '@/components/Testimonials'
import FAQAccordion from '@/components/FAQAccordion'
import { allWork } from '@/lib/work-data'
import { CUA_VERIFY_URL } from '@/lib/constants'
import { clients } from '@/lib/clients'
import { homeFaqs } from '@/lib/home-faqs'
import { getBlurDataURL } from '@/lib/blur-data'

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

const FEATURED_SLUGS = ['pagevamp-onboarding-redesign', 'decisions-ai-mobile-meeting-app', 'linkedin-feed-redesign']

const featuredWork = FEATURED_SLUGS
  .map((slug) => allWork.find((w) => w.slug === slug))
  .filter(Boolean)

const expertise = [
  {
    title: 'Enterprise SaaS',
    description: 'Designing complex workflows and productivity platforms for enterprise teams.',
    href: '/work/stratus-maas-saas-dashboard-redesign',
  },
  {
    title: 'AI Product Design',
    description: 'Designing AI-powered experiences that simplify complex workflows.',
    href: '/ai-ux-design-nepal',
  },
  {
    title: 'Design Systems',
    description: 'Building scalable component libraries, tokens and documentation from scratch.',
  },
  {
    title: 'Accessibility',
    description: 'Creating inclusive products that meet WCAG standards.',
  },
  {
    title: 'Product Strategy',
    description: 'Aligning user needs, business goals and technical constraints.',
  },
  {
    title: 'User Research',
    description: 'Using research and usability testing to validate product decisions.',
  },
]

const faqLinkClass =
  'underline underline-offset-2 text-stone-900 dark:text-stone-50 hover:text-amber-700 dark:hover:text-amber-400'

const homeFaqOverrides: Record<string, ReactNode> = {
  'What types of companies do you work with?': (
    <>
      Mostly enterprise SaaS companies, AI product teams and organizations building government or
      citizen-facing platforms. I&rsquo;ve designed products at Microsoft, Decisions and Neudesic
      (an IBM company), and taken on consulting engagements with other B2B software teams building
      complex, data-heavy products — see{' '}
      <Link href="/work" className={faqLinkClass}>
        selected work
      </Link>
      .
    </>
  ),
  'What does your product-design process include?': (
    <>
      End-to-end product design: user research and discovery, product strategy, information
      architecture and{' '}
      <Link href="/ux-ui-designer-nepal" className={faqLinkClass}>
        UX/UI design
      </Link>
      , plus accessibility review and close collaboration with engineering through handoff.{' '}
      <Link href="/about" className={faqLinkClass}>
        Read more about my background
      </Link>
      .
    </>
  ),
  'How can someone contact you?': (
    <>
      The fastest way is email at{' '}
      <a href="mailto:contact@sanjayshrestha.com" className={faqLinkClass}>
        contact@sanjayshrestha.com
      </a>
      , or connect on LinkedIn at{' '}
      <a
        href="https://linkedin.com/in/shresthasans"
        target="_blank"
        rel="noopener noreferrer"
        className={faqLinkClass}
      >
        linkedin.com/in/shresthasans
      </a>
      . You can also reach out directly through the{' '}
      <Link href="/contact" className={faqLinkClass}>
        contact page
      </Link>
      .
    </>
  ),
}

const homeFaqItems = homeFaqs.map((item) => ({
  question: item.question,
  answer: homeFaqOverrides[item.question] ?? item.answer,
}))

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

      <HeroSection />

      {/* Core Expertise */}
      <section className="py-28 border-y border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/50">
        <div className="container-portfolio">
          <AnimatedSection className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">
              What I Do
            </p>
            <h2 className="font-heading text-4xl font-bold text-stone-900 dark:text-stone-50 tracking-tight mb-4">
              Core Expertise
            </h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              I combine product thinking, systems thinking and user-centered design to create
              products that scale across enterprise SaaS, AI and government platforms.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map(({ title, description, href }) => (
              <StaggerItem key={title}>
                <div className="h-full p-6 bg-white/70 dark:bg-stone-900/60 backdrop-blur-xl border border-stone-200/60 dark:border-stone-700/40 rounded-2xl shadow-sm hover:shadow-md hover:bg-white/90 dark:hover:bg-stone-900/80 transition-all duration-300">
                  <h3 className="font-heading text-lg font-semibold mb-2">
                    {href ? (
                      <Link
                        href={href}
                        className="text-stone-900 dark:text-stone-50 hover:text-amber-700 dark:hover:text-amber-400 transition-colors duration-200"
                      >
                        {title}
                      </Link>
                    ) : (
                      <span className="text-stone-900 dark:text-stone-50">{title}</span>
                    )}
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

      {/* Featured Work */}
      <section className="py-28">
        <div className="container-portfolio">
          <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
            <div>
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">
                Selected Work
              </p>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
                Featured Case Studies
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors duration-200 cursor-pointer shrink-0"
            >
              All work <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </AnimatedSection>

          <div className="flex flex-col gap-24 lg:gap-32">
            {featuredWork.map((study, idx) => (
              <CaseStudyRow key={study!.slug} study={study!} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Clients logos */}
      <section className="py-20 border-y border-stone-200 dark:border-stone-800">
        <div className="container-portfolio">
          <AnimatedSection>
            <p className="text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-widest text-center mb-10">
              Worked With
            </p>
          </AnimatedSection>
          <StaggerContainer className="flex flex-wrap items-center justify-center gap-10 sm:gap-14">
            {clients.map(({ name, logo, width, height, href }) => (
              <StaggerItem key={name}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
                  <Image
                    src={logo}
                    alt=""
                    width={width}
                    height={height}
                    style={{ width: `${width}px`, height: `${height}px` }}
                    className="opacity-60 hover:opacity-100 transition-opacity duration-200 dark:brightness-0 dark:invert"
                  />
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <Testimonials />

      {/* About teaser */}
      <section className="py-28">
        <div className="container-portfolio">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700">
                <Image
                  src="/images/profile/sanjay.webp"
                  alt="Sanjay Shrestha, Senior Product Designer"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={getBlurDataURL('/images/profile/sanjay.webp')}
                />
                <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/90 dark:bg-stone-900/90 rounded-xl border border-stone-200 dark:border-stone-700 backdrop-blur-sm">
                  <p className="font-heading font-semibold text-stone-900 dark:text-stone-50 text-sm mb-1">
                    Sanjay Shrestha
                  </p>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Senior Product Designer ·{' '}
                    <a
                      href={CUA_VERIFY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-stone-900 dark:hover:text-stone-50"
                    >
                      CUA™ Certified
                    </a>
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <div className="space-y-6">
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
                  About
                </p>
                <h2 className="font-heading text-4xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-tight">
                  From government platforms to enterprise AI.
                </h2>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                  Over the past 15 years, I&apos;ve designed products across enterprise SaaS,
                  government services and AI-powered experiences. From improving services used by
                  millions of people to building design systems from scratch, I enjoy solving
                  complex problems with simple, thoughtful design.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-medium text-stone-900 dark:text-stone-50 border-b border-stone-300 dark:border-stone-600 pb-0.5 hover:border-amber-700 dark:hover:border-amber-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors duration-200 cursor-pointer"
                >
                  Read my story <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Latest from the blog */}
      {latestPosts.length > 0 && (
        <section className="py-28">
          <div className="container-portfolio">
            <AnimatedSection className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-2">
                  Writing
                </p>
                <h2 className="font-heading text-4xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-tight">
                  From the blog
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors duration-200 cursor-pointer shrink-0"
              >
                View all <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestPosts.map((post, i) => (
                <AnimatedSection key={post.slug} delay={i * 0.08}>
                  <BlogCard {...post} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-28">
        <div className="container-portfolio">
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-2">
              FAQ
            </p>
            <h2 className="font-heading text-4xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-tight">
              Frequently asked questions
            </h2>
          </AnimatedSection>

          <AnimatedSection className="max-w-3xl mx-auto">
            <FAQAccordion items={homeFaqItems} />
          </AnimatedSection>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20">
        <div className="container-portfolio">
          <AnimatedSection>
            <div className="rounded-3xl bg-stone-900 dark:bg-stone-800 p-12 sm:p-16 text-center space-y-6">
              <Link
                href="/product-designer-nepal"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-800 dark:bg-stone-700 rounded-full mb-2 hover:bg-stone-700 dark:hover:bg-stone-600 transition-colors duration-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-stone-300 font-medium">Based in Kathmandu, Nepal</span>
              </Link>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-stone-50 tracking-tight max-w-xl mx-auto text-balance">
                Let&apos;s build something meaningful together.
              </h2>
              <p className="text-stone-400 max-w-2xl mx-auto">
                Whether you&apos;re building a new product, improving an existing experience, or
                exploring AI-powered workflows, I&apos;d love to hear what you&apos;re working on.
              </p>
              <TrackedLink
                href="/contact"
                eventName="contact_click"
                eventParams={{ location: 'footer_cta' }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium text-sm transition-colors duration-200 cursor-pointer"
              >
                Get in Touch
                <ArrowRight size={15} aria-hidden="true" />
              </TrackedLink>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
