'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MapPin, Award } from 'lucide-react'
import { useState, useEffect, ReactNode } from 'react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { CaseStudyRow } from '@/components/CaseStudyCard'
import BlogCard, { BlogPost } from '@/components/BlogCard'
import { allWork } from '@/lib/work-data'
import { CUA_VERIFY_URL } from '@/lib/constants'
import { clients } from '@/lib/clients'
import { homeFaqs } from '@/lib/home-faqs'
import FAQAccordion from '@/components/FAQAccordion'

const FEATURED_SLUGS = ['decisions-ai-mobile-meeting-app', 'linkedin-feed-redesign', 'streamshare-streaming-app-design']

const featuredWork = FEATURED_SLUGS
  .map((slug) => allWork.find((w) => w.slug === slug))
  .filter(Boolean)

const expertise = [
  {
    title: 'Enterprise SaaS',
    description: 'Designing complex workflows and productivity platforms for enterprise teams.',
  },
  {
    title: 'AI Product Design',
    description: 'Designing AI-powered experiences that simplify complex workflows.',
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

const heroPhrase = ['simple, scalable', 'intuitive, clear', 'elegant, focused', 'human-centered']

const faqLinkClass =
  'underline underline-offset-2 text-stone-900 dark:text-stone-50 hover:text-amber-700 dark:hover:text-amber-400'

const homeFaqOverrides: Record<string, ReactNode> = {
  'What types of companies do you work with?': (
    <>
      Mostly enterprise SaaS companies, AI product teams and organizations building government or
      citizen-facing platforms. Clients have included Microsoft, Decisions and other B2B software
      teams designing complex, data-heavy products — see{' '}
      <Link href="/work" className={faqLinkClass}>
        selected work
      </Link>
      .
    </>
  ),
  'What does your product-design process include?': (
    <>
      End-to-end product design: user research and discovery, product strategy, information
      architecture, interaction design and UI, plus accessibility review and close collaboration
      with engineering through handoff.{' '}
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

interface LatestPost {
  slug: string
  title: string
  excerpt: string
  tag: BlogPost['tag']
  date: string
  readingTime: string
  coverImage?: string
}

export default function HomePageClient({ latestPosts = [] }: { latestPosts?: LatestPost[] }) {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const t = setInterval(() => setPhraseIdx(i => (i + 1) % heroPhrase.length), 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* ── Animated Background ──────────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Base */}
          <div className="absolute inset-0 bg-stone-50 dark:bg-stone-950" />

          {/* Orb 1 — top-right amber bloom */}
          <motion.div
            className="absolute -top-40 -right-40 w-[750px] h-[750px] rounded-full"
            style={{ background: 'radial-gradient(circle at 40% 40%, rgba(217,119,6,0.14) 0%, rgba(180,83,9,0.06) 45%, transparent 70%)' }}
            animate={{ scale: [1, 1.12, 1], rotate: [0, 12, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Orb 2 — lower-left stone warm */}
          <motion.div
            className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(120,113,108,0.10) 0%, transparent 68%)' }}
            animate={{ scale: [1, 0.88, 1], x: [0, 24, 0], y: [0, -16, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          />

          {/* Orb 3 — mid amber accent */}
          <motion.div
            className="absolute top-1/2 right-1/4 w-[380px] h-[380px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(202,138,4,0.09) 0%, transparent 65%)' }}
            animate={{ scale: [1, 1.18, 1], y: [0, -28, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
          />

          {/* Decorative rings — slow rotate, top-right */}
          <motion.div
            className="absolute -top-24 right-4 lg:right-12 w-[520px] h-[520px] rounded-full border border-amber-400/15 dark:border-amber-600/10"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute top-4 right-16 lg:right-24 w-[380px] h-[380px] rounded-full border border-stone-300/20 dark:border-stone-600/15"
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute top-24 right-28 lg:right-36 w-[240px] h-[240px] rounded-full border border-amber-300/20 dark:border-amber-700/10"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />

          {/* Floating accent dot cluster — top-right inner */}
          {[
            { cx: 'right-[18%]', cy: 'top-[22%]', size: 'w-1.5 h-1.5', delay: 0 },
            { cx: 'right-[22%]', cy: 'top-[34%]', size: 'w-1 h-1', delay: 1.5 },
            { cx: 'right-[12%]', cy: 'top-[40%]', size: 'w-2 h-2', delay: 3 },
            { cx: 'right-[28%]', cy: 'top-[18%]', size: 'w-1 h-1', delay: 2 },
          ].map(({ cx, cy, size, delay }, i) => (
            <motion.div
              key={i}
              className={`absolute ${cx} ${cy} ${size} rounded-full bg-amber-400/30 dark:bg-amber-500/20`}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay }}
            />
          ))}

          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.022] dark:opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle, #78716c 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />

          {/* Bottom vignette — text readability */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-stone-50 via-stone-50/80 to-transparent dark:from-stone-950 dark:via-stone-950/80" />
          {/* Left vignette */}
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-stone-50/60 to-transparent dark:from-stone-950/60" />
        </div>

        {/* ── Hero Content — Bento Split ───────────────────────────── */}
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20 py-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-12 xl:gap-20 items-center">

              {/* ── Left: Text ─────────────────────────────────────────── */}
              <div>
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="inline-flex items-center gap-2 mb-7 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-full"
                >
                  <Award size={13} className="text-amber-700 dark:text-amber-400" aria-hidden="true" />
                  <a
                    href={CUA_VERIFY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-amber-800 dark:text-amber-300 hover:underline underline-offset-2"
                  >
                    CUA™ Certified · Human Factors International
                  </a>
                </motion.div>

                {/* Headline with cycling highlight — no entrance animation: this is the LCP element,
                    so it must paint at opacity:1 immediately instead of waiting on JS/motion */}
                <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold text-stone-900 dark:text-stone-50 leading-[1.06] tracking-tight mb-7">
                  I turn complex{' '}challenges into{' '}
                  <span className="inline-block">
                    {mounted ? (
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={heroPhrase[phraseIdx]}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -14 }}
                          transition={{ duration: 0.36, ease: [0.21, 0.47, 0.32, 0.98] }}
                          className="inline-block text-amber-700 dark:text-amber-400"
                        >
                          {heroPhrase[phraseIdx]}
                        </motion.span>
                      </AnimatePresence>
                    ) : (
                      <span className="inline-block text-amber-700 dark:text-amber-400">
                        {heroPhrase[0]}
                      </span>
                    )}
                  </span>{' '}
                  user experiences.
                </h1>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.28, ease: 'easeOut' }}
                  className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-10 max-w-[48ch]"
                >
                  I&rsquo;m Sanjay Shrestha, a senior product designer specializing in enterprise SaaS,
                  AI-powered products and accessible design systems. Based in Kathmandu and working
                  with distributed teams worldwide.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.42, ease: 'easeOut' }}
                  className="flex flex-row gap-3"
                >
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-stone-900 dark:bg-stone-50 text-stone-50 dark:text-stone-900 rounded-lg font-medium text-sm hover:bg-amber-700 dark:hover:bg-amber-400 transition-colors duration-200 cursor-pointer whitespace-nowrap"
                  >
                    View My Work
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-lg font-medium text-sm hover:bg-stone-100 dark:hover:bg-stone-800 hover:border-stone-300 dark:hover:border-stone-600 transition-colors duration-200 cursor-pointer whitespace-nowrap"
                  >
                    Get In Touch
                  </Link>
                </motion.div>
              </div>

              {/* ── Right: Achievement cards (lg+) ────────────────── */}
              <div className="hidden lg:flex flex-col gap-3" aria-hidden="true">

                {[
                  { value: '15+', title: 'Years of Experience', text: 'Enterprise SaaS • AI • Government' },
                  { value: '4M+', title: 'People Reached', text: "Across products I've designed" },
                  { value: '3+', title: 'Cross-platform Design Systems', text: 'Built from scratch' },
                ].map(({ value, title, text }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.35 + i * 0.1, ease: 'easeOut' }}
                    className="bg-white/70 dark:bg-stone-900/60 backdrop-blur-xl border border-stone-200/60 dark:border-stone-700/40 rounded-2xl p-6 shadow-sm hover:shadow-md hover:bg-white/90 dark:hover:bg-stone-900/80 transition-all duration-300"
                  >
                    <p className="font-heading text-4xl font-black text-amber-700 dark:text-amber-400 leading-none mb-2">{value}</p>
                    <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 mb-1">{title}</p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 leading-snug">{text}</p>
                  </motion.div>
                ))}

                {/* Card: Availability */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.65, ease: 'easeOut' }}
                  className="bg-stone-900 dark:bg-stone-800 border border-stone-800 dark:border-stone-700 rounded-2xl px-5 py-4 shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="text-sm font-medium text-stone-100">Based in Kathmandu, Nepal</span>
                  </div>
                  <MapPin size={14} className="text-stone-500 shrink-0" aria-hidden="true" />
                </motion.div>

              </div>
            </div>
          </div>
        </div>
      </section>

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
              Trusted by
            </p>
          </AnimatedSection>
          <StaggerContainer className="flex flex-wrap items-center justify-center gap-10 sm:gap-14">
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
        </div>
      </section>

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
                  priority
                  className="object-cover"
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
