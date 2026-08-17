'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, Play } from 'lucide-react'

interface PrototypeViewerProps {
  url: string
  label?: string
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])'

export default function PrototypeViewer({ url, label = 'View Interactive Prototype' }: PrototypeViewerProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Focus the dialog on open, return focus to the trigger on close.
  useEffect(() => {
    if (open) {
      dialogRef.current?.focus()
    } else {
      triggerRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab') return

      const dialog = dialogRef.current
      if (!dialog) return
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (e.shiftKey && (active === first || active === dialog)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
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
        ref={triggerRef}
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
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/90 backdrop-blur-sm p-4 sm:p-8 focus:outline-none"
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
