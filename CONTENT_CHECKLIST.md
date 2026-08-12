# Publishing checklist — new blog post or case study

Run `npm run check-content` first. It catches the objective stuff automatically:
required frontmatter fields, tag/type enum drift, excerpt/description length,
missing images, and case studies that exist on disk but aren't registered in
`lib/work-data.ts` (which silently drops them from the sitemap and `/work` index).

What it can't check — verify these by eye before publishing:

## Blog post (`content/blog/<slug>.mdx`)

- [ ] `excerpt` reads well as a search snippet, not just the right length
- [ ] `seoTitle` set if the on-page `title` is long or not search-phrased
- [ ] `coverImage` is a real photo/graphic, not a placeholder, and is `.webp`
- [ ] First heading in the MDX body is `##`, not `#` — the page's own `<h1>` is the title
- [ ] Every image in the body has meaningful `alt` text (not filename, not empty)
- [ ] At least one internal link to a related post or case study
- [ ] `cluster` frontmatter set if the post fits one of `lib/cluster-data.ts`'s
      `CLUSTERS` — otherwise it won't appear on that topic's hub page at
      `/blog/topics/<cluster>` or get the "Part of ... →" link on the post itself
- [ ] If it obsoletes/replaces an old post, add a redirect in `next.config.mjs` →
      `redirects()`, don't just leave the old URL 404ing

## Case study (`content/work/<slug>.mdx`)

- [ ] Added a matching entry in `lib/work-data.ts` (this is the step that's easy to
      forget — the MDX page works standalone but is invisible to the sitemap and
      `/work` index without it). Skip only if intentionally unlisted — add the slug
      to `UNLISTED_SLUGS` in `app/work/[slug]/page.tsx` instead.
- [ ] `type` in `lib/work-data.ts` is one of `Enterprise | Government | SaaS | eCommerce`
      (this is a different field from the freeform `type` in the MDX frontmatter,
      which is just display text)
- [ ] `description` frontmatter reads well truncated at ~155 characters
- [ ] Dedicated OG image at `public/images/og/<slug>.jpg` (1200×630) — falls back to
      the generic homepage OG image otherwise, which is fine but generic
- [ ] `coverImage` path in `lib/work-data.ts` points to a real file
- [ ] `relatedBlogSlugs` (if any) point to posts that actually exist

## Either type

- [ ] `npx tsc --noEmit` clean
- [ ] `npm run build` clean (catches broken imports/routes the dev server won't)
- [ ] Loaded the page locally and checked it doesn't 404 or throw
- [ ] Checked dark mode doesn't clip/misrender anything new
