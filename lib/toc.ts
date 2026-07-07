export interface TocHeading {
  id: string
  text: string
  level: 2 | 3
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function extractHeadings(markdown: string): TocHeading[] {
  const headings: TocHeading[] = []
  const seen = new Map<string, number>()

  for (const line of markdown.split('\n')) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim())
    if (!match) continue

    const level = match[1].length as 2 | 3
    const text = match[2].trim()
    let id = slugify(text)

    const count = seen.get(id) ?? 0
    seen.set(id, count + 1)
    if (count > 0) id = `${id}-${count}`

    headings.push({ id, text, level })
  }

  return headings
}
