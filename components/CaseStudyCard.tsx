import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { clsx } from 'clsx'

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
  metaLabel?: string
  summary?: string
  keyFocus?: string[]
  productName?: string
  caseStudyTitle?: string
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
            alt={`${title} cover`}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
