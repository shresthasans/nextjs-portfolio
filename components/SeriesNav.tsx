import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Layers } from 'lucide-react'

interface SeriesNavLink {
  title: string
  href: string
}

interface SeriesNavItem {
  part: number
  title: string
  href?: string
}

interface SeriesNavProps {
  seriesTitle: string
  currentPart: number
  totalParts: number
  prev?: SeriesNavLink
  next?: SeriesNavLink
  allParts?: SeriesNavItem[]
}

export default function SeriesNav({
  seriesTitle,
  currentPart,
  totalParts,
  prev,
  next,
  allParts,
}: SeriesNavProps) {
  return (
    <div className="not-prose my-12 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 p-6">
      <div className="flex items-center gap-2 mb-5">
        <Layers size={14} className="text-amber-600 dark:text-amber-400" aria-hidden="true" />
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
          Part {currentPart} of {totalParts} · {seriesTitle}
        </p>
      </div>

      {allParts ? (
        <ul className="space-y-1">
          {allParts.map((item) =>
            item.href ? (
              <li key={item.part}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 -mx-3 text-sm text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800 hover:text-amber-700 dark:hover:text-amber-400 transition-colors duration-200"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-stone-200 dark:bg-stone-700 text-[10px] font-semibold text-stone-600 dark:text-stone-300 shrink-0">
                    {item.part}
                  </span>
                  {item.title}
                </Link>
              </li>
            ) : (
              <li key={item.part}>
                <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 -mx-3 text-sm">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 dark:bg-amber-500 shrink-0" aria-hidden="true">
                    <Check size={11} className="text-white" />
                  </span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{item.title}</span>
                  <span className="text-xs text-stone-400 dark:text-stone-500">this post</span>
                </div>
              </li>
            )
          )}
        </ul>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prev ? (
            <Link
              href={prev.href}
              className="group flex items-center gap-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 hover:border-amber-300 dark:hover:border-amber-700 transition-colors duration-200 min-w-0"
            >
              <ArrowLeft
                size={16}
                className="shrink-0 text-stone-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-stone-400 dark:text-stone-500 mb-0.5">
                  Previous
                </p>
                <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 truncate">
                  {prev.title}
                </p>
              </div>
            </Link>
          ) : (
            <div aria-hidden="true" />
          )}
          {next ? (
            <Link
              href={next.href}
              className="group flex items-center justify-between gap-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 hover:border-amber-300 dark:hover:border-amber-700 transition-colors duration-200 min-w-0"
            >
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-stone-400 dark:text-stone-500 mb-0.5">
                  Next
                </p>
                <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 truncate">
                  {next.title}
                </p>
              </div>
              <ArrowRight
                size={16}
                className="shrink-0 text-stone-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200"
                aria-hidden="true"
              />
            </Link>
          ) : (
            <div aria-hidden="true" />
          )}
        </div>
      )}
    </div>
  )
}
