'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import { ZoomIn } from 'lucide-react'

interface CaseStudyImageProps {
  src: string
  alt: string
  caption?: string
}

export default function CaseStudyImage({ src, alt, caption }: CaseStudyImageProps) {
  const [open, setOpen] = useState(false)

  return (
    <figure className="not-prose my-8 space-y-2">
      <button
        onClick={() => setOpen(true)}
        className="group relative w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-2xl block"
        aria-label={`Open ${alt} in lightbox`}
      >
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900"
          style={{ aspectRatio: '16 / 9' }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
          <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-300 flex items-center justify-center">
            <ZoomIn
              size={28}
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md"
              aria-hidden="true"
            />
          </div>
        </div>
      </button>

      {caption && (
        <figcaption className="text-center text-xs text-stone-600 dark:text-stone-400">
          {caption}
        </figcaption>
      )}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src, alt }]}
        carousel={{ finite: true }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
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
        styles={{
          root: { '--yarl__color_backdrop': 'rgba(0,0,0,0.92)' },
        }}
      />
    </figure>
  )
}
