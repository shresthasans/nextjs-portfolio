'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import { getBlurDataURL } from '@/lib/blur-data'

interface BeforeAfterSliderProps {
  before: string
  after: string
  beforeAlt: string
  afterAlt: string
  beforeLabel?: string
  afterLabel?: string
  caption?: string
}

export default function BeforeAfterSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  beforeLabel = 'Before',
  afterLabel = 'After',
  caption,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }, [])

  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    updateFromClientX(e.clientX)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return
    updateFromClientX(e.clientX)
  }

  const handlePointerUp = () => {
    draggingRef.current = false
  }

  return (
    <figure className="not-prose my-8 space-y-2">
      <div
        ref={containerRef}
        className="relative w-full aspect-video rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 select-none touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <Image
          src={after}
          alt={afterAlt}
          fill
          className="object-cover pointer-events-none"
          sizes="(max-width: 1024px) 100vw, 800px"
          placeholder={getBlurDataURL(after) ? 'blur' : 'empty'}
          blurDataURL={getBlurDataURL(after)}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={before}
            alt={beforeAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 800px"
            placeholder={getBlurDataURL(before) ? 'blur' : 'empty'}
            blurDataURL={getBlurDataURL(before)}
          />
        </div>

        <div
          className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)] pointer-events-none"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center">
            <div className="flex gap-0.5">
              <div className="w-0 h-0 border-y-4 border-y-transparent border-r-[5px] border-r-stone-500" />
              <div className="w-0 h-0 border-y-4 border-y-transparent border-l-[5px] border-l-stone-500" />
            </div>
          </div>
        </div>

        <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-xs font-medium bg-stone-900/70 text-white backdrop-blur-sm pointer-events-none">
          {beforeLabel}
        </span>
        <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-xs font-medium bg-stone-900/70 text-white backdrop-blur-sm pointer-events-none">
          {afterLabel}
        </span>

        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={`Comparison slider between ${beforeLabel} and ${afterLabel}`}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        />
      </div>

      {caption && (
        <figcaption className="text-center text-xs text-stone-600 dark:text-stone-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
