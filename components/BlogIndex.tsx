'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { ArrowUpRight, Clock, Layers, Search, X } from 'lucide-react'
import { clsx } from 'clsx'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import BlogCard, { BlogPost } from '@/components/BlogCard'
import SeriesCard from '@/components/SeriesCard'
import { getBlurDataURL } from '@/lib/blur-data'
import TagGraphic from '@/components/TagGraphic'

type FeedItem =
  | { kind: 'post'; post: BlogPost }
  | { kind: 'series'; title: string; posts: BlogPost[]; coverImage?: string }

function groupSeries(posts: BlogPost[]): FeedItem[] {
  const items: FeedItem[] = []
  const seen = new Set<string>()

  for (const post of posts) {
    if (post.series) {
      if (seen.has(post.series)) continue
      seen.add(post.series)
      const seriesPosts = posts.filter((p) => p.series === post.series)
      items.push({
        kind: 'series',
        title: post.series,
        posts: seriesPosts,
        coverImage: seriesPosts.find((p) => p.seriesCoverImage)?.seriesCoverImage,
      })
    } else {
      items.push({ kind: 'post', post })
    }
  }

  return items
}

const TAG_FILTERS = ['All', 'UX', 'Design Systems', 'AI', 'Career', 'Agent UX'] as const
type FilterTag = (typeof TAG_FILTERS)[number]

const tagPillColors: Record<string, string> = {
  UX: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/50',
  'Design Systems':
    'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/50',
  AI: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/50',
  Career:
    'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/50',
  'Agent UX':
    'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800/50',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function FeaturedSeriesCard({
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
    <div
      className={clsx(
        'grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_340px] rounded-xl overflow-hidden border transition-all duration-200',
        'border-stone-200 dark:border-stone-800',
        'bg-white dark:bg-stone-900/60'
      )}
    >
      {/* Text panel */}
      <div className="flex flex-col gap-4 p-8 lg:p-10">
        <div className="flex items-center gap-3">
          <span
            className={clsx(
              'inline-flex px-2.5 py-0.5 rounded-lg text-xs font-medium border',
              tagPillColors[first.tag]
            )}
          >
            {first.tag}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-medium border bg-stone-50 text-stone-600 border-stone-200 dark:bg-stone-800/60 dark:text-stone-300 dark:border-stone-700">
            <Layers size={12} aria-hidden="true" />
            {total}-part series
          </span>
          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-[0.12em]">
            Featured
          </span>
        </div>

        <h2 className="font-heading font-bold text-stone-900 dark:text-stone-50 text-2xl sm:text-[1.75rem] leading-snug">
          {title}
        </h2>

        <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-3">
          {first.excerpt}
        </p>

        <ol className="flex flex-col gap-1.5 pt-2 border-t border-stone-100 dark:border-stone-800">
          {sorted.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-center gap-2.5 py-1 text-sm text-stone-500 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors duration-200"
              >
                <span className="shrink-0 text-xs font-semibold tabular-nums text-stone-500 dark:text-stone-400 w-4">
                  {post.seriesPart}
                </span>
                <span className="line-clamp-1 flex-1">
                  {post.seriesShortTitle ?? post.title.replace(/^.*Part \d+ of \d+:\s*/, '')}
                </span>
                <ArrowUpRight
                  size={13}
                  className="shrink-0 text-stone-300 dark:text-stone-600 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ol>

        <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400 mt-auto pt-4 border-t border-stone-100 dark:border-stone-800">
          <time dateTime={first.date}>{formatDate(first.date)}</time>
          <span aria-hidden="true">·</span>
          <Clock size={11} aria-hidden="true" />
          <span>{first.readingTime}</span>
          <Link
            href={`/blog/${first.slug}`}
            className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-amber-700 dark:text-amber-400 hover:underline"
          >
            Start with Part 1
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Graphic panel */}
      {image ? (
        <div className="relative h-52 md:h-auto w-full overflow-hidden">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 340px"
            placeholder={getBlurDataURL(image) ? 'blur' : 'empty'}
            blurDataURL={getBlurDataURL(image)}
          />
        </div>
      ) : (
        <TagGraphic tag={first.tag} className="h-52 md:h-auto w-full" />
      )}
    </div>
  )
}

function matchesQuery(post: BlogPost, query: string) {
  const q = query.toLowerCase()
  return post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q)
}

export default function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [activeTag, setActiveTag] = useState<FilterTag>('All')
  const [query, setQuery] = useState(searchParams.get('q') ?? '')

  function updateQuery(value: string) {
    setQuery(value)
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set('q', value)
    else params.delete('q')
    router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname, { scroll: false })
  }

  const allItems = groupSeries(posts)
  const tagFiltered =
    activeTag === 'All'
      ? allItems
      : allItems.filter((item) =>
          item.kind === 'post' ? item.post.tag === activeTag : item.posts.some((p) => p.tag === activeTag)
        )
  const feedItems = query
    ? tagFiltered.filter((item) =>
        item.kind === 'post' ? matchesQuery(item.post, query) : item.posts.some((p) => matchesQuery(p, query))
      )
    : tagFiltered
  const filtered = feedItems.flatMap((item) => (item.kind === 'post' ? [item.post] : item.posts))

  const PINNED_SERIES = 'Product Design Concepts Explained'
  const pinnedIndex = feedItems.findIndex(
    (item) => item.kind === 'series' && item.title === PINNED_SERIES
  )
  const firstSeriesIndex = pinnedIndex !== -1 ? pinnedIndex : feedItems.findIndex((item) => item.kind === 'series')
  const featured = firstSeriesIndex !== -1 ? feedItems[firstSeriesIndex] : undefined
  const rest =
    firstSeriesIndex !== -1
      ? [...feedItems.slice(0, firstSeriesIndex), ...feedItems.slice(firstSeriesIndex + 1)]
      : feedItems

  return (
    <div className="space-y-10">

      {/* Search */}
      <div className="relative max-w-sm">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => updateQuery(e.target.value)}
          placeholder="Search posts…"
          aria-label="Search blog posts"
          className="w-full pl-9 pr-9 py-2 rounded-lg text-sm border border-stone-200 dark:border-stone-700 bg-transparent text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 dark:focus:ring-amber-400"
        />
        {query && (
          <button
            onClick={() => updateQuery('')}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 cursor-pointer"
          >
            <X size={14} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          {TAG_FILTERS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={clsx(
                'px-3.5 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer',
                activeTag === tag
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-transparent'
                  : 'bg-transparent text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:text-stone-900 dark:hover:text-stone-100 hover:border-stone-400 dark:hover:border-stone-500'
              )}
            >
              {tag}
            </button>
          ))}
        </div>
        <span className="ml-auto text-xs text-stone-500 dark:text-stone-400 tabular-nums">
          {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
        </span>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-20 text-center text-sm text-stone-500 dark:text-stone-400">
          {query ? `No posts match "${query}".` : 'No posts in this category yet.'}
        </div>
      )}

      {/* Featured series */}
      {featured && featured.kind === 'series' && (
        <AnimatedSection>
          <FeaturedSeriesCard title={featured.title} posts={featured.posts} coverImage={featured.coverImage} />
        </AnimatedSection>
      )}

      {/* Uniform grid */}
      {rest.length > 0 && (
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((item) => (
            <StaggerItem key={item.kind === 'post' ? item.post.slug : item.title}>
              {item.kind === 'post' ? (
                <BlogCard {...item.post} />
              ) : (
                <SeriesCard title={item.title} posts={item.posts} coverImage={item.coverImage} />
              )}
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  )
}
