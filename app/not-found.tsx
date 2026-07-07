import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 px-6">
        <p className="font-heading text-8xl font-bold text-stone-200 dark:text-stone-800">404</p>
        <h1 className="font-heading text-2xl font-semibold text-stone-900 dark:text-stone-50">
          Page not found
        </h1>
        <p className="text-stone-600 dark:text-stone-400 max-w-sm mx-auto">
          This page doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 dark:bg-stone-50 text-stone-50 dark:text-stone-900 rounded-xl text-sm font-medium hover:bg-amber-700 dark:hover:bg-amber-400 transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back home
        </Link>
      </div>
    </section>
  )
}
