import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Gone',
  robots: { index: false, follow: false },
  alternates: {},
}

export default function Gone() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 px-6">
        <p className="font-heading text-8xl font-bold text-stone-200 dark:text-stone-800">410</p>
        <h1 className="font-heading text-2xl font-semibold text-stone-900 dark:text-stone-50">
          This page is gone
        </h1>
        <p className="text-stone-600 dark:text-stone-400 max-w-sm mx-auto">
          The content that used to live here has been permanently removed and won&apos;t be coming back.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 dark:bg-stone-50 text-stone-50 dark:text-stone-900 rounded-xl text-sm font-medium hover:bg-amber-700 dark:hover:bg-amber-400 transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back home
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center px-5 py-2.5 bg-transparent border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl text-sm font-medium hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-200 cursor-pointer"
          >
            View my work
          </Link>
        </div>
      </div>
    </section>
  )
}
