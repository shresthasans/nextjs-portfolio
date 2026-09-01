import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { clsx } from 'clsx'
import AnimatedSection from '@/components/AnimatedSection'
import MediaFrame from '@/components/MediaFrame'
import { getBlurDataURL } from '@/lib/blur-data'

export interface CaseStudy {
  slug: string
  title: string
  client: string
  role: string
  outcome: string
  type: 'Enterprise' | 'Government' | 'SaaS' | 'eCommerce'
  year: string
  featured?: boolean
  coverImage?: string
  imageAlt?: string
  metaLabel?: string
  summary?: string
  keyFocus?: string[]
  productName?: string
  caseStudyTitle?: string
  stats?: { value: string; label: string }[]
  relatedBlogSlugs?: string[]
}

const typeColors: Record<CaseStudy['type'], string> = {
  Enterprise:
    'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/50',
  Government:
    'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/50',
  SaaS: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/50',
  eCommerce:
    'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/50',
}

export default function CaseStudyCard({
  slug,
  title,
  client,
  role,
  outcome,
  type,
  year,
  featured = false,
  coverImage,
  imageAlt,
}: CaseStudy) {
  return (
    <Link
      href={`/work/${slug}`}
      className={clsx(
        'group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer',
        'border-stone-200 dark:border-stone-800',
        'hover:border-stone-300 dark:hover:border-stone-700',
        'hover:shadow-lg dark:hover:shadow-stone-950/50',
        'bg-white dark:bg-stone-900/50'
      )}
      aria-label={`View case study: ${title}`}
    >
      {/* Thumbnail */}
      <div
        className={clsx(
          'relative w-full overflow-hidden',
          featured ? 'h-72' : 'h-48'
        )}
      >
        {coverImage ? (
          <Image
            src={coverImage}
            alt={imageAlt ?? `${title} interface screenshot`}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder={getBlurDataURL(coverImage) ? 'blur' : 'empty'}
            blurDataURL={getBlurDataURL(coverImage)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-900 flex items-center justify-center">
            <div className="text-center space-y-2 opacity-40">
              <div className="w-12 h-1 bg-stone-400 dark:bg-stone-600 rounded mx-auto" />
              <div className="w-8 h-1 bg-stone-400 dark:bg-stone-600 rounded mx-auto" />
              <div className="w-10 h-1 bg-stone-400 dark:bg-stone-600 rounded mx-auto" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 dark:group-hover:bg-stone-50/5 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider">
              {client} · {year}
            </p>
            <h3 className="font-heading font-semibold text-stone-900 dark:text-stone-50 text-lg leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-200">
              {title}
            </h3>
          </div>
          <ArrowUpRight
            size={18}
            className="shrink-0 mt-0.5 text-stone-300 dark:text-stone-600 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-200"
            aria-hidden="true"
          />
        </div>

        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed flex-1">
          {outcome}
        </p>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
          <span
            className={clsx(
              'inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border',
              typeColors[type]
            )}
          >
            {type}
          </span>
          <span className="text-xs text-stone-600 dark:text-stone-400">{role}</span>
        </div>
      </div>
    </Link>
  )
}

const typeVisualBg: Record<CaseStudy['type'], string> = {
  Enterprise: 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-950/70 dark:to-blue-900/50',
  Government: 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-950/70 dark:to-purple-900/50',
  SaaS: 'bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-950/70 dark:to-amber-900/50',
  eCommerce: 'bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-950/70 dark:to-emerald-900/50',
}

function VisualBlock({ study }: { study: CaseStudy }) {
  if (study.coverImage) {
    return (
      <MediaFrame aspectRatio="aspect-[16/9]" padded={false}>
        <div className="relative w-full h-full">
          <Image
            src={study.coverImage}
            alt={study.imageAlt ?? `${study.productName ?? study.title} interface screenshot`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 62vw"
            placeholder={getBlurDataURL(study.coverImage) ? 'blur' : 'empty'}
            blurDataURL={getBlurDataURL(study.coverImage)}
          />
        </div>
      </MediaFrame>
    )
  }

  return (
    <MediaFrame aspectRatio="aspect-[16/9]" padded={false}>
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

export function CaseStudyRow({ study, index }: { study: CaseStudy; index: number }) {
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
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
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
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400 mb-2.5">
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

          {study.stats && study.stats.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400 mb-2.5">
                By the Numbers
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {study.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="font-heading font-bold text-2xl leading-none text-stone-900 dark:text-stone-50">
                      {stat.value}
                    </span>
                    <span className="mt-1 text-xs text-stone-500 dark:text-stone-400">{stat.label}</span>
                  </div>
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
