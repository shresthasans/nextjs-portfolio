import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import Image from 'next/image'
import { clsx } from 'clsx'
import { ArrowUpRight, Clock } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import Breadcrumbs from '@/components/Breadcrumbs'
import BlogCard, { BlogPost } from '@/components/BlogCard'
import ReadingProgress from '@/components/ReadingProgress'
import { CUA_VERIFY_URL } from '@/lib/constants'
import TableOfContents from '@/components/TableOfContents'
import { getMDXComponents } from '@/components/mdx-components'
import MediaFigure from '@/components/MediaFigure'
import FAQAccordion from '@/components/FAQAccordion'
import SeriesNav from '@/components/SeriesNav'
import { getBlurDataURL } from '@/lib/blur-data'
import { extractHeadings } from '@/lib/toc'
import { getCluster } from '@/lib/cluster-data'
import { getLastCommitISODate } from '@/lib/content-dates'
import { getPublisherSchema } from '@/lib/person-schema'

interface BlogFrontmatter {
  title: string
  seoTitle?: string
  date: string
  updatedDate?: string
  readingTime: string
  tag: BlogPost['tag']
  excerpt: string
  coverImage?: string
  cluster?: string
  faqs?: { question: string; answer: string }[]
  evergreen?: boolean
}

function getPost(slug: string) {
  const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { frontmatter: data as BlogFrontmatter, content }
}

