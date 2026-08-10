'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/plugins/captions.css'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

interface Slide {
  src: string
  alt: string
  caption?: string
}

interface MediaCarouselProps {
  images: Slide[]
}

export default function MediaCarousel({ images }: MediaCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const total = images.length
  const isMulti = total > 1

  const prev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setCurrent((i) => (i - 1 + total) % total)
    },
    [total]
  )

  const next = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setCurrent((i) => (i + 1) % total)
    },
    [total]
  )

  const openLightbox = useCallback(() => {
    setLightboxIndex(current)
    setLightboxOpen(true)
  }, [current])

  const slides = images.map((img) => ({
    src: img.src,
    alt: img.alt,
    ...(img.caption ? { description: img.caption } : {}),
  }))

  return (
    <figure className="not-prose my-8 space-y-3">
      {/* Image area */}
      <div className="relative group">
        <button
          onClick={openLightbox}
          className="relative w-full block rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          aria-label={`Open ${images[current].alt} in lightbox`}
        >
          {/* Stack all images, show only current */}
          <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
            {images.map((img, i) => (
              <div
                key={img.src}
                className={`absolute inset-0 transition-opacity duration-300 ${
                  i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          {/* Zoom hint */}
          <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
            <ZoomIn
              size={28}
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md"
              aria-hidden="true"
            />
          </div>

          {/* Slide counter — top right, only when multi */}
          {isMulti && (
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-stone-900/60 backdrop-blur-sm text-white text-[11px] font-medium tabular-nums pointer-events-none">
              {current + 1} / {total}
            </div>
          )}
        </button>

        {/* Prev / Next arrows — only when multi */}
        {isMulti && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-700 dark:text-stone-200 shadow-md hover:bg-white dark:hover:bg-stone-800 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-700 dark:text-stone-200 shadow-md hover:bg-white dark:hover:bg-stone-800 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label="Next image"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {/* Dot indicators — only when multi */}
      {isMulti && (
        <div
          className="flex items-center justify-center gap-1.5"
          role="tablist"
          aria-label="Carousel navigation"
        >
          {images.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to image ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                i === current
                  ? 'w-5 h-1.5 bg-amber-500'
                  : 'w-1.5 h-1.5 bg-stone-300 dark:bg-stone-600 hover:bg-stone-400 dark:hover:bg-stone-500'
              }`}
            />
          ))}
        </div>
      )}

      {/* Caption */}
      {images[current].caption && (
        <figcaption className="text-center text-xs text-stone-600 dark:text-stone-400">
          {images[current].caption}
        </figcaption>
      )}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        on={{
          view: ({ index }) => {
            setCurrent(index)
            setLightboxIndex(index)
          },
        }}
        slides={slides}
        plugins={[Captions]}
        captions={{ descriptionTextAlign: 'center', descriptionMaxLines: 3 }}
        render={{
          slide: ({ slide }) => (
            <div
              className="flex items-start justify-center"
              style={{ width: '100%', height: '100%' }}
            >
              <div
                className="overflow-y-auto rounded-2xl"
                style={{
                  width: 'min(1920px, calc(100vw - 64px))',
                  maxHeight: '100%',
                  aspectRatio: '16 / 9',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.src}
                  alt={'alt' in slide ? slide.alt : ''}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          ),
        }}
        styles={{ root: { '--yarl__color_backdrop': 'rgba(0,0,0,0.92)' } }}
      />
    </figure>
  )
}
