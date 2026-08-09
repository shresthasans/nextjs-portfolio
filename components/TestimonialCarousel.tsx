'use client'

import { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

interface Testimonial {
  quote: string
  author: string
}

interface TestimonialCarouselProps {
  items: Testimonial[]
}

export default function TestimonialCarousel({ items }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0)
  const total = items.length
  const isMulti = total > 1

  const prev = useCallback(() => setCurrent((i) => (i - 1 + total) % total), [total])
  const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total])

  return (
    <div className="not-prose rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40 p-6 sm:p-8 my-8">
      <div className="relative">
        <Quote className="w-6 h-6 text-amber-400 dark:text-amber-500 mb-3" aria-hidden="true" />

        <blockquote className="min-h-[5rem] sm:min-h-[4rem]">
          <p className="text-lg sm:text-xl font-heading font-medium italic text-stone-700 dark:text-stone-300 leading-relaxed">
            &ldquo;{items[current].quote}&rdquo;
          </p>
          <footer className="mt-3 text-sm font-medium text-stone-500 dark:text-stone-400">
            — {items[current].author}
          </footer>
        </blockquote>

        {isMulti && (
          <div className="flex items-center justify-between mt-5">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-8 h-8 rounded-full flex items-center justify-center text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>

            <div className="flex items-center gap-1.5" role="tablist" aria-label="Testimonial navigation">
              {items.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                    i === current
                      ? 'w-5 h-1.5 bg-amber-500'
                      : 'w-1.5 h-1.5 bg-stone-300 dark:bg-stone-600 hover:bg-stone-400 dark:hover:bg-stone-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-8 h-8 rounded-full flex items-center justify-center text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
