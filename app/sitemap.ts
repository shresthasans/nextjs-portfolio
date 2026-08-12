import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { allWork } from '@/lib/work-data'
import { CLUSTERS } from '@/lib/cluster-data'

const BASE_URL = 'https://sanjayshrestha.com'

// lastModified values below are hand-set to the date content actually last changed,
// not derived from file mtime or Date.now() — a fresh CI checkout resets every file's
// mtime to the same instant, which is what made every route's lastmod nearly identical
// on every deploy. Bump a date here only when that page's real content changes, not on
// every metadata/perf/SEO tweak.
const PAGE_LAST_MODIFIED: Record<string, string> = {
  '/': '2026-08-11', // added the "Latest from the blog" section
  '/about': '2026-08-11', // wired case-study link into career highlights
  '/work': '2026-07-09', // case-study card style unification
  '/blog': '2026-08-10', // blog/case-study content revamp
  '/contact': '2026-07-07', // unchanged since initial build
  '/accessibility': '2026-08-11', // page added
  topics: '2026-08-12', // blog topic-cluster hub pages added
}

// Case studies without their own lastModified frontmatter fall back to this — the last
// content revamp that touched all of them together.
const WORK_CONTENT_REVAMP_DATE = '2026-08-10'

function getSlugsWithDates(dir: string): { slug: string; date?: string }[] {
  const fullDir = path.join(process.cwd(), 'content', dir)
  if (!fs.existsSync(fullDir)) return []
  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(fullDir, filename), 'utf-8')
      const { data } = matter(raw)
      return { slug: filename.replace('.mdx', ''), date: data.date }
    })
}

function getWorkLastModified(slug: string): Date {
  const filePath = path.join(process.cwd(), 'content', 'work', `${slug}.mdx`)
  if (fs.existsSync(filePath)) {
    const { data } = matter(fs.readFileSync(filePath, 'utf-8'))
    if (data.lastModified) return new Date(data.lastModified)
  }
  return new Date(WORK_CONTENT_REVAMP_DATE)
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getSlugsWithDates('blog')

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(PAGE_LAST_MODIFIED['/']),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(PAGE_LAST_MODIFIED['/about']),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: new Date(PAGE_LAST_MODIFIED['/work']),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(PAGE_LAST_MODIFIED['/blog']),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(PAGE_LAST_MODIFIED['/contact']),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/accessibility`,
      lastModified: new Date(PAGE_LAST_MODIFIED['/accessibility']),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const workRoutes: MetadataRoute.Sitemap = allWork.map((work) => ({
    url: `${BASE_URL}/work/${work.slug}`,
    lastModified: getWorkLastModified(work.slug),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map(({ slug, date }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: date ? new Date(date) : undefined,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const topicRoutes: MetadataRoute.Sitemap = CLUSTERS.map((cluster) => ({
    url: `${BASE_URL}/blog/topics/${cluster.slug}`,
    lastModified: new Date(PAGE_LAST_MODIFIED.topics),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...workRoutes, ...blogRoutes, ...topicRoutes]
}