function getMorePosts(currentSlug: string, tag: string, limit = 3): BlogPost[] {
  const dir = path.join(process.cwd(), 'content', 'blog')
  if (!fs.existsSync(dir)) return []

  const others = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') && f.replace('.mdx', '') !== currentSlug)
    .map((filename) => {
      const slug = filename.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
      const { data } = matter(raw)
      return { slug, ...data } as BlogPost
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const sameTag = others.filter((p) => p.tag === tag)
  const diffTag = others.filter((p) => p.tag !== tag)
  return [...sameTag, ...diffTag].slice(0, limit)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Post Not Found' }
  const { frontmatter: fm } = post
  const metaTitle = fm.seoTitle ?? fm.title
  return {
    title: metaTitle,
    description: fm.excerpt,
    alternates: {
      canonical: `https://sanjayshrestha.com/blog/${slug}`,
    },
    openGraph: {
      title: `${metaTitle} | Sanjay Shrestha`,
      description: fm.excerpt,
      url: `https://sanjayshrestha.com/blog/${slug}`,
      siteName: 'Sanjay Shrestha',
      type: 'article',
      publishedTime: fm.date,
      ...(fm.updatedDate ? { modifiedTime: fm.updatedDate } : {}),
      images: [{ url: fm.coverImage ?? tagCoverImage[fm.tag], alt: metaTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${metaTitle} | Sanjay Shrestha`,
      description: fm.excerpt,
      images: [{ url: fm.coverImage ?? tagCoverImage[fm.tag], alt: metaTitle }],
    },
  }
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content', 'blog')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => ({ slug: f.replace('.mdx', '') }))
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const tagHeaderBg: Record<BlogPost['tag'], string> = {
  AI: 'from-amber-50/70 dark:from-amber-950/20',
  UX: 'from-blue-50/70 dark:from-blue-950/20',
  'Design Systems': 'from-purple-50/70 dark:from-purple-950/20',
  Career: 'from-emerald-50/70 dark:from-emerald-950/20',
  'Agent UX': 'from-cyan-50/70 dark:from-cyan-950/20',
}

const tagAccentBg: Record<BlogPost['tag'], string> = {
  AI: 'bg-amber-400 dark:bg-amber-500',
  UX: 'bg-blue-500 dark:bg-blue-500',
  'Design Systems': 'bg-purple-500 dark:bg-purple-500',
  Career: 'bg-emerald-500 dark:bg-emerald-500',
  'Agent UX': 'bg-cyan-500 dark:bg-cyan-500',
}

const tagCoverImage: Record<BlogPost['tag'], string> = {
  AI: 'https://placehold.co/1200x630/FFFBEB/B45309?text=AI+%26+Design&font=montserrat',
  UX: 'https://placehold.co/1200x630/EFF6FF/1D4ED8?text=UX+Research&font=montserrat',
  'Design Systems': 'https://placehold.co/1200x630/F5F3FF/6D28D9?text=Design+Systems&font=montserrat',
  Career: 'https://placehold.co/1200x630/ECFDF5/065F46?text=Career+Growth&font=montserrat',
  'Agent UX': 'https://placehold.co/1200x630/ECFEFF/0E7490?text=Agent+UX&font=montserrat',
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const { frontmatter: fm, content } = post
  const morePosts = getMorePosts(slug, fm.tag)
  const headings = extractHeadings(content)
  const cluster = fm.cluster ? getCluster(fm.cluster) : undefined

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: fm.title,
    description: fm.excerpt,
    image: `https://sanjayshrestha.com${fm.coverImage ?? tagCoverImage[fm.tag]}`,
    datePublished: fm.date,
    // updatedDate is an editorial signal (a substantive revision worth telling readers about,
    // not every typo fix) — it wins when set. Otherwise fall back to real git history for this
    // file, then to the publish date if neither is available.
    dateModified: fm.updatedDate ?? getLastCommitISODate(`content/blog/${slug}.mdx`) ?? fm.date,
    url: `https://sanjayshrestha.com/blog/${slug}`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#speakable-headline', '#speakable-summary'],
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://sanjayshrestha.com/blog/${slug}`,
    },
    author: {
      '@type': 'Person',
      '@id': 'https://sanjayshrestha.com/#person',
      name: 'Sanjay Shrestha',
      url: 'https://sanjayshrestha.com/about',
    },
    publisher: getPublisherSchema(),
  }

  const faqJsonLd = fm.faqs
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: fm.faqs.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
          },
        })),
      }
    : null

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sanjayshrestha.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://sanjayshrestha.com/blog' },
      { '@type': 'ListItem', position: 3, name: fm.title, item: `https://sanjayshrestha.com/blog/${slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <ReadingProgress />

      {/* Header */}
      <section className={`relative bg-gradient-to-b ${tagHeaderBg[fm.tag]} to-transparent dark:to-transparent pt-28 pb-16`}>
        <div className="container-portfolio">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              ...(cluster ? [{ label: cluster.name, href: `/blog/topics/${cluster.slug}` }] : []),
              { label: fm.title },
            ]}
          />

          <div className="max-w-3xl">
            {/* Eyebrow + H1 render immediately, no entrance animation — H1 is the LCP element */}
            <div className="flex items-center gap-2 mb-3">
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
                {fm.tag}
              </p>
              {cluster && (
                <>
                  <span className="text-stone-300 dark:text-stone-700" aria-hidden="true">·</span>
                  <Link
                    href={`/blog/topics/${cluster.slug}`}
                    className="text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors duration-200"
                  >
                    Part of {cluster.name} →
                  </Link>
                </>
              )}
            </div>
            <h1 id="speakable-headline" className="font-heading text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-[1.1] mb-4 text-balance">
              {fm.title}
            </h1>
            <AnimatedSection>
              <p id="speakable-summary" className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
                {fm.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 px-3 py-1.5 bg-stone-100 dark:bg-stone-800 rounded-lg">
                <Link href="/about" className="flex items-center gap-1.5 group whitespace-nowrap">
                  <span className="relative w-5 h-5 rounded-full overflow-hidden shrink-0">
                    <Image src="/images/profile/sanjay-avatar.webp" alt="" fill className="object-cover" />
                  </span>
                  <span className="text-xs font-medium text-stone-700 dark:text-stone-200 group-hover:text-amber-700 dark:group-hover:text-amber-400">
                    Sanjay Shrestha
                  </span>
                </Link>
                <span className="text-stone-300 dark:text-stone-600" aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 whitespace-nowrap">
                  <Clock size={12} aria-hidden="true" />
                  {fm.readingTime}
                </span>
                <span className="text-stone-300 dark:text-stone-600" aria-hidden="true">·</span>
                <span className="text-xs font-medium text-stone-600 dark:text-stone-300 whitespace-nowrap">
                  Published{' '}
                  <time dateTime={fm.date}>{formatDate(fm.date)}</time>
                </span>
                {fm.updatedDate && fm.updatedDate !== fm.date && (
                  <>
                    <span className="text-stone-300 dark:text-stone-600" aria-hidden="true">·</span>
                    <span className="text-xs font-medium text-amber-700 dark:text-amber-400 whitespace-nowrap">
                      Updated{' '}
                      <time dateTime={fm.updatedDate}>{formatDate(fm.updatedDate)}</time>
                    </span>
                  </>
                )}
                {fm.evergreen && (
                  <>
                    <span className="text-stone-300 dark:text-stone-600" aria-hidden="true">·</span>
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                      Evergreen — still accurate today
                    </span>
                  </>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Featured image — deliberately wider than the article column below */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <AnimatedSection delay={0.05}>
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900">
            <Image
              src={fm.coverImage ?? tagCoverImage[fm.tag]}
              alt={`Cover image for ${fm.title}`}
              fill
              className="object-contain"
              priority
              placeholder={getBlurDataURL(fm.coverImage ?? tagCoverImage[fm.tag]) ? 'blur' : 'empty'}
              blurDataURL={getBlurDataURL(fm.coverImage ?? tagCoverImage[fm.tag])}
            />
          </div>
        </AnimatedSection>
      </div>

      {/* Article body */}
      <section className="pb-24">
        <div className="container-portfolio">
          <div className={clsx('grid grid-cols-1 gap-12', headings.length > 0 && 'lg:grid-cols-12')}>
            {/* Main content */}
            <div className={headings.length > 0 ? 'lg:col-span-8' : 'max-w-[70ch] mx-auto w-full'}>
              <AnimatedSection delay={0.1}>
                <div className="max-w-[70ch] mx-auto prose prose-lg prose-stone dark:prose-invert prose-headings:font-heading prose-headings:tracking-tight prose-headings:leading-snug prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-a:text-amber-700 dark:prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-stone-900 dark:prose-strong:text-stone-100 prose-blockquote:border-l-amber-400 prose-blockquote:text-stone-600 dark:prose-blockquote:text-stone-400 prose-lead:text-stone-600 dark:prose-lead:text-stone-400 prose-hr:border-stone-200 dark:prose-hr:border-stone-800">
                  <MDXRemote
                    source={content}
                    components={{ ...getMDXComponents(), MediaFigure, FAQAccordion, SeriesNav }}
                    options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                  />
                </div>
              </AnimatedSection>

              <p className="max-w-[70ch] mx-auto mt-8 pt-4 border-t border-stone-200 dark:border-stone-800 text-left text-xs italic text-stone-400 dark:text-stone-500">
                This post was edited with AI assistance for clarity and formatting.
              </p>

              {/* Author card */}
              <AnimatedSection delay={0.2} className="mt-16 max-w-[70ch] mx-auto">
                <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 overflow-hidden flex">
                  <div className={`w-1 shrink-0 ${tagAccentBg[fm.tag]}`} aria-hidden="true" />
                  <div className="flex items-start gap-5 p-6 flex-1">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0">
                      <Image
                        src="/images/profile/sanjay-avatar.webp"
                        alt="Sanjay Shrestha"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-stone-900 dark:text-stone-50 text-sm mb-0.5">
                        Sanjay Shrestha
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">
                        Senior Product Designer ·{' '}
                        <a
                          href={CUA_VERIFY_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 hover:text-stone-900 dark:hover:text-stone-50"
                        >
                          CUA™ Certified
                        </a>
                      </p>
                      <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                        15+ years designing enterprise SaaS, B2B, and government digital products. Currently at Decisions.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

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

      {/* Continue reading */}
      {morePosts.length > 0 && (
        <section className="pb-24 border-t border-stone-200 dark:border-stone-800 pt-16">
          <div className="container-portfolio">
            <AnimatedSection className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-2">
                  Keep Reading
                </p>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-tight">
                  {morePosts.some((p) => p.tag === fm.tag) ? 'Related Posts' : 'More from the Blog'}
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors duration-200 cursor-pointer shrink-0"
              >
                All posts <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {morePosts.map((p, i) => (
                <AnimatedSection key={p.slug} delay={i * 0.08}>
                  <BlogCard {...p} />
                </AnimatedSection>
              ))}
            </div>

            <div className="mt-8 sm:hidden">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors duration-200 cursor-pointer"
              >
                All posts <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
