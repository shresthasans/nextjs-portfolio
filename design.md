# Design System & UI Conventions

This document describes the design system **as implemented** in this repository. It is a reference for developers, designers, and AI coding agents building or modifying UI here. It reflects what the code actually does, not an aspirational ideal.

Evidence basis: `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`, all files in `components/`, and representative pages (`app/page.tsx` + `components/HomePageClient.tsx`, `app/work/page.tsx`, `app/work/[slug]/page.tsx`, `app/blog/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`, the three `*-nepal` SEO landing pages, and MDX case studies in `content/work/`).

---

## 1. Stack

- **Next.js 15** App Router, React 19, TypeScript.
- **Tailwind CSS 3** with `@tailwindcss/typography`. No component library (no shadcn/ui, no MUI, no Radix). All UI is hand-built with Tailwind utility classes.
- **framer-motion** for all animation (scroll reveals, mobile menu, status transitions).
- **lucide-react** is the only icon library in use.
- **clsx** for conditional className composition (not `tailwind-merge` directly in components, despite being a dependency — see Audit).
- Content-heavy pages (`content/work/*.mdx`, `content/blog/*.mdx`) render via `next-mdx-remote`, styled through `components/mdx-components.tsx` plus the Tailwind Typography plugin.

There is **no shared `components/ui/` primitives folder** (no `Button.tsx`, `Card.tsx`, `Input.tsx`, `Modal.tsx`, `Badge.tsx`). Buttons, form fields, and badges are hand-written inline with repeated Tailwind class strings. This is the current reality of the codebase — see the [Audit](#7-design-system-audit) for the implications.

---

## 2. Design tokens

### 2.1 Color

Two systems coexist. **Only one is actually used.**

- **Tailwind's built-in `stone` and `amber` palettes, used directly** (e.g. `bg-stone-900`, `text-amber-700`) — this is the real, current convention. Confirmed by frequency: `stone-*` and `amber-*` classes appear hundreds of times across `app/` and `components/`.
- A custom `accent` color scale is defined in `tailwind.config.ts` (`accent.DEFAULT` through `accent.900`, mapped to the same hex values as Tailwind's `amber`) and CSS variables `--background`, `--foreground`, `--accent` are defined in `app/globals.css`. **Neither is referenced anywhere in `app/` or `components/`.** They are dead configuration. Do not introduce new code that references `accent-*` or `var(--accent)` — use `amber-*` and `stone-*` directly, matching the rest of the codebase.

**Semantic roles actually in use:**

| Role | Classes | Where |
|---|---|---|
| Neutral / surface / text | `stone-50` … `stone-950` | Page background, body text, borders, cards, everywhere |
| Brand accent / interactive / hover | `amber-400` … `amber-700` | Links on hover, active nav state, primary CTA hover, focus rings, headings-on-hover, blockquote rule, dividers |
| Success / "available" / positive stat | `emerald-*` | Availability badge (Footer, Contact), form success state, eCommerce case-study badge |
| Error / destructive | `red-*` | Form validation errors, form error state, "made with ❤" heart (decorative, not semantic) |
| Info / neutral highlight | `blue-*` | `<mark>` highlight style (globals.css + mdx-components), "Enterprise" case-study category badge |
| Category badges (case studies) | `blue` (Enterprise), `purple` (Government), `amber` (SaaS), `emerald` (eCommerce) | `components/CaseStudyCard.tsx` `typeColors` / `typeVisualBg` maps |
| Category badges (blog tags) | `blue` (UX), `purple` (Design Systems), `amber` (AI), `emerald` (Career), `cyan` (Agent UX) | `components/BlogCard.tsx` `tagPillColors` map |

**Dark mode** is class-based (`darkMode: 'class'` in `tailwind.config.ts`). Every color utility is paired with a `dark:` variant inline, e.g. `text-stone-900 dark:text-stone-50`, `bg-stone-100 dark:bg-stone-800`. There is no dark-mode CSS-variable indirection in components — it's Tailwind's `dark:` prefix everywhere. Follow this pattern for any new UI: **every stone/amber/emerald/red/blue utility needs an explicit `dark:` counterpart.**

Theme switching is handled by `components/ThemeProvider.tsx`: reads `localStorage('theme')`, falls back to `prefers-color-scheme`, toggles the `dark` class on `<html>`. `components/Nav.tsx` exposes the toggle button.

### 2.2 Typography

- **Headings**: `font-heading` → Archivo (`--font-archivo`, loaded via `next/font/google` in `app/layout.tsx`), weight range 300–900. Applied globally to `h1`–`h6` in `app/globals.css` (`@layer base`): `font-heading font-semibold tracking-tight`.
- **Body**: `font-sans` → Space Grotesk (`--font-space-grotesk`), weights 300–700. This is the default (`font-sans` is the Tailwind default key, remapped in `tailwind.config.ts`), applied to `body` in `globals.css`.
- **Scale in practice** (by observed frequency across pages):
  - Page `<h1>` hero: `text-5xl sm:text-6xl font-bold ... leading-[1.1] text-balance` (e.g. `app/work/page.tsx:72`, `app/blog/page.tsx:104`, `app/contact/page.tsx:58`).
  - Homepage hero is the one outlier, going larger: `text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem]` (`components/HomePageClient.tsx:246`) — an arbitrary Tailwind value, used once, homepage-only.
  - Section `<h2>`: `text-4xl` or `text-4xl sm:text-5xl font-bold tracking-tight`.
  - Card/subsection `<h3>`: `text-lg` or `text-xl`, `font-heading font-semibold`.
  - Eyebrow/label text above headings: `text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400`.
  - Body copy: `text-sm` or `text-base`, `text-stone-600 dark:text-stone-400`, `leading-relaxed`.
  - Micro text (badges, meta, captions): `text-xs`.
- `text-balance` (custom utility in `app/globals.css`, wraps CSS `text-wrap: balance`) is applied to most hero `<h1>`s to prevent ragged line breaks.
- MDX/long-form prose (case studies, blog posts) uses the Typography plugin via a `prose` class plus the project's `.prose-portfolio` utility (max-width 70ch), with heavy customization in `tailwind.config.ts theme.extend.typography` (heading sizes, list spacing, table styling, blockquote, code, hr). **However**, `components/mdx-components.tsx` overrides `table`, `th`, `td`, `blockquote`, `hr`, `mark`, and `strong` with hand-written JSX — meaning the Typography plugin's config for those same elements (table styling in particular) is **not actually reachable** for MDX-rendered content. See [Audit](#7-design-system-audit).

### 2.3 Spacing, radius, borders, elevation

- **Container**: `.container-portfolio` (`app/globals.css`) → `max-w-6xl mx-auto px-6 sm:px-8 lg:px-12`. Used consistently across every page (`app/about/page.tsx`, `app/work/page.tsx`, `app/blog/page.tsx`, `components/HomePageClient.tsx`, `components/Footer.tsx`, etc.) — this is the canonical page-width wrapper. New pages/sections should use it rather than hand-rolling `max-w-* mx-auto px-*`.
- **Section vertical rhythm**: `py-20` is the dominant section padding (20 occurrences), with `py-28`/`py-16`/`py-24`/`py-32` as deliberate variants for hero sections or the footer's `mt-32` top-gap. There's no named spacing scale beyond Tailwind's defaults — no `--space-*` custom tokens.
- **Border radius**: no custom radius scale; plain Tailwind values used directly, in this rough hierarchy by usage:
  - `rounded-full` — pills, badges, avatar/dot indicators, icon buttons (60 occurrences, most common).
  - `rounded-lg` — buttons, nav links, small tags (42).
  - `rounded-2xl` — cards, panels, form containers, accordions (35).
  - `rounded-xl` — form inputs, icon tiles, secondary containers (31).
  - `rounded-3xl` — large feature panels/CTAs (9, e.g. the closing CTA block in `app/about/page.tsx`).
  - `rounded-md`/`rounded-sm` are rare, effectively legacy/one-off.
- **Borders**: `border border-stone-200 dark:border-stone-800` (light-mode hairline, dark-mode slightly heavier) is the standard container border everywhere: nav, footer, cards, form, accordion.
- **Elevation**: no custom shadow tokens. `shadow-sm`/`shadow-md` for subtle nav/card lift; `hover:shadow-lg dark:hover:shadow-stone-950/50` is the hover-elevation pattern on interactive cards (`CaseStudyCard.tsx`). Dark-mode shadows use an arbitrary opacity-modified `stone-950` shadow color rather than Tailwind's default shadow (which is invisible on dark backgrounds) — this is the correct/intentional pattern for shadows in dark mode here, not an inconsistency.

### 2.4 Icons

`lucide-react` exclusively. Sizes cluster tightly: **12–18px for inline/UI icons** (14 is the single most common size), 24–40px reserved for larger status/empty-state icons (e.g. `CheckCircle`/`AlertCircle` at `size={40}` in the contact form's success/error states). Icons are almost always paired with `aria-hidden="true"` when decorative, or a visible/`sr-only` label when meaningful (see [Accessibility](#6-accessibility-patterns)).

### 2.5 Breakpoints

Standard Tailwind breakpoints (`sm`, `md`, `lg`, `xl`); no custom breakpoints defined in `tailwind.config.ts`. Usage frequency: `sm:` and `lg:` dominate; `md:` is used sparingly (mostly for the nav's desktop-link cutoff); `xl:` is rare (homepage hero font size, a couple of grid tweaks). **Mobile-first, with `lg:` as the primary "desktop layout" breakpoint** for multi-column grids (e.g. `lg:grid-cols-2`, `lg:grid-cols-[minmax(0,3fr)_minmax(0,4fr)]` in `CaseStudyRow`).

---

## 3. Layout patterns

- **Root shell** (`app/layout.tsx`): a skip-to-content link → `<Nav />` (fixed, full-width) → `<main id="main-content">` → `<Footer />`, all wrapped in `ThemeProvider` and `MotionConfig reducedMotion="user"`.
- **Nav** (`components/Nav.tsx`): fixed top bar, `bg-stone-50/90 backdrop-blur-md`, active-route highlighting via `usePathname()` + `clsx`, a `Sun`/`Moon` theme toggle, a primary "Get in touch" CTA, and a `framer-motion` `AnimatePresence` mobile drawer under `md`.
- **Page sections** are typically `<section className="py-20">` (or a hero variant) wrapping `<div className="container-portfolio">`, with content further wrapped in `<AnimatedSection>` for scroll-reveal.
- **Case study index** (`app/work/page.tsx`) uses `CaseStudyCard` in a grid for the browse view, and `content/work/*.mdx` detail pages (`app/work/[slug]/page.tsx`) use a hero + `Breadcrumbs` + MDX body + `TableOfContents` (desktop sidebar) + related-work `CaseStudyCard` grid at the bottom.
- **Alternating image/content rows** (`CaseStudyRow` in `components/CaseStudyCard.tsx`, used on the homepage) use a CSS grid with the image always laid out via `grid-column`/`grid-row` placement (not the `order` property) so DOM order and visual order stay decoupled deliberately — documented inline at `components/CaseStudyCard.tsx:207`.
- **Footer** (`components/Footer.tsx`): 4-column responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`) — brand/status, page nav, location-SEO nav, contact links — then a bottom bar with copyright and a "Made with ♥" note.

---

## 4. Components (as they exist)

No `components/ui/` primitives exist. What's in `components/` is a flat list of page-level and content-level components:

| Component | Role |
|---|---|
| `AnimatedSection.tsx` | Scroll-triggered fade/slide-in wrapper (`AnimatedSection`, `StaggerContainer`, `StaggerItem`) — **the** motion primitive, used on nearly every page section |
| `Nav.tsx` / `Footer.tsx` | Global chrome |
| `ThemeProvider.tsx` | Light/dark context + toggle |
| `Breadcrumbs.tsx` | `<ol>`-based trail with `aria-current="page"` on the last item |
| `CaseStudyCard.tsx` | Grid card (`CaseStudyCard`) + alternating row (`CaseStudyRow`) for work items; owns the category-color map |
| `BlogCard.tsx` / `BlogIndex.tsx` | Blog listing card + index/filter shell |
| `SeriesCard.tsx` / `SeriesNav.tsx` | Multi-part blog series navigation |
| `ClusterNav.tsx` | Topic-cluster navigation for blog |
| `FAQAccordion.tsx` | Native `<details>`/`<summary>` accordion — no JS state, no animation library involved |
| `MediaFigure.tsx` / `MediaFrame.tsx` / `MediaCarousel.tsx` / `BeforeAfterSlider.tsx` / `PrototypeViewer.tsx` / `TagGraphic.tsx` | Case-study visual/media presentation, used inside MDX |
| `Testimonials.tsx` / `TestimonialCarousel.tsx` | Homepage/about testimonial display, backed by `lib/testimonials.ts` |
| `TableOfContents.tsx` / `ReadingProgress.tsx` | Long-form article chrome (blog/case-study detail pages) |
| `mdx-components.tsx` | Overrides for MDX-rendered `h2`/`h3`/`blockquote`/`hr`/`mark`/`strong`/`table`/`th`/`td` |
| `HomePageClient.tsx` | The entire homepage body (client component, largest single file) |

### Buttons (no shared component — two recurring inline patterns)

**Primary CTA** (amber-accented on hover, dark fill):
```

inline-flex items-center gap-2 px-7 py-3.5 bg-amber-600 hover:bg-amber-500
text-white rounded-lg font-medium text-sm transition-colors duration-200 cursor-pointer

```
(e.g. `app/about/page.tsx` closing CTA)

**Secondary / nav CTA** (inverse stone fill, amber on hover):
```

inline-flex items-center px-4 py-1.5 bg-stone-900 dark:bg-stone-50
text-stone-50 dark:text-stone-900 rounded-lg text-sm font-medium
hover:bg-amber-700 dark:hover:bg-amber-400 transition-colors duration-200 cursor-pointer

```
(`components/Nav.tsx`, the contact form submit button, mobile menu CTA)

Both patterns are copy-pasted verbatim across multiple files rather than extracted into a `<Button>` component. **This is the current, working convention** — match it exactly (including `cursor-pointer`, which Tailwind doesn't add by default to non-button-styled elements) when adding new buttons, rather than introducing a new visual style.

### Form fields (`app/contact/page.tsx` is the only real form; treat it as the reference)

```

w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700
bg-stone-50 dark:bg-stone-800/50 text-stone-900 dark:text-stone-50
placeholder-stone-400 dark:placeholder-stone-500 text-sm
focus:outline-none focus:ring-2 focus:ring-amber-600 dark:focus:ring-amber-400
transition-colors duration-200

```
Paired with a `<label>` in `text-sm font-medium text-stone-700 dark:text-stone-300`, and inline validation errors as `<p role="alert" id="{field}-error" className="text-xs text-red-600 dark:text-red-400">` referenced via `aria-describedby`/`aria-invalid` on the input. Client-side validation is plain state (`useState`) with a hand-written `validate()` function — no form library (no `react-hook-form`, no `zod` on the client).

### Badges / pills

Two flavors, both `rounded-full`:
- **Status/live indicator** (availability, "Based in Kathmandu"): `inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-full`, with a small `animate-pulse` dot.
- **Category tag** (case-study type, blog tags): `inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border`, colored via a `Record<Category, colorClasses>` map local to the owning component — `typeColors` in `CaseStudyCard.tsx`, `tagPillColors` in `BlogCard.tsx`. This "per-content-type color map, not a global badge component" is the established pattern for adding a new category system (e.g. a third taxonomy would get its own `Record` map, following the same five-ish-hue rotation of blue/purple/amber/emerald/cyan).

### Accordion

`FAQAccordion.tsx` uses native `<details>`/`<summary>` with `[&::-webkit-details-marker]:hidden` and a rotating `ChevronRight` icon — no JS-driven open/close state, no animation library. This is the preferred pattern for simple disclosure UI in this codebase; don't reach for `framer-motion` or a controlled-state accordion unless the interaction genuinely needs it.

---

## 5. Motion

- All animation goes through **framer-motion**. There is no CSS-only animation system beyond the two keyframes defined in `tailwind.config.ts` (`fade-up`, `fade-in`) — search shows these are largely superseded by the `AnimatedSection` component in practice.
- **Standard scroll-reveal**: wrap a section in `<AnimatedSection>` (fade + 32px directional slide, 0.6s, custom ease `[0.21, 0.47, 0.32, 0.98]`, triggers once via `useInView` with `-80px` margin). Use `<StaggerContainer>` + `<StaggerItem>` for lists/grids that should reveal in sequence (0.1s stagger by default).
- **Transient UI state** (mobile menu open/close, form success/error swap) uses `AnimatePresence` with a simple opacity + small y/scale transition, ~0.2–0.4s, `easeOut`.
- `MotionConfig reducedMotion="user"` is set once at the root (`app/layout.tsx`), so all framer-motion animation already respects the user's OS-level reduced-motion preference. `app/globals.css` also has a `@media (prefers-reduced-motion: reduce)` block that force-shortens plain CSS transitions/animations to near-zero. **New motion should rely on these existing mechanisms rather than adding its own reduced-motion handling.**
- Hover/focus micro-interactions are plain CSS: `transition-colors duration-200` is the near-universal choice for color/background hover states; `transition-transform duration-500` for image scale-on-hover (`CaseStudyCard.tsx`).

---

## 6. Accessibility patterns

Confirmed in place, consistently:
- Skip-to-content link (`app/layout.tsx`), landmark `<main id="main-content" tabIndex={-1}>`.
- `:focus-visible` gets a visible amber outline globally (`app/globals.css`), not just a browser default.
- Icon-only buttons (theme toggle, mobile hamburger) always carry `aria-label`, plus `aria-pressed`/`aria-expanded`/`aria-controls` where relevant (`components/Nav.tsx`).
- Decorative icons/SVGs consistently get `aria-hidden="true"`; meaningful icon+text pairs put the real label in visible text or `sr-only` (e.g. Footer's "Made with ♥ in Kathmandu" uses `<span className="sr-only">love</span>`).
- Form fields: every `<input>`/`<textarea>` has a matching `<label htmlFor>`, `aria-invalid`, and `aria-describedby` pointing at a `role="alert"` error message (`app/contact/page.tsx`).
- Breadcrumbs use `<nav aria-label="Breadcrumb"><ol>` with `aria-current="page"` on the active item.
- Nav landmarks are explicitly labeled where there are multiple (`aria-label="Main navigation"`, `aria-label="Footer navigation"`, `aria-label="Location-focused pages"`).
- `prefers-reduced-motion` is respected both at the framer-motion level (`MotionConfig`) and via a global CSS fallback.

This is a strong, consistent baseline — **new interactive components should match this bar** (labeled icon buttons, described/invalid form fields, `aria-current` for current-state nav items) rather than needing to reinvent it.

---

## 7. Design System Audit

Issues found in the repository as of this writing. This section is diagnostic, not prescriptive — see [§8](#8-recommendations-separate-from-current-state) for suggested fixes.

### Dead/unused tokens
- **`accent` color scale** in `tailwind.config.ts` (theme.extend.colors.accent, 50–900) — zero usages found (`grep` for `accent-` and `bg-accent`/`text-accent`/`border-accent` across `app/` and `components/` returns nothing).
- **CSS variables `--background`, `--foreground`, `--accent`** in `app/globals.css` — defined for both light and dark, never referenced via `var(...)` anywhere in the codebase. `body`'s actual background/text comes from Tailwind utility classes (`bg-stone-50 dark:bg-stone-950`), not these variables.

### Duplicate/conflicting styling paths
- **Table styling is defined twice** and only one definition is reachable: `tailwind.config.ts theme.extend.typography.DEFAULT.css` has detailed `table`/`thead`/`tbody`/`th`/`td` rules for the `.prose` class, but `components/mdx-components.tsx` overrides `table`/`th`/`td` as hand-written JSX for all MDX content — meaning the Typography config for tables is currently dead for every actual case study/blog table (which are all MDX). The same double-definition risk exists for `blockquote`, `hr`, `strong`, and `code`/`mark` — mdx-components.tsx also overrides `blockquote`, `hr`, `mark`, and `strong`.
- **No shared `<Button>` component**: two visually-distinct button styles are hand-copied across `Nav.tsx`, `Footer.tsx` (implicitly, via links), `app/about/page.tsx`, `app/contact/page.tsx`, and the three `*-nepal` pages. They are currently *consistent in practice* (copy-paste has stayed faithful), but there's no single source of truth, so a future edit to "the" button style requires a multi-file find-and-replace.
- **No shared form-field or badge component** either, for the same reason — the contact form's input styling and the badge/pill styling are each duplicated by hand wherever they appear.

### Hardcoded / arbitrary values
- `xl:text-[5.25rem]` in `components/HomePageClient.tsx:246` — a one-off arbitrary Tailwind value for the homepage hero, not part of any documented scale. Intentional-looking (biggest hero on the site) but not reusable.
- Inline `style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}` in `CaseStudyRow` (`components/CaseStudyCard.tsx:229`) — a responsive font-size implemented outside Tailwind's breakpoint system. **Needs review**: unclear if this is a deliberate escape hatch for fluid typography (no Tailwind breakpoint utility does this natively) or an inconsistency that should become a set of `text-*` breakpoint classes.

### Inconsistent/legacy signals
- Icon sizes are not on a strict token scale — values from 10 to 18px are all in use for what appear to be visually-equivalent "inline icon" contexts (14 is most common but not universal). **Needs review**: whether this is deliberate per-context tuning or drift.
- `rounded-md` and `rounded-sm` appear only once or twice each, vs. dozens of uses of `rounded-lg`/`rounded-xl`/`rounded-2xl`/`rounded-full`. These read as one-offs rather than an intentional part of the radius scale.
- `tailwind-merge` is a listed dependency (`package.json`) but not obviously used in any component inspected (`clsx` is what's actually used for conditional classes). **Needs review**: confirm with a full-repo search before removing, in case it's used in a file outside the sampled set.

### Accessibility gaps
- None found in the representative sample. The patterns in [§6](#6-accessibility-patterns) were consistent across `Nav`, `Footer`, `Breadcrumbs`, and the contact form. A full audit would need to check every MDX case study individually for image `alt` text quality, since that content is hand-authored per file rather than componentized.

### Opportunities for standardization (not currently blocking, just noted)
- Extracting the two button patterns, the form-field pattern, and the badge/pill pattern into real components would remove the copy-paste risk noted above, without changing any visual output (the current styling is already consistent).
- The `accent` token and unused CSS variables could be removed once confirmed unused repo-wide, to stop them from misleading a future contributor into using them.

---

## 8. Recommendations (separate from current state)

These are *suggestions*, not documentation of what exists. Do not treat this section as describing current behavior.

- If a component library is ever introduced, it should sit alongside — not replace — the existing `stone`/`amber` palette and Archivo/Space Grotesk fonts, since those are load-bearing across dozens of files.
- If extracting a `<Button>` component, model it exactly on the two class strings documented in [§4](#4-components-as-they-exist) rather than redesigning, to avoid a visual regression across the many pages that currently hand-roll them.
- Before adding new color usage, prefer extending the semantic roles in [§2.1](#21-color) (e.g. a new badge category) over introducing a new hue not already in `stone`/`amber`/`emerald`/`red`/`blue`/`purple`.

---

## 9. Rules for AI Agents

When creating or modifying UI in this repository:

**Do:**
- Use `stone-*` for all neutral/surface/text color, `amber-*` for brand accent/interactive/hover states. Always pair every color utility with an explicit `dark:` variant.
- Use `.container-portfolio` for page-width wrapping; `py-20` as the default section vertical padding unless matching an existing hero's larger padding.
- Use `font-heading` (Archivo) for headings, the default `font-sans` (Space Grotesk) for body text. Apply `tracking-tight` and `font-bold`/`font-semibold` to headings, matching existing hero (`text-5xl sm:text-6xl`) and section (`text-4xl` or `text-4xl sm:text-5xl`) scales.
- Copy the existing button class strings verbatim (§4) for new buttons — primary amber-hover CTA, or secondary inverse-stone CTA — rather than inventing a new visual style.
- Copy the existing form-field class string verbatim (§4) for new inputs/textareas, including the `focus:ring-2 focus:ring-amber-600 dark:focus:ring-amber-400` focus style.
- Wrap new page sections in `<AnimatedSection>` (or `<StaggerContainer>`/`<StaggerItem>` for lists) to match the site's scroll-reveal motion language. Use `transition-colors duration-200` for hover states.
- Use `lucide-react` for any new icon, sized 12–18px inline (14px default) unless it's a large status icon (24–40px).
- Give every icon-only interactive element an `aria-label`; give every form input a `<label>` plus `aria-invalid`/`aria-describedby` wired to a `role="alert"` error message; add `aria-current="page"` to the active item in any nav-like list. Match the accessibility bar in [§6](#6-accessibility-patterns) — do not ship a new interactive component with a lower bar than what already exists.
- Use `rounded-full` for pills/badges/dots, `rounded-xl`/`rounded-2xl` for cards/panels/inputs, `rounded-lg` for buttons/small tags — matching [§2.3](#23-spacing-radius-borders-elevation).

**Do not:**
- Do not introduce or reference the `accent` Tailwind color or the `--background`/`--foreground`/`--accent` CSS variables — they are dead code (§7). Use `stone-*`/`amber-*` directly.
- Do not add a new component library (shadcn/ui, MUI, Radix, Chakra, etc.) without discussing it first — this repo is 100% hand-built Tailwind, and mixing in a component library would fragment the visual language.
- Do not add a new animation library (GSAP, react-spring, CSS-only keyframe systems) — framer-motion via `AnimatedSection`/`StaggerContainer`/`StaggerItem` is the sole motion system, and it already respects `prefers-reduced-motion`.
- Do not invent a new button, badge, or form-field visual style when an existing one (§4) already covers the case — consistency across pages matters more than a marginally "nicer" one-off.
- Do not skip the `dark:` variant on any color utility — every color class in this codebase has one, and omitting it will visibly break dark mode.
- Do not add a `<table>` inside MDX content assuming the Typography plugin's table CSS applies — `components/mdx-components.tsx` overrides table rendering for MDX; check that file first if table styling looks wrong.
- Do not use arbitrary one-off values (`text-[Npx]`, inline `style={{}}`) unless there's a concrete reason no existing Tailwind scale value fits — the codebase has exactly two such escape hatches ([§7](#7-design-system-audit)) and they are the exception, not the norm.

**When evidence is unclear:** if you're extending a page type or component that has genuinely inconsistent precedent in this codebase, follow the most recent / most structurally central implementation (e.g. a component in `components/`, or a pattern used on `app/contact/page.tsx` or `app/about/page.tsx`) over an older or more isolated one, and flag the ambiguity rather than silently picking one.
