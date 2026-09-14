import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ArrowUpRight, Clock, Layers } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import Breadcrumbs from '@/components/Breadcrumbs'
import { BlogPost } from '@/components/BlogCard'
import { slugify } from '@/lib/toc'

function getAllPosts(): BlogPost[] {
  const dir = path.join(process.cwd(), 'content', 'blog')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
      const { data } = matter(raw)
      return { slug: filename.replace('.mdx', ''), ...data } as BlogPost
    })
}

function getSeriesPosts(slug: string): BlogPost[] {
  return getAllPosts()
    .filter((post) => post.series && slugify(post.series) === slug)
    .sort((a, b) => (a.seriesPart ?? 0) - (b.seriesPart ?? 0))
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export async function generateStaticParams() {
  const slugs = new Set(getAllPosts().filter((p) => p.series).map((p) => slugify(p.series!)))
  return Array.from(slugs).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const posts = getSeriesPosts(slug)
  if (posts.length === 0) return { title: 'Series Not Found' }
  const title = posts[0].series!
  const description = posts[0].seriesDescription ?? posts[0].excerpt

  return {
    title: `${title} | Series`,
    description,
    alternates: {
      canonical: `https://sanjayshrestha.com/blog/series/${slug}`,
    },
    openGraph: {
      title: `${title} | Sanjay Shrestha`,
      description,
      url: `https://sanjayshrestha.com/blog/series/${slug}`,
      siteName: 'Sanjay Shrestha',
      type: 'website',
      images: ['/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Sanjay Shrestha`,
      description,
      images: ['/og-image.jpg'],
    },
  }
}

export default async function SeriesHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const posts = getSeriesPosts(slug)
  if (posts.length === 0) notFound()

  const title = posts[0].series!
  const total = posts[0].seriesTotal ?? posts.length

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description: posts[0].seriesDescription ?? posts[0].excerpt,
    url: `https://sanjayshrestha.com/blog/series/${slug}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: post.title,
        url: `https://sanjayshrestha.com/blog/${post.slug}`,
      })),
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sanjayshrestha.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://sanjayshrestha.com/blog' },
      { '@type': 'ListItem', position: 3, name: title, item: `https://sanjayshrestha.com/blog/series/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="pt-24 pb-16 bg-gradient-to-b from-stone-50/70 dark:from-stone-900/40 to-transparent dark:to-transparent">
        <div className="container-portfolio">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: title }]} />
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
                Series
              </p>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-medium border bg-stone-50 text-stone-600 border-stone-200 dark:bg-stone-800/60 dark:text-stone-300 dark:border-stone-700">
                <Layers size={12} aria-hidden="true" />
                {total}-part series · {posts.length} published
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-[1.1] mb-4 text-balance">
              {title}
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              {posts[0].seriesDescription ?? posts[0].excerpt}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-portfolio">
          <div className="max-w-3xl mx-auto divide-y divide-stone-200 dark:divide-stone-800 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 overflow-hidden">
            {posts.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.03}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-start gap-4 sm:gap-5 p-5 sm:p-6 hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-colors duration-200"
                >
                  <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-xs font-semibold tabular-nums text-stone-600 dark:text-stone-300">
                    {post.seriesPart}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-heading font-semibold text-stone-900 dark:text-stone-50 text-base sm:text-lg leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-200">
                      {post.seriesShortTitle ?? post.title}
                    </h2>
                    <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2 mt-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mt-2">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span aria-hidden="true">·</span>
                      <Clock size={11} aria-hidden="true" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 mt-1 text-stone-300 dark:text-stone-600 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200"
                    aria-hidden="true"
                  />
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
