import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { clsx } from 'clsx'
import AnimatedSection from '@/components/AnimatedSection'
import Breadcrumbs from '@/components/Breadcrumbs'
import CaseStudyCard, { CaseStudy } from '@/components/CaseStudyCard'
import MediaFigure from '@/components/MediaFigure'
import MediaCarousel from '@/components/MediaCarousel'
import FAQAccordion from '@/components/FAQAccordion'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import PrototypeViewer from '@/components/PrototypeViewer'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Briefcase, CalendarClock, Users, TrendingUp, Sparkles } from 'lucide-react'
import { allWork } from '@/lib/work-data'
import { getProjectImages } from '@/lib/project-images'
import { getMDXComponents } from '@/components/mdx-components'
import { extractHeadings } from '@/lib/toc'
import TableOfContents from '@/components/TableOfContents'

interface Frontmatter {
  title: string
  seoTitle?: string
  client: string
  role: string
  year: string
  timeline: string
  teamSize: string
  tools: string[]
  type: string
  outcome: string
  description: string
  duration?: string
  roleSummary?: string
  roleItems?: string[]
  team?: string[]
  impact?: string | string[]
  highlights?: { title: string; text: string }[]
}

async function getCaseStudy(slug: string) {
  const filePath = path.join(process.cwd(), 'content', 'work', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { frontmatter: data as Frontmatter, content }
}

function getOtherWork(currentSlug: string, limit = 3): CaseStudy[] {
  return allWork.filter((w) => w.slug !== currentSlug).slice(0, limit)
}

function getRelatedPosts(slugs: string[] | undefined) {
  if (!slugs?.length) return []
  const dir = path.join(process.cwd(), 'content', 'blog')
  return slugs
    .map((slug) => {
      const file = path.join(dir, `${slug}.mdx`)
      if (!fs.existsSync(file)) return null
      const { data } = matter(fs.readFileSync(file, 'utf-8'))
      return { slug, title: data.title as string, excerpt: data.excerpt as string }
    })
    .filter((p): p is { slug: string; title: string; excerpt: string } => p !== null)
}

// Case studies published on disk but not yet finalized for public listing —
// kept crawlable-by-URL for review, but hidden from search engines and the /work index.
const UNLISTED_SLUGS = new Set(['nepal-pm-calendar'])

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = await getCaseStudy(slug)
  if (!study) return { title: 'Case Study Not Found' }
  const { frontmatter } = study
  const metaTitle = frontmatter.seoTitle ?? frontmatter.title

  const ogImagePath = path.join(process.cwd(), 'public', 'images', 'og', `${slug}.jpg`)
  const socialImage = fs.existsSync(ogImagePath)
    ? {
        url: `https://sanjayshrestha.com/images/og/${slug}.jpg`,
        width: 1200,
        height: 630,
        alt: frontmatter.title,
      }
    : undefined

  return {
    title: metaTitle,
    description: frontmatter.description,
    alternates: {
      canonical: `https://sanjayshrestha.com/work/${slug}`,
    },
    ...(UNLISTED_SLUGS.has(slug) ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: `${metaTitle} | Sanjay Shrestha`,
      description: frontmatter.description,
      url: `https://sanjayshrestha.com/work/${slug}`,
      siteName: 'Sanjay Shrestha',
      type: 'article',
      ...(socialImage ? { images: [socialImage] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${metaTitle} | Sanjay Shrestha`,
      description: frontmatter.description,
      ...(socialImage ? { images: [socialImage] } : {}),
    },
  }
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content', 'work')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => ({ slug: f.replace('.mdx', '') }))
}

/* ─── Design Artifact Placeholder Components ─── */

function WireframePlaceholder() {
  return (
    <div className="grid grid-cols-3 gap-3 p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800">
      {(['Onboarding', 'Dashboard', 'Detail'] as const).map((label) => (
        <div
          key={label}
          className="rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden bg-white dark:bg-stone-900/80"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-1 px-2 py-1.5 bg-stone-100 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-600" />
              <div className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-600" />
              <div className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-600" />
            </div>
            <div className="flex-1 h-2 rounded bg-stone-200 dark:bg-stone-700 mx-1" />
          </div>
          {/* Nav bar */}
          <div className="flex gap-1.5 px-2 py-1.5 border-b border-stone-100 dark:border-stone-800">
            <div className="h-2 w-6 rounded bg-stone-800 dark:bg-stone-200" />
            <div className="flex gap-1 ml-auto">
              <div className="h-2 w-4 rounded bg-stone-200 dark:bg-stone-700" />
              <div className="h-2 w-4 rounded bg-stone-200 dark:bg-stone-700" />
              <div className="h-2 w-4 rounded bg-stone-200 dark:bg-stone-700" />
            </div>
          </div>
          {/* Content */}
          <div className="p-2 space-y-1.5">
            <div className="h-6 rounded bg-stone-100 dark:bg-stone-800" />
            <div className="space-y-1">
              <div className="h-1.5 rounded bg-stone-200 dark:bg-stone-700 w-full" />
              <div className="h-1.5 rounded bg-stone-200 dark:bg-stone-700 w-4/5" />
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="h-8 rounded bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700" />
              <div className="h-8 rounded bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700" />
            </div>
            <div className="h-4 w-2/3 rounded bg-stone-300 dark:bg-stone-700" />
          </div>
          <div className="px-2 pb-2">
            <span className="text-[8px] font-medium text-stone-400 dark:text-stone-600 uppercase tracking-wider">
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

function UserFlowPlaceholder() {
  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40 p-6 overflow-x-auto">
      <div className="min-w-[480px] space-y-5">
        {/* Row 1: main flow */}
        <div className="flex items-center gap-2">
          <div className="shrink-0 px-3 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 text-xs font-semibold text-amber-800 dark:text-amber-300">
            Entry
          </div>
          <ArrowRight size={13} className="shrink-0 text-stone-300 dark:text-stone-600" aria-hidden />
          <div className="shrink-0 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-600 text-xs font-medium text-stone-700 dark:text-stone-300">
            Onboarding
          </div>
          <ArrowRight size={13} className="shrink-0 text-stone-300 dark:text-stone-600" aria-hidden />
          <div className="shrink-0 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-600 text-xs font-medium text-stone-700 dark:text-stone-300">
            Setup
          </div>
          <ArrowRight size={13} className="shrink-0 text-stone-300 dark:text-stone-600" aria-hidden />
          <div className="shrink-0 px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 text-xs font-semibold text-blue-800 dark:text-blue-300">
            Dashboard
          </div>
        </div>

        {/* Divider with label */}
        <div className="flex items-center gap-3">
          <div className="flex-1 border-t border-dashed border-stone-200 dark:border-stone-700" />
          <span className="text-[10px] text-stone-400 dark:text-stone-600 uppercase tracking-widest">
            branches
          </span>
          <div className="flex-1 border-t border-dashed border-stone-200 dark:border-stone-700" />
        </div>

        {/* Row 2: branches from dashboard */}
        <div className="flex items-start gap-3">
          <div className="shrink-0 px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 text-xs font-semibold text-blue-800 dark:text-blue-300 mt-1">
            Dashboard
          </div>
          <ArrowRight size={13} className="shrink-0 text-stone-300 dark:text-stone-600 mt-2.5" aria-hidden />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-600 text-xs font-medium text-stone-700 dark:text-stone-300">
                Analytics
              </div>
              <ArrowRight size={12} className="text-stone-300 dark:text-stone-700" aria-hidden />
              <div className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-600 text-xs font-medium text-stone-700 dark:text-stone-300">
                Reports
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-600 text-xs font-medium text-stone-700 dark:text-stone-300">
                Configuration
              </div>
              <ArrowRight size={12} className="text-stone-300 dark:text-stone-700" aria-hidden />
              <div className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-600 text-xs font-medium text-stone-700 dark:text-stone-300">
                Alerts
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 text-xs font-semibold text-emerald-800 dark:text-emerald-300 self-start">
              Success State
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MockupPlaceholder() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Desktop browser mockup */}
      <div className="rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden shadow-sm">
        <div className="bg-stone-800 dark:bg-stone-950 px-3 py-2">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="h-4 rounded bg-stone-700 dark:bg-stone-800 w-1/2 mx-auto" />
        </div>
        <div className="bg-white dark:bg-stone-900 p-4 space-y-3 h-44">
          {/* Top nav */}
          <div className="flex items-center justify-between">
            <div className="h-3 w-14 rounded bg-stone-800 dark:bg-stone-200" />
            <div className="flex gap-2">
              <div className="h-3 w-8 rounded bg-stone-200 dark:bg-stone-700" />
              <div className="h-3 w-8 rounded bg-stone-200 dark:bg-stone-700" />
              <div className="h-6 w-14 rounded-lg bg-amber-400 dark:bg-amber-600" />
            </div>
          </div>
          {/* Hero block */}
          <div className="rounded-xl bg-gradient-to-br from-stone-100 to-stone-50 dark:from-stone-800 dark:to-stone-900 p-3 space-y-2">
            <div className="h-4 w-2/3 rounded bg-stone-300 dark:bg-stone-600" />
            <div className="h-2.5 w-full rounded bg-stone-200 dark:bg-stone-700" />
            <div className="h-2.5 w-4/5 rounded bg-stone-200 dark:bg-stone-700" />
            <div className="flex gap-2 pt-1">
              <div className="h-7 w-20 rounded-lg bg-amber-400 dark:bg-amber-600" />
              <div className="h-7 w-20 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800" />
            </div>
          </div>
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-lg border border-stone-100 dark:border-stone-800 p-2 space-y-1">
                <div className="h-4 w-8 rounded bg-stone-200 dark:bg-stone-700" />
                <div className="h-2 w-12 rounded bg-stone-100 dark:bg-stone-800" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile mockup */}
      <div className="flex justify-center">
        <div className="w-40 rounded-[2rem] border-4 border-stone-800 dark:border-stone-600 overflow-hidden shadow-xl bg-white dark:bg-stone-900">
          {/* Status bar */}
          <div className="bg-stone-900 dark:bg-stone-950 h-6 flex items-center justify-between px-3">
            <div className="h-1.5 w-6 rounded bg-stone-600" />
            <div className="h-1.5 w-1.5 rounded-full bg-stone-600" />
          </div>
          {/* Screen */}
          <div className="p-3 space-y-2.5 bg-stone-50 dark:bg-stone-900">
            <div className="h-3 w-2/3 rounded bg-stone-800 dark:bg-stone-200" />
            <div className="h-20 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-end p-2.5">
              <div className="space-y-1 w-full">
                <div className="h-2 w-3/4 rounded bg-white/50" />
                <div className="h-2 w-1/2 rounded bg-white/40" />
              </div>
            </div>
            <div className="space-y-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700">
                  <div className="w-6 h-6 rounded-full bg-stone-200 dark:bg-stone-700 shrink-0" />
                  <div className="space-y-1 flex-1">
                    <div className="h-1.5 rounded bg-stone-200 dark:bg-stone-600 w-full" />
                    <div className="h-1.5 rounded bg-stone-100 dark:bg-stone-700 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
            {/* Bottom nav */}
            <div className="flex justify-around pt-1 border-t border-stone-200 dark:border-stone-700">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-4 h-4 rounded bg-stone-200 dark:bg-stone-700" />
                  <div className="h-1 w-3 rounded bg-stone-200 dark:bg-stone-700" />
                </div>
              ))}
            </div>
          </div>
          {/* Home indicator */}
          <div className="bg-stone-900 dark:bg-stone-950 h-5 flex items-center justify-center">
            <div className="h-1 w-10 rounded-full bg-stone-600" />
          </div>
        </div>
      </div>
    </div>
  )
}

function VisualDesignPlaceholder() {
  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden shadow-sm">
      <div className="grid grid-cols-2">
        {/* Dark theme screen */}
        <div className="bg-stone-900 p-5 space-y-4">
          <div className="space-y-1.5">
            <div className="h-1.5 w-14 rounded bg-amber-500/60" />
            <div className="h-5 w-40 rounded-lg bg-stone-100/20" />
            <div className="h-2 w-32 rounded bg-stone-100/10" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              'bg-amber-500',
              'bg-stone-700',
              'bg-blue-600',
              'bg-stone-700',
            ].map((bg, i) => (
              <div key={i} className={`h-12 rounded-xl ${bg} flex items-end p-2`}>
                <div className="space-y-1 w-full">
                  <div className="h-1.5 rounded bg-white/30 w-full" />
                  <div className="h-1 rounded bg-white/20 w-3/4" />
                </div>
              </div>
            ))}
          </div>
          <div className="h-8 rounded-xl bg-amber-500 flex items-center justify-center">
            <div className="h-2 w-16 rounded bg-white/70" />
          </div>
        </div>

        {/* Light theme screen */}
        <div className="bg-white dark:bg-stone-100 p-5 space-y-4">
          <div className="space-y-1.5">
            <div className="h-1.5 w-14 rounded bg-amber-600/60" />
            <div className="h-5 w-40 rounded-lg bg-stone-200" />
            <div className="h-2 w-32 rounded bg-stone-100" />
          </div>
          <div className="space-y-2">
            {[0, 1].map((i) => (
              <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl border border-stone-100 bg-stone-50">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 shrink-0" />
                <div className="space-y-1 flex-1">
                  <div className="h-2.5 rounded bg-stone-300 w-3/4" />
                  <div className="h-1.5 rounded bg-stone-200 w-full" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="h-8 flex-1 rounded-xl bg-amber-500 flex items-center justify-center">
              <div className="h-2 w-12 rounded bg-white/80" />
            </div>
            <div className="h-8 flex-1 rounded-xl border border-stone-200 bg-white flex items-center justify-center">
              <div className="h-2 w-12 rounded bg-stone-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Token strip */}
      <div className="bg-stone-100 dark:bg-stone-800 px-5 py-3 flex items-center gap-4 border-t border-stone-200 dark:border-stone-700">
        <span className="text-[10px] font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-widest shrink-0">
          Tokens
        </span>
        <div className="flex gap-2 flex-wrap">
          {[
            'bg-amber-500',
            'bg-stone-900',
            'bg-blue-600',
            'bg-stone-200',
            'bg-emerald-500',
            'bg-red-500',
          ].map((color, i) => (
            <div key={i} className={`w-5 h-5 rounded-full ${color} ring-2 ring-white dark:ring-stone-800`} />
          ))}
          <div className="w-5 h-5 rounded-full border-2 border-dashed border-stone-300 dark:border-stone-600" />
        </div>
      </div>
    </div>
  )
}

/* ─── Per-project header + details-card theme — every case study gets a distinct tint ─── */
interface SlugTheme {
  headerFrom: string
  cardBg: string
  cardBorder: string
  accentBar: string
}

const slugTheme: Record<string, SlugTheme> = {
  'decisions-ai-mobile-meeting-app': {
    headerFrom: 'from-teal-50/70 dark:from-teal-950/20',
    cardBg: 'from-teal-50/70 via-white to-stone-50 dark:from-teal-950/10 dark:via-stone-900 dark:to-stone-900/60',
    cardBorder: 'border-teal-200/70 dark:border-teal-800/30',
    accentBar: 'from-teal-400 via-teal-300 to-transparent dark:from-teal-500 dark:via-teal-600',
  },
  'pagevamp-onboarding-redesign': {
    headerFrom: 'from-emerald-50/70 dark:from-emerald-950/20',
    cardBg: 'from-emerald-50/70 via-white to-stone-50 dark:from-emerald-950/10 dark:via-stone-900 dark:to-stone-900/60',
    cardBorder: 'border-emerald-200/70 dark:border-emerald-800/30',
    accentBar: 'from-emerald-400 via-emerald-300 to-transparent dark:from-emerald-500 dark:via-emerald-600',
  },
  'avira-antivirus-redesign': {
    headerFrom: 'from-rose-50/70 dark:from-rose-950/20',
    cardBg: 'from-rose-50/70 via-white to-stone-50 dark:from-rose-950/10 dark:via-stone-900 dark:to-stone-900/60',
    cardBorder: 'border-rose-200/70 dark:border-rose-800/30',
    accentBar: 'from-rose-400 via-rose-300 to-transparent dark:from-rose-500 dark:via-rose-600',
  },
  'linkedin-feed-redesign': {
    headerFrom: 'from-blue-50/70 dark:from-blue-950/20',
    cardBg: 'from-blue-50/70 via-white to-stone-50 dark:from-blue-950/10 dark:via-stone-900 dark:to-stone-900/60',
    cardBorder: 'border-blue-200/70 dark:border-blue-800/30',
    accentBar: 'from-blue-400 via-blue-300 to-transparent dark:from-blue-500 dark:via-blue-600',
  },
  'nepal-pm-calendar': {
    headerFrom: 'from-indigo-50/70 dark:from-indigo-950/20',
    cardBg: 'from-indigo-50/70 via-white to-stone-50 dark:from-indigo-950/10 dark:via-stone-900 dark:to-stone-900/60',
    cardBorder: 'border-indigo-200/70 dark:border-indigo-800/30',
    accentBar: 'from-indigo-400 via-indigo-300 to-transparent dark:from-indigo-500 dark:via-indigo-600',
  },
  'streamshare-streaming-app-design': {
    headerFrom: 'from-purple-50/70 dark:from-purple-950/20',
    cardBg: 'from-purple-50/70 via-white to-stone-50 dark:from-purple-950/10 dark:via-stone-900 dark:to-stone-900/60',
    cardBorder: 'border-purple-200/70 dark:border-purple-800/30',
    accentBar: 'from-purple-400 via-purple-300 to-transparent dark:from-purple-500 dark:via-purple-600',
  },
  'stratus-maas-saas-dashboard-redesign': {
    headerFrom: 'from-sky-50/70 dark:from-sky-950/20',
    cardBg: 'from-sky-50/70 via-white to-stone-50 dark:from-sky-950/10 dark:via-stone-900 dark:to-stone-900/60',
    cardBorder: 'border-sky-200/70 dark:border-sky-800/30',
    accentBar: 'from-sky-400 via-sky-300 to-transparent dark:from-sky-500 dark:via-sky-600',
  },
  _default: {
    headerFrom: 'from-amber-50/70 dark:from-amber-950/20',
    cardBg: 'from-amber-50/70 via-white to-stone-50 dark:from-amber-950/10 dark:via-stone-900 dark:to-stone-900/60',
    cardBorder: 'border-amber-200/70 dark:border-amber-800/30',
    accentBar: 'from-amber-400 via-amber-300 to-transparent dark:from-amber-500 dark:via-amber-600',
  },
}

/* ─── Page ─── */

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = await getCaseStudy(slug)
  if (!study) notFound()

  const { frontmatter: fm, content } = study
  const otherWork = getOtherWork(slug)
  const workMeta = allWork.find((w) => w.slug === slug)
  const relatedPosts = getRelatedPosts(workMeta?.relatedBlogSlugs)
  const projectImages = getProjectImages(slug)
  const headings = extractHeadings(content)

  // Auto-detect images from public/images/work/[slug]/
  const imgDir = path.join(process.cwd(), 'public', 'images', 'work', slug)

  const heroImage: string | null = fs.existsSync(imgDir)
    ? (['hero.jpg', 'hero.jpeg', 'hero.png', 'hero.webp', 'hero.svg']
        .find((f) => fs.existsSync(path.join(imgDir, f)))
        ?.replace(/^/, `/images/work/${slug}/`) ?? projectImages?.hero ?? null)
    : (projectImages?.hero ?? null)

  const theme = slugTheme[slug] ?? slugTheme._default

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sanjayshrestha.com/' },
      { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://sanjayshrestha.com/work' },
      { '@type': 'ListItem', position: 3, name: fm.title, item: `https://sanjayshrestha.com/work/${slug}` },
    ],
  }

  const caseStudyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: fm.title,
    description: fm.description,
    url: `https://sanjayshrestha.com/work/${slug}`,
    ...(heroImage ? { image: `https://sanjayshrestha.com${heroImage}` } : {}),
    creator: { '@id': 'https://sanjayshrestha.com/#person' },
    about: fm.client,
    keywords: fm.tools?.join(', '),
    dateCreated: fm.year,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />
      {/* Back + Header */}
      <section className={`relative bg-gradient-to-b ${theme.headerFrom} to-transparent dark:to-transparent pt-28 pb-16`}>
        <div className="container-portfolio">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Work', href: '/work' },
              { label: fm.title },
            ]}
          />
          <div className="max-w-3xl mt-6">
            {/* Eyebrow + H1 render immediately, no entrance animation — H1 is the LCP element */}
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">
              {fm.type} · {fm.year}
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-[1.1] mb-4 text-balance">
              {fm.title}
            </h1>
            <AnimatedSection>
              <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
                {fm.description.includes('NDA-covered commercial project') ? (
                  <>
                    {fm.description.split('NDA-covered commercial project')[0]}
                    <strong className="font-bold text-stone-800 dark:text-stone-200">NDA-covered commercial project</strong>
                    {fm.description.split('NDA-covered commercial project')[1]}
                  </>
                ) : (
                  fm.description
                )}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-100 dark:bg-stone-800 rounded-lg">
                <span className="text-xs font-medium text-stone-600 dark:text-stone-300">
                  {fm.client}
                </span>
                <span className="text-stone-300 dark:text-stone-600" aria-hidden="true">·</span>
                <span className="text-xs font-medium text-stone-600 dark:text-stone-300">
                  {fm.role}
                </span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Hero image placeholder */}
      {/* Hero image — deliberately wider than the content column below */}
      <AnimatedSection delay={0.15}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          {projectImages?.heroBeforeAfter ? (
            <div className="[&_figure]:my-0 [&_.rounded-2xl]:rounded-3xl">
              <BeforeAfterSlider
                before={projectImages.heroBeforeAfter.before}
                after={projectImages.heroBeforeAfter.after}
                beforeAlt={projectImages.heroBeforeAfter.beforeAlt}
                afterAlt={projectImages.heroBeforeAfter.afterAlt}
              />
            </div>
          ) : (
            <div className={`w-full aspect-video rounded-3xl overflow-hidden relative bg-stone-100 dark:bg-stone-900`}>
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={`${fm.title} hero`}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-stone-50 to-amber-50/60 dark:from-stone-800 dark:via-stone-900 dark:to-amber-950/30" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="w-12 h-12 rounded-2xl border-2 border-stone-400 dark:border-stone-600" />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Project Details */}
      {(fm.roleItems?.length || fm.team?.length || fm.impact || fm.highlights?.length) && (
        <AnimatedSection delay={0.2}>
          <div className="container-portfolio mb-16">
            <div className={`relative overflow-hidden rounded-3xl border ${theme.cardBorder} bg-gradient-to-br ${theme.cardBg}`}>
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${theme.accentBar}`} />

              <div className="p-8 sm:p-10">
                <h2 className="font-heading text-xl font-bold text-stone-900 dark:text-stone-50 mb-8">
                  Project Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                  {fm.roleItems && fm.roleItems.length > 0 && (
                    <div>
                      <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-2">
                        <Briefcase size={13} aria-hidden="true" />
                        My Role
                      </p>
                      <p className="text-sm text-stone-700 dark:text-stone-300 mb-3">
                        <strong className="text-stone-900 dark:text-stone-50">{fm.role}.</strong>{' '}
                        {fm.roleSummary}
                      </p>
                      <ul className="space-y-1.5">
                        {fm.roleItems.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-400">
                            <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-600 mt-2 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-2">
                        <CalendarClock size={13} aria-hidden="true" />
                        Duration
                      </p>
                      <p className="text-sm text-stone-700 dark:text-stone-300">{fm.duration ?? fm.timeline}</p>
                    </div>

                    {fm.team && fm.team.length > 0 && (
                      <div>
                        <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-2">
                          <Users size={13} aria-hidden="true" />
                          Team
                        </p>
                        <ul className="space-y-1.5">
                          {fm.team.map((member) => (
                            <li key={member} className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-400">
                              <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-600 mt-2 shrink-0" />
                              {member}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {fm.impact && (
                  <div className="mb-8 rounded-2xl border border-amber-200/70 dark:border-amber-800/30 bg-white/70 dark:bg-stone-900/50 p-6">
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">
                      <TrendingUp size={13} aria-hidden="true" />
                      The Impact
                    </p>
                    {Array.isArray(fm.impact) ? (
                      <ul className="space-y-2">
                        {fm.impact.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 font-heading text-lg sm:text-xl font-semibold text-stone-900 dark:text-stone-50 leading-snug text-balance"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 mt-2.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="font-heading text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-50 leading-snug text-balance">
                        {fm.impact}
                      </p>
                    )}
                  </div>
                )}

                {fm.highlights && fm.highlights.length > 0 && (
                  <div className="pt-6 border-t border-stone-200/70 dark:border-stone-800">
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">
                      <Sparkles size={13} aria-hidden="true" />
                      Highlights
                    </p>
                    <ul className="space-y-3">
                      {fm.highlights.map((h) => (
                        <li key={h.title} className="flex items-start gap-2.5 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                          <span className="w-1 h-1 rounded-full bg-amber-500 mt-2 shrink-0" />
                          <span>
                            <strong className="font-semibold text-stone-900 dark:text-stone-50">{h.title}</strong>{' '}
                            {h.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Content + Sidebar */}
      <section className="pb-24">
        <div className="container-portfolio">
          <div className={clsx('grid grid-cols-1 gap-12', headings.length > 0 && 'lg:grid-cols-12')}>
            {/* Main content */}
            <AnimatedSection className={headings.length > 0 ? 'lg:col-span-8' : ''}>
              <div className="prose-portfolio prose prose-stone dark:prose-invert prose-headings:font-heading prose-headings:tracking-tight prose-headings:text-stone-900 dark:prose-headings:text-stone-50 prose-p:text-stone-600 dark:prose-p:text-stone-400 prose-li:text-stone-600 dark:prose-li:text-stone-400 prose-strong:text-stone-900 dark:prose-strong:text-stone-50 prose-a:text-amber-700 dark:prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline prose-hr:border-stone-200 dark:prose-hr:border-stone-800 prose-blockquote:border-amber-400 dark:prose-blockquote:border-amber-600 prose-blockquote:text-stone-600 dark:prose-blockquote:text-stone-400 prose-code:bg-stone-100 dark:prose-code:bg-stone-800 prose-code:text-stone-800 dark:prose-code:text-stone-200 max-w-none">
                <MDXRemote
                  source={content}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                  components={{ ...getMDXComponents(), WireframePlaceholder, UserFlowPlaceholder, MockupPlaceholder, VisualDesignPlaceholder, MediaFigure, MediaCarousel, BeforeAfterSlider, PrototypeViewer, TestimonialCarousel, FAQAccordion }}
                />
              </div>

              {/* Tools */}
              {fm.tools?.length > 0 && (
                <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800">
                  <p className="text-xs font-semibold text-stone-500 dark:text-stone-500 uppercase tracking-widest mb-3">
                    Tools Used
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {fm.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </AnimatedSection>

            {/* Sidebar */}
            {headings.length > 0 && (
              <AnimatedSection className="lg:col-span-4" delay={0.2}>
                <div className="sticky top-28">
                  <TableOfContents headings={headings} />
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>

      {/* ─── Related Reading ─── */}
      {relatedPosts.length > 0 && (
        <section className="pb-24 border-t border-stone-200 dark:border-stone-800 pt-20">
          <div className="container-portfolio">
            <AnimatedSection className="mb-10">
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-2">
                Related Reading
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-tight">
                From the Blog
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post, i) => (
                <AnimatedSection key={post.slug} delay={i * 0.08}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block h-full p-6 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-amber-300 dark:hover:border-amber-700 transition-colors duration-200"
                  >
                    <h3 className="font-heading font-semibold text-stone-900 dark:text-stone-50 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-amber-700 dark:text-amber-400 mt-3">
                      Read more <ArrowRight size={12} aria-hidden="true" />
                    </span>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── More Work ─── */}
      {otherWork.length > 0 && (
        <section className="pb-24 border-t border-stone-200 dark:border-stone-800 pt-20">
          <div className="container-portfolio">
            <AnimatedSection className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-2">
                  More Work
                </p>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-tight">
                  Other Case Studies
                </h2>
              </div>
              <Link
                href="/work"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors duration-200 cursor-pointer shrink-0"
              >
                View all <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherWork.map((study, i) => (
                <AnimatedSection key={study.slug} delay={i * 0.08}>
                  <CaseStudyCard {...study} />
                </AnimatedSection>
              ))}
            </div>

            <div className="mt-8 sm:hidden">
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors duration-200 cursor-pointer"
              >
                View all work <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
