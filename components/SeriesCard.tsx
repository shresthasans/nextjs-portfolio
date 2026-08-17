import Link from 'next/link'
import Image from 'next/image'
import { Layers, ArrowUpRight } from 'lucide-react'
import { clsx } from 'clsx'
import TagGraphic from './TagGraphic'
import { BlogPost } from './BlogCard'

export default function SeriesCard({
  title,
  posts,
  coverImage,
}: {
  title: string
  posts: BlogPost[]
  coverImage?: string
}) {
  const sorted = [...posts].sort((a, b) => (a.seriesPart ?? 0) - (b.seriesPart ?? 0))
  const total = sorted[0]?.seriesTotal ?? sorted.length
  const first = sorted[0]
  const image = coverImage ?? first.coverImage

  return (
    <Link
      href={`/blog/${first.slug}`}
      className={clsx(
        'group flex flex-col rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer h-full',
        'border-stone-200 dark:border-stone-800',
        'hover:border-stone-300 dark:hover:border-stone-700',
        'hover:shadow-md dark:hover:shadow-stone-950/40',
        'bg-white dark:bg-stone-900/60'
      )}
      aria-label={`Read: ${title}`}
    >
      {image ? (
        <div className="relative aspect-video w-full shrink-0 overflow-hidden">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <TagGraphic tag={first.tag} className="aspect-video w-full shrink-0" />
      )}

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border bg-stone-50 text-stone-600 border-stone-200 dark:bg-stone-800/60 dark:text-stone-300 dark:border-stone-700">
            <Layers size={11} aria-hidden="true" />
            Series · {total} parts
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
          {first.excerpt}
        </p>

        <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400 pt-2 mt-auto border-t border-stone-100 dark:border-stone-800">
          <time dateTime={first.date}>
            {new Date(first.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
          <span aria-hidden="true">·</span>
          <span>{first.readingTime}</span>
        </div>
      </div>
    </Link>
  )
}
