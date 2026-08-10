import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { allWork } from '@/lib/work-data'

const BASE_URL = 'https://sanjayshrestha.com'

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

function fileLastModified(...segments: string[]): Date | undefined {
  const filePath = path.join(process.cwd(), ...segments)
  if (!fs.existsSync(filePath)) return undefined
  return fs.statSync(filePath).mtime
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getSlugsWithDates('blog')

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: fileLastModified('app', 'page.tsx'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: fileLastModified('app', 'about', 'page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: fileLastModified('app', 'portfolio', 'page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: fileLastModified('app', 'work', 'page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: fileLastModified('app', 'blog', 'page.tsx'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: fileLastModified('app', 'contact', 'page.tsx'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/accessibility`,
      lastModified: fileLastModified('app', 'accessibility', 'page.tsx'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const workRoutes: MetadataRoute.Sitemap = allWork.map((work) => ({
    url: `${BASE_URL}/work/${work.slug}`,
    lastModified: fileLastModified('content', 'work', `${work.slug}.mdx`),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map(({ slug, date }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: date ? new Date(date) : undefined,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...workRoutes, ...blogRoutes]
}
