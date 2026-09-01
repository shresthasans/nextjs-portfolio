'use client'

import Link from 'next/link'
import { Mail, Linkedin, ArrowUpRight, Heart } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { CUA_VERIFY_URL } from '@/lib/constants'

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
]

const nepalLinks = [
  { href: '/product-designer-nepal', label: 'Product Designer in Nepal' },
  { href: '/ux-ui-designer-nepal', label: 'UX/UI Designer in Nepal' },
  { href: '/ai-ux-design-nepal', label: 'AI UX Designer in Nepal' },
]

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 mt-32">
      <div className="container-portfolio py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-stone-900 dark:text-stone-50 text-lg">
              Sanjay Shrestha
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-[28ch]">
              Senior Product Designer ·{' '}
              <a
                href={CUA_VERIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-stone-900 dark:hover:text-stone-50"
              >
                CUA™ Certified
              </a>
              <br />
              Kathmandu, Nepal
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                Selectively taking on new work
              </span>
            </div>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <h4 className="text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-widest mb-4">
              Pages
            </h4>
            <ul className="space-y-2.5" role="list">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Nepal landing pages */}
          <nav aria-label="Location-focused pages">
            <h4 className="text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-widest mb-4">
              Based in Nepal
            </h4>
            <ul className="space-y-2.5" role="list">
              {nepalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-widest mb-4">
              Get in touch
            </h4>
            <ul className="space-y-3" role="list">
              <li>
                <a
                  href="mailto:contact@sanjayshrestha.com"
                  onClick={() => trackEvent('contact_click', { method: 'email' })}
                  className="inline-flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors duration-200"
                >
                  <Mail size={14} aria-hidden="true" />
                  contact@sanjayshrestha.com
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/shresthasans"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('contact_click', { method: 'linkedin' })}
                  className="inline-flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors duration-200"
                >
                  <Linkedin size={14} aria-hidden="true" />
                  linkedin.com/in/shresthasans
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-600 dark:text-stone-400 flex items-center gap-3" suppressHydrationWarning>
            <span>&copy; {new Date().getFullYear()} Sanjay Shrestha. All rights reserved.</span>
            <Link href="/privacy" className="hover:text-stone-900 dark:hover:text-stone-50 transition-colors duration-200">
              Privacy
            </Link>
            <Link href="/accessibility" className="hover:text-stone-900 dark:hover:text-stone-50 transition-colors duration-200">
              Accessibility
            </Link>
          </p>
          <p className="inline-flex items-center gap-1 text-xs text-stone-600 dark:text-stone-400">
            Made with{' '}
            <Heart
              size={12}
              className="text-red-600 dark:text-red-500 fill-current animate-pulse"
              aria-hidden="true"
            />
            <span className="sr-only">love</span> in Kathmandu, Nepal.
          </p>
        </div>
      </div>
    </footer>
  )
}
