'use client'

import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import type { TocHeading } from '@/lib/toc'

export default function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '')

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-112px 0px -70% 0px', threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav aria-label="On this page" className="space-y-3">
      <p className="text-xs font-semibold text-stone-500 dark:text-stone-500 uppercase tracking-widest">
        On this page
      </p>
      <ul className="space-y-0.5 border-l border-stone-200 dark:border-stone-800">
        {headings.map((heading) => {
          const active = heading.id === activeId
          const numbered = heading.text.match(/^(\d+\.)\s*(.*)$/)
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={clsx(
                  'border-l-2 -ml-px py-1.5 text-sm transition-colors duration-150',
                  numbered ? 'flex' : 'block',
                  heading.level === 3 ? 'pl-7' : 'pl-4',
                  active
                    ? 'border-amber-500 text-stone-900 dark:text-stone-50 font-semibold'
                    : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
                )}
              >
                {numbered ? (
                  <>
                    <span className="shrink-0 tabular-nums mr-1.5">{numbered[1]}</span>
                    <span>{numbered[2]}</span>
                  </>
                ) : (
                  heading.text
                )}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
