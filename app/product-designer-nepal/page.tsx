import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import Breadcrumbs from '@/components/Breadcrumbs'
import CaseStudyCard from '@/components/CaseStudyCard'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import { allWork } from '@/lib/work-data'
import { clients } from '@/lib/clients'
import { CUA_VERIFY_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Product Designer in Nepal | Sanjay Shrestha',
  description:
    'Senior product designer in Nepal with 15+ years designing enterprise SaaS, AI products and design systems for Microsoft, Decisions and global SaaS teams.',
  alternates: {
    canonical: 'https://sanjayshrestha.com/product-designer-nepal',
  },
  openGraph: {
    title: 'Product Designer in Nepal | Sanjay Shrestha',
    description:
      'Senior product designer in Nepal with 15+ years designing enterprise SaaS, AI products and design systems for Microsoft, Decisions and global SaaS teams.',
    url: 'https://sanjayshrestha.com/product-designer-nepal',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Designer in Nepal | Sanjay Shrestha',
    description:
      'Senior product designer in Nepal with 15+ years designing enterprise SaaS, AI products and design systems for Microsoft, Decisions and global SaaS teams.',
    images: ['/og-image.jpg'],
  },
}

const caseStudies = allWork

const expertise = [
  {
    title: 'Enterprise SaaS',
    description:
      'Designing complex, data-heavy workflows for enterprise teams — from first-time onboarding to the dense, permission-aware screens power users live in every day.',
  },
  {
    title: 'Product Strategy',
    description:
      'Working with founders and product leads to turn a rough problem statement into a scoped, sequenced roadmap before a single screen gets drawn.',
  },
  {
    title: 'User Research',
    description:
      'Running interviews, usability testing and structured research programs, then translating findings into decisions the team can actually act on.',
  },
  {
    title: 'Interaction Design',
    description:
      'Detailing the flows, states and edge cases that separate a demo from a product people can rely on under real, messy conditions.',
  },
  {
    title: 'Design Systems',
    description:
      'Building component libraries, tokens and documentation from scratch, so design and engineering stop re-solving the same problem per screen.',
  },
  {
    title: 'Accessibility',
    description:
      'Designing to WCAG standards as a default, not an afterthought — informed by shipping a government platform used by millions.',
  },
]

