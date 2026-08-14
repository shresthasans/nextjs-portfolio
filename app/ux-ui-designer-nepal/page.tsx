import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import Breadcrumbs from '@/components/Breadcrumbs'
import CaseStudyCard from '@/components/CaseStudyCard'
import { allWork } from '@/lib/work-data'

export const metadata: Metadata = {
  title: 'UX/UI Designer in Nepal',
  description:
    'UX/UI designer in Nepal covering the full process — user research, strategy and information architecture through to interface design. Case studies from Pagevamp, LinkedIn and Streamshare.',
  alternates: {
    canonical: 'https://sanjayshrestha.com/ux-ui-designer-nepal',
  },
  openGraph: {
    title: 'UX/UI Designer in Nepal | Sanjay Shrestha',
    description:
      'UX/UI designer in Nepal covering the full process — user research, strategy and information architecture through to interface design. Case studies from Pagevamp, LinkedIn and Streamshare.',
    url: 'https://sanjayshrestha.com/ux-ui-designer-nepal',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UX/UI Designer in Nepal | Sanjay Shrestha',
    description:
      'UX/UI designer in Nepal covering the full process — user research, strategy and information architecture through to interface design. Case studies from Pagevamp, LinkedIn and Streamshare.',
    images: ['/og-image.jpg'],
  },
}

const EVIDENCE_SLUGS = ['pagevamp-onboarding-redesign', 'linkedin-feed-redesign', 'streamshare-streaming-app-design']

const caseStudies = EVIDENCE_SLUGS
  .map((slug) => allWork.find((w) => w.slug === slug))
  .filter((study): study is (typeof allWork)[number] => Boolean(study))

const process = [
  {
    step: '01',
    title: 'Research & Usability Testing',
    description:
      'Starting with the people who use the product, not the screen. Interviews, competitive audits and moderated usability tests surface what’s actually breaking, before any redesign decision gets made.',
  },
  {
    step: '02',
    title: 'Information Architecture',
    description:
      'Mapping how content and features should be organized so the structure matches how people actually think about the task, not how the org chart happens to be arranged.',
  },
  {
    step: '03',
    title: 'Interaction & Interface Design',
    description:
      'Designing the flows, states and visual system together — hierarchy, spacing and typography aren’t decoration, they’re how a screen tells someone what matters and what to do next.',
  },
  {
    step: '04',
    title: 'Accessibility',
    description:
      'Checking contrast, focus order, semantics and screen-reader behavior as part of the design, not a QA pass bolted on afterward — built to WCAG standards by default.',
  },
  {
    step: '05',
    title: 'Prototyping',
    description:
      'Building interactive prototypes real enough to test — validating a flow with actual users before it costs engineering time to build the wrong thing.',
  },
]

export default function UxUiDesignerNepalPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      '@id': 'https://sanjayshrestha.com/#person',
      name: 'Sanjay Shrestha',
      jobTitle: 'UX/UI Designer',
      url: 'https://sanjayshrestha.com/ux-ui-designer-nepal',
      image: 'https://sanjayshrestha.com/images/profile/sanjay.webp',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kathmandu',
        addressCountry: 'NP',
      },
      description:
        'UX/UI designer based in Kathmandu, Nepal, combining user research, information architecture and interface design for enterprise SaaS and consumer products.',
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
        name: 'UX/UI Designer in Nepal',
        item: 'https://sanjayshrestha.com/ux-ui-designer-nepal',
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
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'UX/UI Designer in Nepal' }]} />
          <AnimatedSection className="max-w-3xl">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-4">
              UX/UI Design
            </p>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-[1.1] mb-6 text-balance">
              UX/UI Design for Complex Digital Products
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              I&apos;m a UX/UI designer based in Kathmandu, Nepal — whether a project is searching
              for a UX designer to fix a broken flow or a UI designer to bring a system to a
              product, the work I do covers both, because on most real products the two aren&apos;t
              separable. Getting the structure and logic right (UX) is what makes the interface
              (UI) actually usable, not just presentable.
            </p>
            <p className="mt-4 text-sm text-stone-500 dark:text-stone-400">
              Looking for broader product design and strategy work? See my{' '}
              <Link
                href="/product-designer-nepal"
                className="text-amber-700 dark:text-amber-400 underline underline-offset-2 hover:no-underline"
              >
                product designer profile
              </Link>
              .
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* What distinguishes UX from visual-only UI */}
      <section className="py-16 border-y border-stone-200 dark:border-stone-800">
        <div className="container-portfolio">
          <AnimatedSection className="max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight mb-4">
              UX work, not just visual polish
            </h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              A lot of what gets labeled &ldquo;UI design&rdquo; is really just visual styling
              applied to an existing structure — better colors and spacing on the same flow. That
              can make a screen look better without making it work better. My process starts one
              layer earlier: understanding why users get stuck, mapping the information structure
              that&apos;s causing the confusion, then designing the interface on top of a structure
              that&apos;s already been tested and validated. The LinkedIn feed audit below is a
              direct example — fourteen findings, and none of them were about color.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container-portfolio">
          <AnimatedSection className="mb-12">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">
              How I Work
            </p>
            <h2 className="font-heading text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              My UX Process
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map(({ step, title, description }) => (
              <StaggerItem key={title}>
                <div className="h-full p-6 bg-white/70 dark:bg-stone-900/60 backdrop-blur-xl border border-stone-200/60 dark:border-stone-700/40 rounded-2xl shadow-sm hover:shadow-md hover:bg-white/90 dark:hover:bg-stone-900/80 transition-all duration-300">
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-400 tracking-widest mb-3">
                    {step}
                  </p>
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

      {/* Evidence */}
      <section className="py-20 bg-stone-100/50 dark:bg-stone-900/50 border-y border-stone-200 dark:border-stone-800">
        <div className="container-portfolio">
          <AnimatedSection className="mb-12 max-w-3xl">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">
              Evidence
            </p>
            <h2 className="font-heading text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight mb-4">
              UX Process in Practice
            </h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              Three projects that show research, structure and interface decisions working
              together: a UX audit that rebuilt LinkedIn&apos;s feed hierarchy around one rule, an
              onboarding redesign for Pagevamp that lifted signups 30% by fixing a broken first
              five minutes, and a Streamshare concept built on five real user interviews rather
              than assumption.
            </p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study) => (
              <StaggerItem key={study.slug}>
                <CaseStudyCard {...study} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-portfolio">
          <AnimatedSection>
            <div className="rounded-3xl bg-stone-900 dark:bg-stone-800 p-12 sm:p-16 text-center space-y-6">
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-stone-50 tracking-tight max-w-xl mx-auto text-balance">
                Have a UX problem worth solving properly?
              </h2>
              <p className="text-stone-400 max-w-2xl mx-auto">
                Whether it&apos;s a confusing flow, an inconsistent interface, or a product that
                needs research before it needs a redesign, I&apos;d love to hear about it.
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
