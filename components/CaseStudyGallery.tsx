'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import { ZoomIn } from 'lucide-react'
import { getBlurDataURL } from '@/lib/blur-data'

interface GalleryProps {
  images: { src: string; alt: string }[]
  title?: string
}

export default function CaseStudyGallery({ images, title }: GalleryProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const openAt = useCallback((i: number) => {
    setIndex(i)
    setOpen(true)
  }, [])

  if (!images || images.length === 0) return null

  const slides = images.map((img) => ({ src: img.src, alt: img.alt }))

  return (
    <div className="not-prose my-10 space-y-3">
      {title && (
        <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-4">
          {title}
        </p>
      )}

      <div
        className={
          images.length === 1
            ? 'grid grid-cols-1 gap-3'
            : images.length === 2
            ? 'grid grid-cols-2 gap-3'
            : 'grid grid-cols-2 sm:grid-cols-3 gap-3'
        }
      >
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => openAt(i)}
            className="group relative aspect-[3/2] rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label={`Open ${img.alt} in lightbox`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 50vw, 33vw"
              placeholder={getBlurDataURL(img.src) ? 'blur' : 'empty'}
              blurDataURL={getBlurDataURL(img.src)}
            />
            <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/30 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn
                size={24}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md"
                aria-hidden="true"
              />
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        styles={{ root: { '--yarl__color_backdrop': 'rgba(0,0,0,0.92)' } }}
      />
    </div>
  )
}
