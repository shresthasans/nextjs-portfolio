import type { Metadata } from 'next'
import Image from 'next/image'
import { Award, MapPin } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Senior Product Designer with 15+ years designing enterprise SaaS, B2B, and government digital products. CUA™ certified. Based in Kathmandu, Nepal.',
  openGraph: {
    title: 'About | Sanjay Shrestha',
    description:
      'Senior Product Designer with 15+ years crafting enterprise software used by millions.',
    url: 'https://sanjayshrestha.com/about',
  },
}

const skills = [
  { name: 'UX Strategy', description: 'User research, journey mapping, information architecture' },
  { name: 'Design Systems', description: 'Component libraries, tokens, cross-platform documentation' },
  { name: 'AI-Powered UX', description: 'Generative AI features, intelligent workflows, recap automation' },
  { name: 'Accessibility', description: 'WCAG 2.0/2.1, inclusive design, government-grade compliance' },
  { name: 'Mobile Design', description: 'iOS & Android, React Native, native platform patterns' },
  { name: 'Product Management', description: 'Roadmap planning, sprint facilitation, stakeholder alignment' },
  { name: 'Interaction Design', description: 'Prototyping, user flows, high-fidelity mockups' },
  { name: 'Figma', description: 'Advanced prototyping, auto-layout, variables, component APIs' },
  { name: 'HTML / CSS', description: 'Production front-end, semantic markup, responsive implementation' },
]

