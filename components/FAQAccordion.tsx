import { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

interface FAQItem {
  question: string
  answer: ReactNode
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="not-prose my-8 divide-y divide-stone-200 dark:divide-stone-800 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
      {items.map((item, i) => (
        <details key={item.question} name="faq" className="group" open={i === 0}>
          <summary className="flex items-start gap-3 cursor-pointer list-none px-5 py-4 font-medium leading-snug text-stone-900 dark:text-stone-50 hover:bg-stone-50 dark:hover:bg-stone-900/60 transition-colors [&::-webkit-details-marker]:hidden">
            <ChevronRight
              size={16}
              className="shrink-0 mt-1 text-stone-400 dark:text-stone-500 transition-transform duration-200 group-open:rotate-90"
              aria-hidden="true"
            />
            <span>{item.question}</span>
          </summary>
          <div className="pl-[calc(1.25rem+16px+0.75rem)] pr-5 pb-4 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  )
}
