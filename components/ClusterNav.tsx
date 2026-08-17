import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { clsx } from 'clsx'
import { CLUSTERS } from '@/lib/cluster-data'
import type { BlogPost } from '@/components/BlogCard'

export default function ClusterNav({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {CLUSTERS.map((cluster) => {
        const count = posts.filter((p) => p.cluster === cluster.slug).length
        return (
          <Link
            key={cluster.slug}
            href={`/blog/topics/${cluster.slug}`}
            className={clsx(
              'group flex flex-col gap-2 p-5 rounded-xl border transition-all duration-200 cursor-pointer',
              'border-stone-200 dark:border-stone-800',
              'hover:border-stone-300 dark:hover:border-stone-700',
              'hover:shadow-md dark:hover:shadow-stone-950/40',
              'bg-white dark:bg-stone-900/60'
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-heading font-semibold text-stone-900 dark:text-stone-50 text-sm group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-200">
                {cluster.name}
              </h3>
              <ArrowUpRight
                size={14}
                className="shrink-0 text-stone-300 dark:text-stone-600 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200"
                aria-hidden="true"
              />
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2">
              {cluster.description}
            </p>
            <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400 mt-auto pt-1">
              {count} {count === 1 ? 'article' : 'articles'}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
