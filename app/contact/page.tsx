'use client'

import type { Metadata } from 'next'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, Linkedin, ArrowUpRight, CheckCircle, AlertCircle } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import { trackEvent } from '@/lib/analytics'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  function validate() {
    const errs: Partial<typeof form> = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.message.trim()) errs.message = 'Message is required'
    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Send failed')
      setStatus('sent')
      trackEvent('generate_lead', { form_id: 'contact' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <section className="pt-24 pb-24">
        <div className="container-portfolio">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <AnimatedSection className="space-y-10">
              <div>
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-4">
                  Contact
                </p>
                <h1 className="font-heading text-5xl sm:text-6xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-[1.1] mb-6 text-balance">
                  Let&apos;s work together.
                </h1>
                <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
                  If you have an interesting challenge or just want to talk design, I&apos;d love to hear about it.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                <span className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                  Based in Kathmandu, Nepal
                </span>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:contact@sanjayshrestha.com"
                  onClick={() => trackEvent('contact_click', { method: 'email' })}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30 transition-colors duration-200">
                    <Mail size={16} className="text-stone-500 dark:text-stone-400 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-200" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-0.5">Email</p>
                    <p className="text-sm font-medium text-stone-700 dark:text-stone-300 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-200">
                      contact@sanjayshrestha.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/shresthasans"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('contact_click', { method: 'linkedin' })}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30 transition-colors duration-200">
                    <Linkedin size={16} className="text-stone-500 dark:text-stone-400 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-200" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-0.5">LinkedIn</p>
                    <p className="text-sm font-medium text-stone-700 dark:text-stone-300 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-200 flex items-center gap-1">
                      linkedin.com/in/shresthasans
                      <ArrowUpRight size={12} aria-hidden="true" />
                    </p>
                  </div>
                </a>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  Based in Kathmandu, Nepal.
                </p>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection delay={0.2}>
              {status === 'error' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl border border-red-200 dark:border-red-800/60 bg-red-50 dark:bg-red-950/20 p-10 text-center space-y-4"
                >
                  <AlertCircle size={40} className="text-red-600 dark:text-red-400 mx-auto" aria-hidden="true" />
                  <h2 className="font-heading font-semibold text-stone-900 dark:text-stone-50 text-xl">
                    Something went wrong
                  </h2>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Message couldn&apos;t be sent. Email me directly at{' '}
                    <a
                      href="mailto:contact@sanjayshrestha.com"
                      onClick={() => trackEvent('contact_click', { method: 'email' })}
                      className="text-amber-700 dark:text-amber-400 hover:underline"
                    >
                      contact@sanjayshrestha.com
                    </a>
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 transition-colors duration-200 cursor-pointer"
                  >
                    Try again
                  </button>
                </motion.div>
              ) : status === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/20 p-10 text-center space-y-4"
                >
                  <CheckCircle size={40} className="text-emerald-600 dark:text-emerald-400 mx-auto" aria-hidden="true" />
                  <h2 className="font-heading font-semibold text-stone-900 dark:text-stone-50 text-xl">
                    Message sent!
                  </h2>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Thanks for reaching out. I&apos;ll get back to you within a couple of days.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/50 p-8 space-y-6"
                  aria-label="Contact form"
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-stone-700 dark:text-stone-300"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      aria-invalid={!!errors.name}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50 text-stone-900 dark:text-stone-50 placeholder-stone-400 dark:placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 dark:focus:ring-amber-400 transition-colors duration-200"
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-red-600 dark:text-red-400" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-stone-700 dark:text-stone-300"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="hello@company.com"
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      aria-invalid={!!errors.email}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50 text-stone-900 dark:text-stone-50 placeholder-stone-400 dark:placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 dark:focus:ring-amber-400 transition-colors duration-200"
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-red-600 dark:text-red-400" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-stone-700 dark:text-stone-300"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project, role, or collaboration idea..."
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      aria-invalid={!!errors.message}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50 text-stone-900 dark:text-stone-50 placeholder-stone-400 dark:placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 dark:focus:ring-amber-400 transition-colors duration-200 resize-none"
                    />
                    {errors.message && (
                      <p id="message-error" className="text-xs text-red-600 dark:text-red-400" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-3.5 px-6 bg-stone-900 dark:bg-stone-50 text-stone-50 dark:text-stone-900 rounded-lg font-medium text-sm hover:bg-amber-700 dark:hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send Message'}
                  </button>

                  <p className="text-xs text-stone-600 dark:text-stone-400 text-center">
                    Or email directly:{' '}
                    <a
                      href="mailto:contact@sanjayshrestha.com"
                      onClick={() => trackEvent('contact_click', { method: 'email' })}
                      className="text-amber-700 dark:text-amber-400 hover:underline"
                    >
                      contact@sanjayshrestha.com
                    </a>
                  </p>

                  <p className="text-xs text-stone-500 dark:text-stone-500 text-center">
                    By submitting, you agree to this site&apos;s{' '}
                    <Link href="/privacy" className="text-amber-700 dark:text-amber-400 hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
