import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Clock } from 'lucide-react'
import { clsx } from 'clsx'
import TagGraphic from './TagGraphic'

export interface BlogPost {
  slug: string
  title: string
  date: string
  readingTime: string
  tag: 'UX' | 'Design Systems' | 'AI' | 'Career'
  excerpt: string
  coverImage?: string
  series?: string
  seriesPart?: number
  seriesTotal?: number
  seriesCoverImage?: string
}

const tagPillColors: Record<BlogPost['tag'], string> = {
  UX: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/50',
  'Design Systems':
    'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/50',
  AI: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/50',
  Career:
    'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/50',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function BlogCard({ slug, title, date, readingTime, tag, excerpt, coverImage }: BlogPost) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={clsx(
        'group flex flex-col rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer h-full',
        'border-stone-200 dark:border-stone-800',
        'hover:border-stone-300 dark:hover:border-stone-700',
        'hover:shadow-md dark:hover:shadow-stone-950/40',
        'bg-white dark:bg-stone-900/60'
      )}
      aria-label={`Read: ${title}`}
    >
      {/* Thumbnail */}
      {coverImage ? (
        <div className="relative aspect-video w-full shrink-0 overflow-hidden">
          <Image
            src={coverImage}
            alt=""
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <TagGraphic tag={tag} className="aspect-video w-full shrink-0" />
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-center justify-between gap-2">
          <span
            className={clsx(
              'inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium border',
              tagPillColors[tag]
            )}
          >
            {tag}
          </span>
          <ArrowUpRight
            size={14}
            className="shrink-0 text-stone-300 dark:text-stone-600 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200"
            aria-hidden="true"
          />
        </div>

        <h3 className="font-heading font-semibold text-stone-900 dark:text-stone-50 text-[15px] leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-200 line-clamp-2">
          {title}
        </h3>

        <p className="text-[13px] text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-3 flex-1">
          {excerpt}
        </p>

        <div className="flex items-center gap-2 text-[11px] text-stone-400 dark:text-stone-500 pt-2 mt-auto border-t border-stone-100 dark:border-stone-800">
          <time dateTime={date}>{formatDate(date)}</time>
          <span aria-hidden="true">·</span>
          <Clock size={10} aria-hidden="true" />
          <span>{readingTime}</span>
        </div>
      </div>
    </Link>
  )
}
