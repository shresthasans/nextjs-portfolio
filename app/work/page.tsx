import Link from 'next/link'
import Image from 'next/image'
import AnimatedSection from '@/components/AnimatedSection'
import MediaFrame from '@/components/MediaFrame'
import { CaseStudy } from '@/components/CaseStudyCard'
import { clsx } from 'clsx'
import { allWork } from '@/lib/work-data'
import { ArrowUpRight } from 'lucide-react'

const typeVisualBg: Record<CaseStudy['type'], string> = {
  Enterprise: 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-950/70 dark:to-blue-900/50',
  Government: 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-950/70 dark:to-purple-900/50',
  SaaS: 'bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-950/70 dark:to-amber-900/50',
  eCommerce: 'bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-950/70 dark:to-emerald-900/50',
}

function VisualBlock({ study }: { study: CaseStudy }) {
  if (study.coverImage) {
    return (
      <MediaFrame aspectRatio="aspect-[1.618/1]" padded={false}>
        <div className="relative w-full h-full">
          <Image
            src={study.coverImage}
            alt={`${study.title} cover`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 62vw"
            unoptimized
          />
        </div>
      </MediaFrame>
    )
  }

  return (
    <MediaFrame aspectRatio="aspect-[1.618/1]" padded={false}>
      <div className={clsx('absolute inset-0', typeVisualBg[study.type])} />
      <svg
        viewBox="0 0 600 400"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <circle cx="500" cy="80" r="140" fill="white" fillOpacity="0.07" />
        <circle cx="100" cy="340" r="110" fill="white" fillOpacity="0.05" />
        <rect x="80" y="100" width="200" height="140" rx="14" fill="white" fillOpacity="0.09" />
        <rect x="100" y="122" width="90" height="18" rx="5" fill="white" fillOpacity="0.28" />
        <rect x="100" y="148" width="140" height="11" rx="3" fill="white" fillOpacity="0.16" />
        <rect x="100" y="166" width="110" height="11" rx="3" fill="white" fillOpacity="0.11" />
        <rect x="100" y="192" width="68" height="28" rx="7" fill="white" fillOpacity="0.22" />
        <rect x="330" y="160" width="180" height="110" rx="14" fill="white" fillOpacity="0.07" />
        <rect x="350" y="182" width="70" height="11" rx="3" fill="white" fillOpacity="0.2" />
        <rect x="350" y="200" width="130" height="9" rx="2" fill="white" fillOpacity="0.12" />
        <rect x="350" y="216" width="105" height="9" rx="2" fill="white" fillOpacity="0.09" />
        <path d="M160 300 L260 240 L360 270 L460 200" stroke="white" strokeOpacity="0.18" strokeWidth="1.5" fill="none" strokeDasharray="7 5" />
        <circle cx="160" cy="300" r="4.5" fill="white" fillOpacity="0.38" />
        <circle cx="260" cy="240" r="4.5" fill="white" fillOpacity="0.38" />
        <circle cx="360" cy="270" r="4.5" fill="white" fillOpacity="0.38" />
        <circle cx="460" cy="200" r="6" fill="white" fillOpacity="0.65" />
      </svg>
      <div className="absolute bottom-6 left-7">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/50 select-none">
          {study.type}
        </span>
      </div>
    </MediaFrame>
  )
}

function WorkRow({ study, index }: { study: CaseStudy; index: number }) {
  const imageRight = index % 2 !== 0

  return (
    <AnimatedSection delay={index * 0.05}>
      <Link
        href={`/work/${study.slug}`}
        aria-label={`Read case study: ${study.title}`}
        className={clsx(
          'group flex flex-col gap-0 cursor-pointer',
          'lg:grid lg:items-center lg:gap-x-12 xl:gap-x-16',
          imageRight
            ? 'lg:grid-cols-[minmax(0,3fr)_minmax(0,4fr)]'
            : 'lg:grid-cols-[minmax(0,4fr)_minmax(0,3fr)]'
        )}
      >
        {/* Visual — always the 4fr track, position set by DOM order (not `order`, which would decouple visual position from grid track sizing) */}
        <div className={clsx('w-full', imageRight && 'lg:col-start-2 lg:row-start-1')}>
          <VisualBlock study={study} />
        </div>

        {/* Content — always the 3fr track */}
        <div
          className={clsx(
            'flex flex-col justify-center gap-5 py-12',
            imageRight && 'lg:col-start-1 lg:row-start-1'
          )}
        >
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-stone-400 dark:text-stone-500">
            {study.metaLabel ?? `${study.type} · ${study.year}`}
          </p>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-stone-500 dark:text-stone-400">
              {study.productName ?? study.title}
            </p>
            <h2
              className="font-heading font-bold text-stone-900 dark:text-stone-50 leading-tight text-balance group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-200"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
            >
              {study.caseStudyTitle ?? study.title}
            </h2>
          </div>

          <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed max-w-sm">
            {study.summary ?? study.outcome}
          </p>

          {study.keyFocus && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-400 dark:text-stone-500 mb-2.5">
                Key Focus
              </p>
              <div className="flex flex-wrap gap-2">
                {study.keyFocus.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          <span className="inline-flex items-center gap-1.5 mt-3 w-fit text-sm font-semibold text-stone-800 dark:text-stone-200 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-200">
            Explore Case Study
            <ArrowUpRight size={14} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </AnimatedSection>
  )
}

export default function WorkPage() {
  return (
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
            <WorkRow key={study.slug} study={study} index={idx} />
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
  )
}
