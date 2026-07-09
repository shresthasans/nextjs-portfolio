import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-stone-900 dark:hover:text-stone-50 transition-colors duration-200 cursor-pointer"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? 'text-stone-900 dark:text-stone-50 font-medium' : undefined}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight size={13} className="text-stone-300 dark:text-stone-700" aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
