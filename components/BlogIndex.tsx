'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Clock, Layers } from 'lucide-react'
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

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={clsx(
        'group grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_340px] rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer',
        'border-stone-200 dark:border-stone-800',
        'hover:border-stone-300 dark:hover:border-stone-700',
        'hover:shadow-lg dark:hover:shadow-stone-950/50',
        'bg-white dark:bg-stone-900/60'
      )}
      aria-label={`Read: ${post.title}`}
    >
      {/* Text panel */}
      <div className="flex flex-col gap-4 p-8 lg:p-10">
        <div className="flex items-center gap-3">
          <span
            className={clsx(
              'inline-flex px-2.5 py-0.5 rounded-lg text-xs font-medium border',
              tagPillColors[post.tag]
            )}
          >
            {post.tag}
          </span>
          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-[0.12em]">
            Latest
          </span>
        </div>

        <h2 className="font-heading font-bold text-stone-900 dark:text-stone-50 text-2xl sm:text-[1.75rem] leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-200">
          {post.title}
        </h2>

        <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400 mt-auto pt-4 border-t border-stone-100 dark:border-stone-800">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <Clock size={11} aria-hidden="true" />
          <span>{post.readingTime}</span>
          <ArrowUpRight
            size={15}
            className="ml-auto shrink-0 text-stone-300 dark:text-stone-600 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Graphic panel */}
      {post.coverImage ? (
        <div className="relative h-52 md:h-auto w-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 340px"
            placeholder={getBlurDataURL(post.coverImage) ? 'blur' : 'empty'}
            blurDataURL={getBlurDataURL(post.coverImage)}
          />
        </div>
      ) : (
        <TagGraphic tag={post.tag} className="h-52 md:h-auto w-full" />
      )}
    </Link>
  )
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

export default function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [activeTag, setActiveTag] = useState<FilterTag>('All')

  const allItems = groupSeries(posts)
  const feedItems =
    activeTag === 'All'
      ? allItems
      : allItems.filter((item) =>
          item.kind === 'post' ? item.post.tag === activeTag : item.posts.some((p) => p.tag === activeTag)
        )
  const filtered = feedItems.flatMap((item) => (item.kind === 'post' ? [item.post] : item.posts))

  const PINNED_SERIES = 'Product Design Concepts Explained'
  const pinnedIndex = feedItems.findIndex(
    (item) => item.kind === 'series' && item.title === PINNED_SERIES
  )
  const featured = pinnedIndex !== -1 ? feedItems[pinnedIndex] : feedItems[0]
  const rest =
    pinnedIndex !== -1
      ? [...feedItems.slice(0, pinnedIndex), ...feedItems.slice(pinnedIndex + 1)]
      : feedItems.slice(1)

  return (
    <div className="space-y-10">

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
          No posts in this category yet.
        </div>
      )}

      {/* Featured */}
      {featured && (
        <AnimatedSection>
          {featured.kind === 'post' ? (
            <FeaturedCard post={featured.post} />
          ) : (
            <FeaturedSeriesCard title={featured.title} posts={featured.posts} coverImage={featured.coverImage} />
          )}
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
