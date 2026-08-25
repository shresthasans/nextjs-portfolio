import type { MDXComponents } from 'mdx/types'
import type { ReactNode } from 'react'
import { slugify } from '@/lib/toc'
import { ScrollableTable } from '@/components/scrollable-table'

function textContent(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textContent).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    return textContent((node as { props: { children?: ReactNode } }).props.children)
  }
  return ''
}

export function getMDXComponents(): MDXComponents {
  const seen = new Map<string, number>()

  function headingId(children: ReactNode): string {
    const base = slugify(textContent(children))
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    return count > 0 ? `${base}-${count}` : base
  }

  return {
    h2: ({ children }) => (
      <h2 id={headingId(children)} className="scroll-mt-28">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 id={headingId(children)} className="scroll-mt-28">
        {children}
      </h3>
    ),

    blockquote: ({ children }) => (
      <blockquote className="not-prose relative my-10 pl-6 border-l-4 border-amber-400 dark:border-amber-500">
        <div className="text-xl sm:text-2xl font-heading font-medium italic text-stone-700 dark:text-stone-300 leading-relaxed">
          {children}
        </div>
      </blockquote>
    ),

    hr: () => (
      <div className="not-prose flex items-center justify-center gap-4 my-14" aria-hidden="true">
        <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
        <div className="flex gap-1.5">
          <div className="w-1 h-1 rounded-full bg-amber-400 dark:bg-amber-500" />
          <div className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
          <div className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
        </div>
        <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
      </div>
    ),

    mark: ({ children }) => (
      <mark className="bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 px-1.5 py-0.5 rounded-sm not-italic font-[inherit]">
        {children}
      </mark>
    ),

    strong: ({ children }) => (
      <strong className="font-semibold text-stone-900 dark:text-stone-100">
        {children}
      </strong>
    ),

    table: ({ children }) => (
      <ScrollableTable>
        <table className="w-full min-w-[560px] text-sm [border-collapse:separate] [border-spacing:0] [table-layout:fixed]">
          {children}
        </table>
      </ScrollableTable>
    ),

    th: ({ children }) => (
      <th className="sticky-col text-left px-4 py-3 bg-stone-100 dark:bg-stone-800 font-semibold text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-700 first:w-28 first:sm:w-36 first:sticky first:left-0 first:z-10 first:rounded-tl-lg last:rounded-tr-lg first:transition-colors first:duration-200">
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td className="sticky-col px-4 py-3 border-b border-stone-100 dark:border-stone-800 text-stone-700 dark:text-stone-300 align-top break-words first:sticky first:left-0 first:z-10 first:bg-stone-50 dark:first:bg-stone-950 first:transition-colors first:duration-200">
        {children}
      </td>
    ),
  }
}