export default function ProductDesignerNepalPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      '@id': 'https://sanjayshrestha.com/#person',
      name: 'Sanjay Shrestha',
      jobTitle: 'Senior Product Designer',
      url: 'https://sanjayshrestha.com/product-designer-nepal',
      image: 'https://sanjayshrestha.com/images/profile/sanjay.webp',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kathmandu',
        addressCountry: 'NP',
      },
      description:
        'Senior product designer based in Kathmandu, Nepal, with 15+ years designing enterprise SaaS, AI products and design systems for Microsoft, Decisions and global SaaS teams.',
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
        name: 'Product Designer in Nepal',
        item: 'https://sanjayshrestha.com/product-designer-nepal',
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
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Product Designer in Nepal' }]} />
          <AnimatedSection className="max-w-3xl">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-4">
              Product Design
            </p>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-[1.1] mb-6 text-balance">
              Senior Product Designer Based in Nepal
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              I help enterprise SaaS and AI product teams turn ambiguous problems into shippable,
              usable software — from the first research conversation through to the design system
              that keeps the product consistent as it scales. Over 15 years I&apos;ve done this for
              a Microsoft Teams meeting platform used by 5,000+ organizations, a government citizen
              portal serving 4M+ people, and SaaS products across eCommerce and B2B. Based in
              Kathmandu, working with teams across the US, Europe and Asia-Pacific.
            </p>
            <p className="mt-4 text-sm text-stone-500 dark:text-stone-400">
              Looking specifically for research, IA and interface work? See my{' '}
              <Link
                href="/ux-ui-designer-nepal"
                className="text-amber-700 dark:text-amber-400 underline underline-offset-2 hover:no-underline"
              >
                UX/UI design process
              </Link>
              . For AI product work specifically, see how I approach{' '}
              <Link
                href="/ai-ux-design-nepal"
                className="text-amber-700 dark:text-amber-400 underline underline-offset-2 hover:no-underline"
              >
                AI UX design
              </Link>
              .
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Who I help */}
      <section className="py-16 border-y border-stone-200 dark:border-stone-800">
        <div className="container-portfolio">
          <AnimatedSection className="max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight mb-4">
              Who I work with
            </h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              Most of my work is with enterprise SaaS companies past the earliest MVP stage — the
              product works, but the roadmap has outgrown the original design, onboarding is
              leaking users, or the interface has accumulated inconsistency across screens and
              teams. I also work with founders validating a new AI-powered product direction, and
              with engineering teams that need a design system so decisions stop being remade
              screen by screen. If that sounds like where your product is, this is the kind of
              problem I spend most of my time solving.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20">
        <div className="container-portfolio">
          <AnimatedSection className="mb-12">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">
              What I Do
            </p>
            <h2 className="font-heading text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              End-to-End Product Design
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map(({ title, description }) => (
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

      {/* Case studies */}
      <section className="py-20 bg-stone-100/50 dark:bg-stone-900/50 border-y border-stone-200 dark:border-stone-800">
        <div className="container-portfolio">
          <AnimatedSection className="mb-12">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">
              Selected Work
            </p>
            <h2 className="font-heading text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              Case Studies
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {caseStudies.map((study) => (
              <StaggerItem key={study.slug}>
                <CaseStudyCard {...study} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Employer / client evidence */}
      <section className="py-20">
        <div className="container-portfolio">
          <AnimatedSection>
            <p className="text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-widest text-center mb-10">
              Companies I&apos;ve designed for
            </p>
          </AnimatedSection>
          <StaggerContainer className="flex flex-wrap items-center justify-center gap-10 sm:gap-14 mb-12">
            {clients.map(({ name, logo, width, height, href }) => (
              <StaggerItem key={name}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
                  <Image
                    src={logo}
                    alt={name}
                    width={width}
                    height={height}
                    style={{ width: `${width}px`, height: `${height}px` }}
                    className="opacity-60 hover:opacity-100 transition-opacity duration-200 dark:brightness-0 dark:invert"
                  />
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <AnimatedSection className="max-w-2xl mx-auto text-center">
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              I&apos;m a{' '}
              <a
                href={CUA_VERIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-stone-900 dark:hover:text-stone-50"
              >
                CUA™ Certified Usability Analyst
              </a>{' '}
              through Human Factors International, and I hold a Certificate of Appreciation from
              Microsoft for my work on Singapore&apos;s CPF citizen portal.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 border-t border-stone-200 dark:border-stone-800">
        <div className="container-portfolio max-w-2xl mx-auto">
          <AnimatedSection className="mb-10 text-center">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">
              What People Say
            </p>
            <h2 className="font-heading text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              Testimonials
            </h2>
          </AnimatedSection>
          <TestimonialCarousel
            items={[
              {
                quote:
                  'Integrates my meetings easily from my computer to my phone super easy to view my same agendas here and there and make changes on the go. Great app.',
                author: 'Angela, App Store',
              },
              {
                quote:
                  'Together with the Teams app, Decisions makes it super easy to run official voting in meetings - either straight in the app or in the Teams chat',
                author: 'Bjørn Bjørnsson, App Store',
              },
              {
                quote: 'Excellent tool for meeting management and decision tracking.',
                author: 'Ryan Connors, Google Play',
              },
            ]}
          />
        </div>
      </section>

      {/* Working from Kathmandu */}
      <section className="py-20 bg-stone-100/50 dark:bg-stone-900/50 border-y border-stone-200 dark:border-stone-800">
        <div className="container-portfolio">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight mb-5">
              Working Globally, Based in Kathmandu
            </h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              I&apos;ve worked remotely for nearly a decade — with teams in Santa Clara, Hyderabad,
              Bangalore and across Europe — long enough to know how to keep a distributed team
              moving without losing design quality along the way. Kathmandu&apos;s timezone
              overlaps a workable window with both US and European hours, and with Asia-Pacific
              teams directly. Alongside full-time senior design work, I occasionally take on
              select freelance and consulting engagements for teams that need this kind of
              product design help.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-portfolio">
          <AnimatedSection>
            <div className="rounded-3xl bg-stone-900 dark:bg-stone-800 p-12 sm:p-16 text-center space-y-6">
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-stone-50 tracking-tight max-w-xl mx-auto text-balance">
                Let&apos;s build something meaningful together.
              </h2>
              <p className="text-stone-400 max-w-2xl mx-auto">
                If you have a product challenge worth solving properly, I&apos;d love to hear about
                it.
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
