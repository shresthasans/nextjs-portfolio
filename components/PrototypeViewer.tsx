'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, Play } from 'lucide-react'

interface PrototypeViewerProps {
  url: string
  label?: string
}

export default function PrototypeViewer({ url, label = 'View Interactive Prototype' }: PrototypeViewerProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  const embedUrl = `https://www.figma.com/embed?embed_host=share&hide-ui=1&url=${encodeURIComponent(url)}`

  return (
    <div className="not-prose my-10 flex justify-center">
      <button
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-3 rounded-full border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 pl-5 pr-6 py-3 text-sm font-semibold text-amber-800 dark:text-amber-300 transition-colors hover:bg-amber-100 dark:hover:bg-amber-950/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      >
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500 text-white shrink-0">
          <Play size={13} fill="currentColor" aria-hidden="true" />
        </span>
        {label}
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/90 backdrop-blur-sm p-4 sm:p-8"
            onClick={() => setOpen(false)}
          >
            <div
              className="relative w-full h-full max-w-6xl rounded-2xl overflow-hidden bg-stone-900 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close prototype viewer"
                className="absolute top-3 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-stone-900/80 text-white hover:bg-stone-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <X size={18} aria-hidden="true" />
              </button>
              <iframe
                src={embedUrl}
                title={label}
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
