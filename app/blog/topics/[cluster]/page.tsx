import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import AnimatedSection from '@/components/AnimatedSection'
import Breadcrumbs from '@/components/Breadcrumbs'
import BlogCard, { BlogPost } from '@/components/BlogCard'
import CaseStudyCard from '@/components/CaseStudyCard'
import { getMDXComponents } from '@/components/mdx-components'
import { CLUSTERS, CLUSTER_CASE_STUDIES, getCluster } from '@/lib/cluster-data'
import { allWork } from '@/lib/work-data'

interface ClusterFrontmatter {
  title: string
  seoTitle?: string
  excerpt: string
}

function getClusterContent(slug: string) {
  const filePath = path.join(process.cwd(), 'content', 'clusters', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { frontmatter: data as ClusterFrontmatter, content }
}

function getClusterPosts(slug: string): BlogPost[] {
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
    .filter((post) => post.cluster === slug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string }>
}): Promise<Metadata> {
  const { cluster: slug } = await params
  const cluster = getCluster(slug)
  const content = getClusterContent(slug)
  if (!cluster || !content) return { title: 'Topic Not Found' }
  const { frontmatter: fm } = content
  const metaTitle = fm.seoTitle ?? fm.title

  return {
    title: metaTitle,
    description: fm.excerpt,
    alternates: {
      canonical: `https://sanjayshrestha.com/blog/topics/${slug}`,
    },
    openGraph: {
      title: `${metaTitle} | Sanjay Shrestha`,
      description: fm.excerpt,
      url: `https://sanjayshrestha.com/blog/topics/${slug}`,
      siteName: 'Sanjay Shrestha',
      type: 'website',
      images: ['/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${metaTitle} | Sanjay Shrestha`,
      description: fm.excerpt,
      images: ['/og-image.jpg'],
    },
  }
}

export async function generateStaticParams() {
  return CLUSTERS.map((c) => ({ cluster: c.slug }))
}

export default async function ClusterHubPage({
  params,
}: {
  params: Promise<{ cluster: string }>
}) {
  const { cluster: slug } = await params
  const cluster = getCluster(slug)
  const content = getClusterContent(slug)
  if (!cluster || !content) notFound()

  const { frontmatter: fm, content: body } = content
  const posts = getClusterPosts(slug)
  const caseStudySlugs = CLUSTER_CASE_STUDIES[slug] ?? []
  const caseStudies = caseStudySlugs
    .map((s) => allWork.find((w) => w.slug === s))
    .filter((w): w is NonNullable<typeof w> => Boolean(w))

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: fm.title,
    description: fm.excerpt,
    url: `https://sanjayshrestha.com/blog/topics/${slug}`,
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
      { '@type': 'ListItem', position: 3, name: fm.title, item: `https://sanjayshrestha.com/blog/topics/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="pt-24 pb-16 bg-gradient-to-b from-stone-50/70 dark:from-stone-900/40 to-transparent dark:to-transparent">
        <div className="container-portfolio">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: fm.title },
            ]}
          />
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">
              Topic
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-[1.1] mb-4 text-balance">
              {fm.title}
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">{fm.excerpt}</p>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-portfolio">
          <AnimatedSection>
            <div className="max-w-[70ch] mx-auto prose prose-lg prose-stone dark:prose-invert prose-headings:font-heading prose-headings:tracking-tight prose-a:text-amber-700 dark:prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-stone-900 dark:prose-strong:text-stone-100">
              <MDXRemote
                source={body}
                components={getMDXComponents()}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="pb-24 border-t border-stone-200 dark:border-stone-800 pt-16">
          <div className="container-portfolio">
            <AnimatedSection className="mb-10">
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-2">
                In This Cluster
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-tight">
                Articles
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post, i) => (
                <AnimatedSection key={post.slug} delay={i * 0.06}>
                  <BlogCard {...post} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {caseStudies.length > 0 && (
        <section className="pb-24 border-t border-stone-200 dark:border-stone-800 pt-16">
          <div className="container-portfolio">
            <AnimatedSection className="mb-10">
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-2">
                Applied
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-tight">
                Related Case Studies
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudies.map((study, i) => (
                <AnimatedSection key={study.slug} delay={i * 0.08}>
                  <CaseStudyCard {...study} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
