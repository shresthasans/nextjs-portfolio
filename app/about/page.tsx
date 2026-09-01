import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Award, MapPin, ArrowRight } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { CUA_VERIFY_URL } from '@/lib/constants'
import { getBlurDataURL } from '@/lib/blur-data'
import { getPersonSchema } from '@/lib/person-schema'

export const metadata: Metadata = {
  title: { absolute: 'About Sanjay Shrestha | Senior Product Designer' },
  description:
    'Senior Product Designer with 15+ years designing enterprise SaaS, B2B, and government digital products. CUA™ certified. Based in Kathmandu, Nepal.',
  alternates: {
    canonical: 'https://sanjayshrestha.com/about',
  },
  openGraph: {
    title: 'About Sanjay Shrestha | Senior Product Designer',
    description:
      'Senior Product Designer with 15+ years crafting enterprise software used by millions.',
    url: 'https://sanjayshrestha.com/about',
    images: ['/images/profile/sanjay.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Sanjay Shrestha | Senior Product Designer',
    description:
      'Senior Product Designer with 15+ years crafting enterprise software used by millions.',
    images: ['/images/profile/sanjay.webp'],
  },
}

const capabilities = [
  {
    title: 'Enterprise SaaS',
    description: 'Designing scalable products and workflows for enterprise teams.',
  },
  {
    title: 'AI Product Design',
    description: 'Creating AI-powered experiences that fit naturally into existing workflows.',
  },
  {
    title: 'Design Systems',
    description: 'Building reusable component libraries, design tokens and documentation from scratch.',
  },
  {
    title: 'Accessibility',
    description: 'Creating inclusive products that meet WCAG accessibility standards.',
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

const principles = [
  {
    title: 'Solve Before Styling',
    description: 'Beautiful interfaces matter only when they solve the right problem.',
  },
  {
    title: 'Design With Engineers',
    description: 'The best products are built through close collaboration, not handoffs.',
  },
  {
    title: 'Systems Over Screens',
    description: 'I focus on creating scalable systems instead of isolated interfaces.',
  },
]

const highlights: { title: string; description: string; href?: string }[] = [
  {
    title: 'Started in Startups',
    description: 'Built products end-to-end across UX, UI and front-end development.',
  },
  {
    title: 'Government Digital Services',
    description:
      "Designed public platforms used by millions of citizens while working with Microsoft's design team.",
  },
  {
    title: 'Enterprise SaaS',
    description:
      'Helped grow Decisions from fewer than 50 customers to over 5,000 enterprise organizations while leading product design initiatives.',
    href: '/work/decisions-ai-mobile-meeting-app',
  },
]

const timeline = [
  {
    year: '2019–Now',
    role: 'Sr. Product Designer & Product Manager',
    company: 'Decisions',
    location: 'Remote (Global)',
    description:
      'Joined early and scaled the product from under 50 to **5,000+ enterprise customers**, helping drive **$10M+ in ARR**.',
    highlights: [
      'Built the design system, design process, and UX function from scratch.',
      'Designed **Decisions**, an AI-powered meeting platform built for Microsoft Teams and Microsoft 365, now used across 50,000+ active meetings every week.',
      'Led generative AI design for **Decisions AI**, from concept through shipment.',
    ],
  },
  {
    year: '2016–2019',
    role: 'Product Designer',
    company: 'Webscale Networks (formerly MageMojo)',
    location: 'Remote (Santa Clara, US)',
    description: 'Joined MageMojo as the first dedicated designer.',
    highlights: [
      'Designed end-to-end UX for **Stratus MaaS**, a cloud SaaS platform for global eCommerce brands.',
      'Reduced support ticket volume by **40%** through interface redesign.',
      'Post-acquisition at Webscale, worked within an Agile team and built a component library that cut developer handoff errors by **35%**.',
    ],
  },
  {
    year: '2014–2016',
    role: 'UX Consultant',
    company: 'Microsoft',
    location: 'Hyderabad, India',
    description:
      "Embedded in Microsoft's design team, primarily on the **Singapore CPF digital portal**, a citizen-facing government platform serving **4M+ users**.",
    highlights: [
      'Delivered full WCAG 2.0 accessibility compliance.',
      'Also designed UX for Grant Thornton internal tools and Microsoft internal platforms.',
      'Received **Certificate of Appreciation** from Microsoft for contributions to the CPF project.',
    ],
  },
  {
    year: '2013–2014',
    role: 'UI-UX Designer / Sr. Front-End Developer',
    company: 'TQID',
    location: 'Kathmandu, Nepal',
    description:
      'Designed data-heavy enterprise software including a full sugar mill management system, and a subscription video coaching platform. Led UX research, interaction design, and front-end implementation. Mentored junior designers and introduced structured design QA processes.',
  },
  {
    year: '2012–2013',
    role: 'UX Consultant',
    company: 'Neudesic (an IBM Company)',
    location: 'Bangalore, India',
    description:
      'Delivered UX for .NET enterprise solutions for US-based clients. Designed dashboards, forms, and data-heavy workflow interfaces. Reduced iteration time **30%** by introducing rapid prototyping and design testing within Agile sprint cycles.',
  },
  {
    year: '2009–2012',
    role: 'UI/UX Designer & Front-End Developer',
    company: 'CrossOver Nepal · AndMine',
    location: 'Kathmandu, Nepal',
    description:
      'Early career across two studios. Delivered client websites for international SMEs, built responsive WordPress themes, and designed eCommerce and content sites. Handled design through to front-end implementation end-to-end.',
  },
]

function withBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-stone-900 dark:text-stone-50">
        {part}
      </strong>
    ) : (
      part
    )
  )
}

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: getPersonSchema({
      url: 'https://sanjayshrestha.com/about',
      image: 'https://sanjayshrestha.com/images/profile/sanjay.webp',
      description:
        'Senior Product Designer with 15+ years designing enterprise SaaS, B2B, and government digital products. CUA™ certified.',
    }),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sanjayshrestha.com/' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://sanjayshrestha.com/about' },
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
      <section className="pt-24 pb-20">
        <div className="container-portfolio">
          <AnimatedSection className="max-w-3xl">
            {/* Eyebrow + H1 render immediately, no entrance animation — H1 is the LCP element */}
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-4">
              About
            </p>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-[1.1] mb-8 text-balance">
              Designing products that millions depend on.
            </h1>
            
              <div className="flex items-center gap-1.5 text-sm text-stone-600 dark:text-stone-400">
                <MapPin size={13} aria-hidden="true" />
                <span>Kathmandu, Nepal</span>
              </div>
            </AnimatedSection>
        </div>
      </section>

      {/* Bio */}
      <section className="pb-24">
        <div className="container-portfolio">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <AnimatedSection className="lg:col-span-7 space-y-8 text-stone-600 dark:text-stone-400 leading-relaxed">
              <p>
                I&apos;m a Senior Product Designer with 15+ years designing enterprise SaaS,
                government and AI-powered products. I solve complex problems through
                user-centred design, across products used by millions of people and platforms
                used by thousands of organizations.
              </p>

              <p>
                My focus is simplicity, scalability and measurable product outcomes: building
                systems that hold up as products grow, not just interfaces that look good on
                day one.
              </p>

              <p className="font-heading font-semibold text-stone-900 dark:text-stone-100 text-base">
                Career highlights
              </p>

              <ul className="space-y-4">
                {highlights.map(({ title, description, href }) => (
                  <li key={title} className="flex gap-3">
                    <span
                      className="mt-2.5 w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="text-stone-900 dark:text-stone-100 font-semibold">
                        {title}:
                      </strong>{' '}
                      {description}
                      {href && (
                        <>
                          {' '}
                          <Link
                            href={href}
                            className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
                          >
                            View case study <ArrowRight size={12} aria-hidden="true" />
                          </Link>
                        </>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-sm font-medium text-stone-900 dark:text-stone-50 border-b border-stone-300 dark:border-stone-600 pb-0.5 hover:border-amber-700 dark:hover:border-amber-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors duration-200 cursor-pointer"
              >
                See selected case studies <ArrowRight size={14} aria-hidden="true" />
              </Link>

              <blockquote className="relative pl-6 border-l-4 border-amber-400 dark:border-amber-500">
                <p className="text-xl sm:text-2xl font-heading font-medium italic text-stone-700 dark:text-stone-300 leading-relaxed">
                  Four million citizens. Every interaction represented someone&apos;s reality.
                </p>
              </blockquote>

              <p className="text-sm">
                Outside of work you&apos;ll usually find me playing futsal, staying active at the
                gym, spending time with my family and my German Shepherd, Simba, or exploring the
                latest AI tools simply because I&apos;m curious about what&apos;s possible.
              </p>

              <p className="text-sm">
                I also write about product design, AI, and career growth on{' '}
                <Link
                  href="/blog"
                  className="text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
                >
                  the blog
                </Link>
                .
              </p>
            </AnimatedSection>

            <AnimatedSection className="lg:col-span-5" delay={0.2}>
              {/* Profile photo */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-8 border border-stone-200 dark:border-stone-800">
                <Image
                  src="/images/profile/sanjay.webp"
                  alt="Sanjay Shrestha, Senior Product Designer"
                  fill
                  className="object-cover"
                  priority
                  placeholder="blur"
                  blurDataURL={getBlurDataURL('/images/profile/sanjay.webp')}
                />
              </div>

              {/* CUA Callout */}
              <div className="rounded-2xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/70 dark:bg-amber-950/20 p-7 mb-8 flex flex-col items-center text-center space-y-5">
                <Image
                  src="/images/cua-badge.webp"
                  alt="CUA™ Certified Usability Analyst, Human Factors International"
                  width={100}
                  height={100}
                />
                <div className="space-y-2.5">
                  <div className="flex items-center justify-center gap-2">
                    <Award size={16} className="text-amber-700 dark:text-amber-400" aria-hidden="true" />
                    <p className="font-heading font-semibold text-amber-900 dark:text-amber-300 text-sm">
                      CUA™ Certified Usability Analyst
                    </p>
                  </div>
                  <p className="text-sm text-amber-800/80 dark:text-amber-400/80 leading-relaxed">
                    Certified by Human Factors International, the world leader in user-centred design
                    training. The CUA™ credential requires demonstrated expertise in usability testing,
                    interaction design, and accessible design practices.
                  </p>
                  <a
                    href={CUA_VERIFY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-amber-800 dark:text-amber-300 underline underline-offset-2 hover:text-amber-900 dark:hover:text-amber-200"
                  >
                    Verify credential
                  </a>
                </div>
              </div>

              {/* Quick facts */}
              <div className="space-y-5">
                {[
                  { label: 'Experience', value: '15+ years' },
                  { label: 'Specialisation', value: 'Enterprise SaaS · B2B · Gov' },
                  { label: 'Current role', value: 'Sr. Designer & PM · Decisions' },
                  { label: 'Certification', value: 'CUA™ by Human Factors Intl.', href: CUA_VERIFY_URL },
                  { label: 'Based in', value: 'Kathmandu, Nepal' },
                  { label: 'Work style', value: 'Works remotely' },
                  { label: 'Contact', value: 'contact@sanjayshrestha.com' },
                ].map(({ label, value, href }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center py-3.5 border-b border-stone-200 dark:border-stone-800 last:border-0"
                  >
                    <span className="text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider">
                      {label}
                    </span>
                    <span className="text-sm text-stone-700 dark:text-stone-300 text-right max-w-[55%]">
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 hover:text-stone-900 dark:hover:text-stone-50"
                        >
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 bg-stone-100/50 dark:bg-stone-900/50 border-y border-stone-200 dark:border-stone-800">
        <div className="container-portfolio">
          <AnimatedSection className="mb-12">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">
              Capabilities
            </p>
            <h2 className="font-heading text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              Core Capabilities
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map(({ title, description }) => (
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
          <AnimatedSection className="mt-8">
            <Link
              href="/product-designer-nepal"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-700 dark:text-amber-400 hover:underline underline-offset-2"
            >
              See how this applies to product design work in Nepal
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Design Principles */}
      <section className="py-20">
        <div className="container-portfolio">
          <AnimatedSection className="mb-12">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">
              How I Work
            </p>
            <h2 className="font-heading text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              Design Principles
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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

      {/* Timeline */}
      <section className="py-24 bg-stone-100/50 dark:bg-stone-900/50 border-y border-stone-200 dark:border-stone-800">
        <div className="container-portfolio">
          <AnimatedSection className="mb-14">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">
              Experience
            </p>
            <h2 className="font-heading text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              Career Timeline
            </h2>
          </AnimatedSection>

          <StaggerContainer className="relative space-y-0">
            {/* Line */}
            <div
              className="absolute left-[9px] top-2 bottom-2 w-px bg-stone-200 dark:bg-stone-800 hidden sm:block"
              aria-hidden="true"
            />
            {timeline.map(({ year, role, company, location, description, highlights }) => (
              <StaggerItem key={year}>
                <div className="flex gap-8 sm:gap-12 pb-14">
                  <div className="sm:relative flex flex-col items-center">
                    <div
                      className="hidden sm:flex w-[18px] h-[18px] rounded-full bg-amber-600 dark:bg-amber-500 shrink-0 mt-1.5 z-10 ring-4 ring-stone-100/50 dark:ring-stone-900/50"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1.5">
                      {year}
                    </p>
                    <h3 className="font-heading font-semibold text-stone-900 dark:text-stone-50 text-lg mb-1">
                      {role}
                    </h3>
                    <p className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-2.5">
                      <strong className="font-semibold">{company}</strong> · {location}
                    </p>
                    <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-xl">
                      {withBold(description)}
                    </p>
                    {highlights && (
                      <ul className="mt-2.5 space-y-1.5 max-w-xl">
                        {highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex gap-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed"
                          >
                            <span className="text-amber-600 dark:text-amber-500 shrink-0" aria-hidden="true">
                              &middot;
                            </span>
                            <span>{withBold(highlight)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-800 dark:bg-stone-700 rounded-full mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-stone-300 font-medium">Based in Kathmandu, Nepal</span>
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-stone-50 tracking-tight max-w-xl mx-auto text-balance">
                Let&apos;s build something meaningful together.
              </h2>
              <p className="text-stone-400 max-w-2xl mx-auto">
                Whether you&apos;re building a new product, improving an existing experience, or
                exploring AI-powered workflows, I&apos;d love to hear what you&apos;re working on.
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
