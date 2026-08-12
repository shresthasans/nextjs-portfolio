# Sanjay Shrestha — Portfolio

Personal portfolio site built with Next.js (App Router), TypeScript, and Tailwind CSS. Blog content is authored in MDX.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- MDX (`next-mdx-remote`, `gray-matter`, `remark-gfm`) for blog posts
- [Resend](https://resend.com/) for contact form email
- Deployed to Cloudflare Workers via `@opennextjs/cloudflare`

## Getting started

```bash
npm install
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

## Project structure

- `app/` — routes and pages (App Router), including `about`, `work`, `blog`, `portfolio`, `contact`, `resume`, `accessibility`, plus `sitemap.ts`, `robots.ts`, and `manifest.ts` for SEO/PWA
- `components/` — UI components
- `content/` — MDX blog posts and case studies
- `design-system/` — shared design tokens/primitives
- `lib/` — utilities and shared logic
- `public/` — static assets, incl. `images/` (WebP-optimized) and `resume/` (hosted resume PDF)

## Images

All images under `public/images/` are pre-optimized to WebP (converted via `sharp`) since `next/image` optimization is disabled (`images.unoptimized: true`, required for the Cloudflare Workers runtime). When adding new images, convert to WebP before committing rather than relying on `next/image` to do it at request time.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run check-content` | Validate blog/case-study frontmatter before publishing (see below) |
| `npm run pages:build` | Build via OpenNext for Cloudflare |
| `npm run preview` | Build + preview locally via Wrangler |
| `npm run deploy` | Build + deploy to Cloudflare Workers |

## Publishing new content (blog post / case study)

Run `npm run check-content` before pushing — it validates every `content/blog/*.mdx`
and `content/work/*.mdx` file against the conventions below and fails loudly if one's
missed. See [CONTENT_CHECKLIST.md](./CONTENT_CHECKLIST.md) for the items a script
can't check (alt text quality, internal linking, heading hierarchy).

## SEO/content Do's and Don'ts

Learned the hard way — each of these caused a real, silent bug at some point:

- **Do** register every new case study in `lib/work-data.ts`. A file in
  `content/work/*.mdx` renders fine on its own, but `sitemap.ts` and the `/work`
  index both read from `lib/work-data.ts`, not the filesystem — skip this step and
  the page is live but invisible to search engines and site navigation. Intentionally
  unlisted pages go in `UNLISTED_SLUGS` in `app/work/[slug]/page.tsx` instead.
- **Do** keep blog `tag` frontmatter to exactly `UX | Design Systems | AI | Career`.
  Frontmatter is untyped at read time (`gray-matter` returns `any`), so a typo like
  `"AI in Design"` doesn't fail the build — it just silently drops out of
  `tagPillColors`/`tagHeaderBg` lookups and renders unstyled.
- **Do** keep the `type` field in `lib/work-data.ts` to exactly
  `Enterprise | Government | SaaS | eCommerce` — same silent-lookup-miss risk via
  `CaseStudyCard`'s `typeColors`. Note this is a *different* field from the freeform
  `type` string in the MDX frontmatter, which is just displayed as text
  (`{fm.type} · {fm.year}`) and doesn't need to match the enum.
- **Do** keep blog `excerpt` to 133–158 characters and case-study `description` to
  roughly 70–160 — both feed the `<meta name="description">` tag directly; too long
  and Google truncates the search snippet mid-sentence.
- **Do** add a redirect in `next.config.mjs` → `redirects()` whenever a published
  URL is renamed or removed, rather than letting it 404. Genuinely dead content with
  no replacement goes in `middleware.ts`'s `GONE_EXACT`/`GONE_PREFIXES` (410, not a
  redirect to the homepage) — see the comment there for why.
- **Don't** run `npm run build && npm run start` on this repo to test locally. This
  project deploys via Cloudflare Workers (`@opennextjs/cloudflare`), and
  `next.config.mjs` calls `initOpenNextCloudflareForDev()` unconditionally on every
  config load — that hook expects `next dev`, and combining it with a `next start`
  production server breaks `/_next/static` asset serving entirely. Use `npm run dev`
  for local testing, `npm run preview` (Wrangler) to test the actual Cloudflare
  build, or `npm run deploy` to ship.
- **Don't** add a new same-origin `<iframe>` (like the PDF viewers on `/resume` and
  `/portfolio`) without checking `next.config.mjs` → `headers()`. The site-wide
  `X-Frame-Options: DENY` and `frame-ancestors 'none'` block *all* framing,
  including same-origin — those two routes needed a scoped header override to allow
  it. Copy that pattern for any new embed.

## Environment variables

Create a `.env.local` file (not committed) with any required secrets, e.g.:

```
RESEND_API_KEY=your_key_here
```

## Deployment

Deployed to Cloudflare Workers via OpenNext. `wrangler.jsonc` holds the Worker config. Run `npm run deploy` to build and deploy.
