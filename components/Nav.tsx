'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { clsx } from 'clsx'
import { trackEvent } from '@/lib/analytics'

const links = [
  { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className="flex items-center justify-between px-6 sm:px-10 lg:px-20 py-4
          bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-md
          border-b border-stone-200 dark:border-stone-800
          shadow-sm"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-heading font-semibold text-stone-900 dark:text-stone-50 text-sm tracking-tight hover:text-amber-700 dark:hover:text-amber-400 transition-colors duration-200"
        >
          Sanjay Shrestha
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => href === '/resume' && trackEvent('resume_click')}
                className={clsx(
                  'px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer',
                  pathname === href || pathname.startsWith(href + '/')
                    ? 'text-stone-900 dark:text-stone-50 bg-stone-100 dark:bg-stone-800'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 hover:bg-stone-100 dark:hover:bg-stone-800/60'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={theme === 'dark'}
            className="p-2 rounded-lg text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-200 cursor-pointer"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <Link
            href="/contact"
            className="hidden md:inline-flex items-center px-4 py-1.5 bg-stone-900 dark:bg-stone-50 text-stone-50 dark:text-stone-900 rounded-lg text-sm font-medium hover:bg-amber-700 dark:hover:bg-amber-400 transition-colors duration-200 cursor-pointer"
          >
            Get in touch
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="md:hidden p-2 rounded-lg text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-200 cursor-pointer"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden mt-0 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-lg overflow-hidden"
          >
            <ul className="flex flex-col p-2" role="list">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => {
                      setMobileOpen(false)
                      if (href === '/resume') trackEvent('resume_click')
                    }}
                    className={clsx(
                      'flex px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer',
                      pathname === href || pathname.startsWith(href + '/')
                        ? 'text-stone-900 dark:text-stone-50 bg-stone-100 dark:bg-stone-800'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50'
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 pb-1 px-2">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center px-4 py-2.5 bg-stone-900 dark:bg-stone-50 text-stone-50 dark:text-stone-900 rounded-xl text-sm font-medium hover:bg-amber-700 dark:hover:bg-amber-400 transition-colors duration-200 cursor-pointer"
                >
                  Get in touch
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
