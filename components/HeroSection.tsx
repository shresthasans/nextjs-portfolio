'use client'

import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, MapPin, Award } from 'lucide-react'
import { useState, useEffect } from 'react'
import { CUA_VERIFY_URL } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'

const heroPhrase = ['simple, scalable', 'intuitive, clear', 'elegant, focused', 'human-centered']

export default function HeroSection() {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
    if (prefersReducedMotion) return
    const t = setInterval(() => setPhraseIdx((i) => (i + 1) % heroPhrase.length), 2800)
    return () => clearInterval(t)
  }, [prefersReducedMotion])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── Animated Background ──────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Base */}
        <div className="absolute inset-0 bg-stone-50 dark:bg-stone-950" />

        {/* Orb 1 — top-right amber bloom */}
        <motion.div
          className="absolute -top-40 -right-40 w-[750px] h-[750px] rounded-full"
          style={{ background: 'radial-gradient(circle at 40% 40%, rgba(217,119,6,0.14) 0%, rgba(180,83,9,0.06) 45%, transparent 70%)' }}
          animate={{ scale: [1, 1.12, 1], rotate: [0, 12, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Orb 2 — lower-left stone warm */}
        <motion.div
          className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(120,113,108,0.10) 0%, transparent 68%)' }}
          animate={{ scale: [1, 0.88, 1], x: [0, 24, 0], y: [0, -16, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />

        {/* Orb 3 — mid amber accent */}
        <motion.div
          className="absolute top-1/2 right-1/4 w-[380px] h-[380px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(202,138,4,0.09) 0%, transparent 65%)' }}
          animate={{ scale: [1, 1.18, 1], y: [0, -28, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
        />

        {/* Decorative rings — slow rotate, top-right */}
        <motion.div
          className="absolute -top-24 right-4 lg:right-12 w-[520px] h-[520px] rounded-full border border-amber-400/15 dark:border-amber-600/10"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-4 right-16 lg:right-24 w-[380px] h-[380px] rounded-full border border-stone-300/20 dark:border-stone-600/15"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-24 right-28 lg:right-36 w-[240px] h-[240px] rounded-full border border-amber-300/20 dark:border-amber-700/10"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating accent dot cluster — top-right inner */}
        {[
          { cx: 'right-[18%]', cy: 'top-[22%]', size: 'w-1.5 h-1.5', delay: 0 },
          { cx: 'right-[22%]', cy: 'top-[34%]', size: 'w-1 h-1', delay: 1.5 },
          { cx: 'right-[12%]', cy: 'top-[40%]', size: 'w-2 h-2', delay: 3 },
          { cx: 'right-[28%]', cy: 'top-[18%]', size: 'w-1 h-1', delay: 2 },
        ].map(({ cx, cy, size, delay }, i) => (
          <motion.div
            key={i}
            className={`absolute ${cx} ${cy} ${size} rounded-full bg-amber-400/30 dark:bg-amber-500/20`}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay }}
          />
        ))}

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.022] dark:opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #78716c 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Bottom vignette — text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-stone-50 via-stone-50/80 to-transparent dark:from-stone-950 dark:via-stone-950/80" />
        {/* Left vignette */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-stone-50/60 to-transparent dark:from-stone-950/60" />
      </div>

      {/* ── Hero Content — Bento Split ───────────────────────────── */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-12 xl:gap-20 items-center">
            {/* ── Left: Text ─────────────────────────────────────────── */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="inline-flex items-center gap-2 mb-7 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-full"
              >
                <Award size={13} className="text-amber-700 dark:text-amber-400" aria-hidden="true" />
                <a
                  href={CUA_VERIFY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-amber-800 dark:text-amber-300 hover:underline underline-offset-2"
                >
                  CUA™ Certified · Human Factors International
                </a>
              </motion.div>

              {/* Headline with cycling highlight — no entrance animation: this is the LCP element,
                  so it must paint at opacity:1 immediately instead of waiting on JS/motion */}
              <h1 id="speakable-headline" className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold text-stone-900 dark:text-stone-50 leading-[1.06] tracking-tight mb-7">
                I turn complex{' '}challenges into{' '}
                <span className="inline-block">
                  {mounted ? (
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={heroPhrase[phraseIdx]}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.36, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="inline-block text-amber-700 dark:text-amber-400"
                      >
                        {heroPhrase[phraseIdx]}
                      </motion.span>
                    </AnimatePresence>
                  ) : (
                    <span className="inline-block text-amber-700 dark:text-amber-400">
                      {heroPhrase[0]}
                    </span>
                  )}
                </span>{' '}
                user experiences.
              </h1>

              {/* Tagline */}
              <motion.p
                id="speakable-summary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.28, ease: 'easeOut' }}
                className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-10 max-w-[48ch]"
              >
                I&rsquo;m{' '}
                <span className="font-semibold text-stone-900 dark:text-stone-50">
                  Sanjay Shrestha
                </span>
                , a senior product designer specializing in enterprise SaaS, AI-powered products
                and accessible design systems. Based in Kathmandu and working with distributed
                teams worldwide.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.42, ease: 'easeOut' }}
                className="flex flex-row gap-3"
              >
                <Link
                  href="/work"
                  onClick={() => trackEvent('view_work_click', { location: 'hero' })}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-stone-900 dark:bg-stone-50 text-stone-50 dark:text-stone-900 rounded-lg font-medium text-sm hover:bg-amber-700 dark:hover:bg-amber-400 transition-colors duration-200 cursor-pointer whitespace-nowrap"
                >
                  View My Work
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  onClick={() => trackEvent('contact_click', { location: 'hero' })}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-lg font-medium text-sm hover:bg-stone-100 dark:hover:bg-stone-800 hover:border-stone-300 dark:hover:border-stone-600 transition-colors duration-200 cursor-pointer whitespace-nowrap"
                >
                  Get In Touch
                </Link>
              </motion.div>
            </div>

            {/* ── Right: Achievement cards (lg+) ────────────────── */}
            <div className="hidden lg:flex flex-col gap-3" aria-hidden="true">
              {[
                { value: '15+', title: 'Years of Experience', text: 'Enterprise SaaS • AI • Government' },
                { value: '4M+', title: 'People Reached', text: "Across products I've designed" },
                { value: '3+', title: 'Cross-platform Design Systems', text: 'Built from scratch' },
              ].map(({ value, title, text }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.35 + i * 0.1, ease: 'easeOut' }}
                  className="bg-white/70 dark:bg-stone-900/60 backdrop-blur-xl border border-stone-200/60 dark:border-stone-700/40 rounded-2xl p-6 shadow-sm hover:shadow-md hover:bg-white/90 dark:hover:bg-stone-900/80 transition-all duration-300"
                >
                  <p className="font-heading text-4xl font-black text-amber-700 dark:text-amber-400 leading-none mb-2">{value}</p>
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 mb-1">{title}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-snug">{text}</p>
                </motion.div>
              ))}

              {/* Card: Availability */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.65, ease: 'easeOut' }}
                className="bg-stone-900 dark:bg-stone-800 border border-stone-800 dark:border-stone-700 rounded-2xl px-5 py-4 shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="text-sm font-medium text-stone-100">Based in Kathmandu, Nepal</span>
                </div>
                <MapPin size={14} className="text-stone-500 shrink-0" aria-hidden="true" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