const timeline = [
  {
    year: '2019–Now',
    role: 'Sr. Product Designer & Product Manager',
    company: 'Decisions',
    location: 'Remote (Global)',
    description:
      'Joined early and scaled the product from under 50 to 5,000+ enterprise customers, helping drive $10M+ in ARR. Built the design system, design process, and UX function from scratch. Designing the Microsoft Teams and Office 365 meeting platform that now powers 50,000+ active meetings every week. Led generative AI design for Decisions AI, from concept through shipment.',
  },
  {
    year: '2016–2019',
    role: 'Product Designer',
    company: 'Webscale Networks (formerly MageMojo)',
    location: 'Remote (Santa Clara, US)',
    description:
      'Joined MageMojo as the first dedicated designer. Designed end-to-end UX for Mojo Stratus, a cloud SaaS platform for global eCommerce brands. Reduced support ticket volume by 40% through interface redesign. Post-acquisition at Webscale, worked within an Agile team and built a component library that cut developer handoff errors by 35%.',
  },
  {
    year: '2014–2016',
    role: 'UX Consultant',
    company: 'Microsoft',
    location: 'Hyderabad, India',
    description:
      'Embedded in Microsoft\'s design team. Primary engagement was the Singapore CPF digital portal, a citizen-facing government platform serving 4M+ users. Delivered full WCAG 2.0 accessibility compliance. Also designed UX for Grant Thornton internal tools and Microsoft internal platforms. Received Certificate of Appreciation from Microsoft for contributions to the CPF project.',
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
      'Delivered UX for .NET enterprise solutions for US-based clients. Designed dashboards, forms, and data-heavy workflow interfaces. Reduced iteration time 30% by introducing rapid prototyping and design testing within Agile sprint cycles.',
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

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-20">
        <div className="container-portfolio">
          <AnimatedSection className="max-w-3xl">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-4">
              About
            </p>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-[1.1] mb-8 text-balance">
              15 years of designing products people actually use.
            </h1>
            <div className="flex items-center gap-1.5 text-sm text-stone-600 dark:text-stone-400">
              <MapPin size={13} aria-hidden="true" />
              <span>Kathmandu, Nepal · Open to remote opportunities and relocation</span>
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
                I started my design career in Kathmandu when the web was still finding its footing. What
                began as designing websites for local businesses quickly turned into something much
                bigger:{' '}
                <mark>understanding people, solving complex problems, and building products that make
                everyday work simpler.</mark>
              </p>

              <p>
                Along the way, I&apos;ve had the opportunity to design across startups, enterprise
                software, and AI-powered products, collaborating with global teams while staying grounded
                in user needs.
              </p>

              <p className="font-heading font-semibold text-stone-900 dark:text-stone-100 text-base">
                A few chapters from the journey
              </p>

              <ul className="space-y-3">
                {[
                  <>
                    <strong className="text-stone-900 dark:text-stone-100 font-semibold">Kathmandu → Bangalore → Hyderabad</strong> —
                    Designed enterprise software for US clients before joining{' '}
                    <strong className="text-stone-900 dark:text-stone-100 font-semibold">Microsoft&apos;s</strong> design team.
                  </>,
                  <>
                    <strong className="text-stone-900 dark:text-stone-100 font-semibold">MageMojo → Webscale Networks</strong> —
                    Joined as the company&apos;s only product designer and rebuilt the SaaS platform UX
                    from the ground up.
                  </>,
                  <>
                    <strong className="text-stone-900 dark:text-stone-100 font-semibold">Decisions (2019–Present)</strong> —
                    Joined as an early product designer when the platform served fewer than 50 customers.
                    Since then, I&apos;ve helped scale the product to over{' '}
                    <strong className="text-stone-900 dark:text-stone-100 font-semibold">5,000 customer organizations</strong>,
                    contributing to a platform that reaches{' '}
                    <strong className="text-stone-900 dark:text-stone-100 font-semibold">48,000+ monthly active users</strong>,
                    powers{' '}
                    <strong className="text-stone-900 dark:text-stone-100 font-semibold">50,000+ meetings every week</strong>, and
                    supports a business generating{' '}
                    <strong className="text-stone-900 dark:text-stone-100 font-semibold">$10M+ in annual recurring revenue</strong>.
                  </>,
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="mt-2.5 w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <blockquote className="relative pl-6 border-l-4 border-amber-400 dark:border-amber-500">
                <p className="text-xl sm:text-2xl font-heading font-medium italic text-stone-700 dark:text-stone-300 leading-relaxed">
                  Four million citizens. Every interaction mattered. Every edge case represented
                  someone&apos;s reality.
                </p>
              </blockquote>

              <p>
                That was the Singapore Central Provident Fund portal, my most impactful project during my
                time with Microsoft. It fundamentally changed how I think about accessibility, scale, and
                designing for millions of people.
              </p>

              <p>Since then, I&apos;ve carried that mindset into every product I work on.</p>

              <p>
                At Decisions, I&apos;ve{' '}
                <strong className="text-stone-900 dark:text-stone-100 font-semibold">built and evolved
                the design system</strong>, established the product design process, led the UX for
                Decisions AI, and partnered closely with product managers and engineers to shape product
                strategy. Beyond designing interfaces, I&apos;ve helped define how design contributes to
                the business.
              </p>

              <p>
                I hold the{' '}
                <strong className="text-stone-900 dark:text-stone-100 font-semibold">
                  Certified Usability Analyst (CUA™) certification from Human Factors International
                </strong>
                , one of the industry&apos;s most respected usability credentials. It strengthened the
                user-centered principles that have guided my work throughout my career.
              </p>

              <p className="text-sm">
                Outside of work, I stay active through futsal, indoor cricket, and fitness, enjoy
                exploring new places with my family, spend plenty of time with my German Shepherd, Simba,
                and satisfy my curiosity by experimenting with the latest AI tools and emerging
                technologies.
              </p>
            </AnimatedSection>

            <AnimatedSection className="lg:col-span-5" delay={0.2}>
              {/* Profile photo */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-8 border border-stone-200 dark:border-stone-800">
                <Image
                  src="/images/profile/sanjay.png"
                  alt="Sanjay Shrestha, Senior Product Designer"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* CUA Callout */}
              <div className="rounded-2xl border border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/20 p-6 mb-8 flex flex-col items-center text-center space-y-4">
                <Image
                  src="/images/cua-badge.png"
                  alt="CUA™ Certified Usability Analyst, Human Factors International"
                  width={100}
                  height={100}
                />
                <div className="space-y-2">
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
                </div>
              </div>

              {/* Quick facts */}
              <div className="space-y-4">
                {[
                  { label: 'Experience', value: '15+ years' },
                  { label: 'Specialisation', value: 'Enterprise SaaS · B2B · Gov' },
                  { label: 'Current role', value: 'Sr. Designer & PM · Decisions' },
                  { label: 'Certification', value: 'CUA™ by Human Factors Intl.' },
                  { label: 'Based in', value: 'Kathmandu, Nepal' },
                  { label: 'Open to', value: 'Global remote · Relocation' },
                  { label: 'Contact', value: 'contact@sanjayshrestha.com' },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center py-3 border-b border-stone-200 dark:border-stone-800 last:border-0"
                  >
                    <span className="text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider">
                      {label}
                    </span>
                    <span className="text-sm text-stone-700 dark:text-stone-300 text-right max-w-[55%]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 bg-stone-100/50 dark:bg-stone-900/50 border-y border-stone-200 dark:border-stone-800">
        <div className="container-portfolio">
          <AnimatedSection className="mb-12">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">
              Capabilities
            </p>
            <h2 className="font-heading text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              Skills &amp; Expertise
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map(({ name, description }) => (
              <StaggerItem key={name}>
                <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 p-5 space-y-2">
                  <h3 className="font-heading font-semibold text-stone-900 dark:text-stone-50 text-base">
                    {name}
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400">{description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
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
              className="absolute left-[7px] top-2 bottom-2 w-px bg-stone-200 dark:bg-stone-800 hidden sm:block"
              aria-hidden="true"
            />
            {timeline.map(({ year, role, company, location, description }) => (
              <StaggerItem key={year}>
                <div className="flex gap-8 sm:gap-12 pb-10">
                  <div className="sm:relative flex flex-col items-center">
                    <div
                      className="hidden sm:flex w-3.5 h-3.5 rounded-full bg-amber-600 dark:bg-amber-500 shrink-0 mt-1.5 z-10"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1">
                      {year}
                    </p>
                    <h3 className="font-heading font-semibold text-stone-900 dark:text-stone-50 text-lg">
                      {role}
                    </h3>
                    <p className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-1">
                      {company} · {location}
                    </p>
                    <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl">
                      {description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  )
}
