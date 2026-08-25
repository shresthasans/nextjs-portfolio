'use client'

import { useState, type ReactNode } from 'react'

export function ScrollableTable({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false)

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    setScrolled(e.currentTarget.scrollLeft > 0)
  }

  return (
    <div
      className="overflow-x-auto my-8"
      onScroll={handleScroll}
      data-scrolled={scrolled}
    >
      {children}
    </div>
  )
}
