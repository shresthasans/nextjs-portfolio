# Design System — Sanjay Shrestha Portfolio

> Single source of truth for all UI patterns. When adding or changing a component, reference this file first. If a decision isn't here, add it.

---

## Color Tokens

| Role | Light | Dark | Notes |
|---|---|---|---|
| **Background** | `stone-50` | `stone-950` | Page bg |
| **Surface** | `white` | `stone-900/50` | Cards, forms |
| **Surface raised** | `stone-100` | `stone-800` | Hover fills, chips |
| **Border default** | `stone-200` | `stone-800` | All card borders |
| **Border hover** | `stone-300` | `stone-700` | On hover |
| **Text primary** | `stone-900` | `stone-50` | Headings, body |
| **Text secondary** | `stone-600` | `stone-400` | Subtitles, meta |
| **Text muted** | `stone-400` | `stone-500` | Timestamps, captions |
| **Brand accent** | `amber-700` | `amber-400` | CTAs, hover color, active nav |
| **Brand accent bg** | `amber-50` | `amber-950/40` | Badge backgrounds |
| **Focus ring** | `amber-600` | `amber-400` | All interactive focus states |

**Semantic colors (use only for meaning, never decoration):**

| Role | Light | Dark |
|---|---|---|
| Success | `emerald-600` / `emerald-50 bg` | `emerald-400` / `emerald-950/20 bg` |
| Error | `red-600` / `red-50 bg` | `red-400` / `red-950/20 bg` |
| Info | `blue-700` / `blue-50 bg` | `blue-300` / `blue-950/40 bg` |

---

## Typography

**Font families:**
- `font-heading` — display / headings (defined in `tailwind.config`)
- Default sans — body copy

**Scale:**

| Usage | Class | Notes |
|---|---|---|
| Page hero h1 | `text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1]` | Use `text-balance` |
| Section h2 | `text-4xl font-bold tracking-tight` | |
| Card h2 (work row) | `clamp(1.75rem, 3vw, 2.5rem)` via inline style | Fluid |
| Card h3 | `text-lg` or `text-xl font-semibold leading-snug` | |
| Eyebrow label | `text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400` | Always above h1/h2 |
| Body | `text-base` or `text-sm leading-relaxed` | |
| Meta / caption | `text-xs text-stone-400 dark:text-stone-500` | Dates, reading time |

---

## Buttons

### Primary — filled, dark bg
Use for: hero CTAs, form submit, nav "Hire me" on mobile.

```
px-6 py-3.5 bg-stone-900 dark:bg-stone-50 text-stone-50 dark:text-stone-900
rounded-xl font-medium text-sm
hover:bg-amber-700 dark:hover:bg-amber-400
transition-colors duration-200 cursor-pointer
```

With icon: add `inline-flex items-center gap-2`.

**Examples:** "View My Work", "Send Message", "Hire me" (nav).

---

### Secondary — ghost, outlined
Use for: secondary hero CTA, less prominent actions alongside a primary button.

```
px-6 py-3.5 bg-transparent
border border-stone-200 dark:border-stone-700
text-stone-700 dark:text-stone-300
rounded-xl font-medium text-sm
hover:bg-stone-100 dark:hover:bg-stone-800
hover:border-stone-300 dark:hover:border-stone-600
transition-colors duration-200 cursor-pointer
```

**Examples:** "Get In Touch" (paired with "View My Work").

---

### Ghost — outlined (filter buttons, "View case study")
Use for: filter pills, tag filters, "View case study" in work listing.

```
px-4 py-1.5 rounded-lg border text-sm font-medium
border-stone-200 dark:border-stone-700
text-stone-500 dark:text-stone-400
hover:border-stone-400 dark:hover:border-stone-500
hover:text-stone-900 dark:hover:text-stone-100
transition-all duration-200 cursor-pointer
```

**Active state** (filter selected):
```
bg-stone-900 dark:bg-stone-50
text-white dark:text-stone-900
border-transparent
```

**Amber hover variant** (work listing "View case study"):
```
px-5 py-2.5 rounded-lg border text-sm font-semibold
border-stone-300 dark:border-stone-600
text-stone-800 dark:text-stone-200
hover:border-amber-600 dark:hover:border-amber-500
hover:text-amber-700 dark:hover:text-amber-400
hover:bg-amber-50 dark:hover:bg-amber-950/30
transition-all duration-200
```

---

### Tertiary — text link with underline border
Use for: inline "read more" links, nav links in prose sections.

```
inline-flex items-center gap-2 text-sm font-medium
text-stone-900 dark:text-stone-50
border-b border-stone-300 dark:border-stone-600 pb-0.5
hover:border-amber-700 dark:hover:border-amber-400
hover:text-amber-700 dark:hover:text-amber-400
transition-colors duration-200 cursor-pointer
```

**Examples:** "Full story →" on homepage about section.

---

### Accent CTA — amber fill (dark section only)
Use only inside dark-background banner sections (e.g. the homepage CTA block). Do not use on white/stone backgrounds.

```
inline-flex items-center gap-2 px-7 py-3.5
bg-amber-600 hover:bg-amber-500
text-white rounded-xl font-medium text-sm
transition-colors duration-200 cursor-pointer
```

**Examples:** "Get In Touch" inside the `bg-stone-900` CTA banner.

---

### Nav pill button (desktop nav CTA)
Use only in `Nav.tsx` for the "Hire me" button.

```
px-4 py-1.5 bg-stone-900 dark:bg-stone-50
text-stone-50 dark:text-stone-900
rounded-lg text-sm font-medium
hover:bg-amber-700 dark:hover:bg-amber-400
transition-colors duration-200 cursor-pointer
```

Note: `rounded-lg` (not `rounded-xl`) to match the nav's tighter scale.

---

### Icon-only button (theme toggle, mobile menu)
```
p-2 rounded-lg
text-stone-500 dark:text-stone-400
hover:text-stone-900 dark:hover:text-stone-50
hover:bg-stone-100 dark:hover:bg-stone-800
transition-colors duration-200 cursor-pointer
```

---

## Cards

### Work listing row (no card border variant)
Work listing uses borderless rows — no card class needed. Items float on white and are separated by `gap-20 lg:gap-28`.

### Content card (blog, case study on homepage)
```
rounded-xl overflow-hidden border
border-stone-200 dark:border-stone-800
hover:border-stone-300 dark:hover:border-stone-700
hover:shadow-md dark:hover:shadow-stone-950/40
bg-white dark:bg-stone-900/60
transition-all duration-200
```

### Form / featured card (heavier surface)
```
rounded-2xl border
border-stone-200 dark:border-stone-800
bg-white dark:bg-stone-900/50
p-8
```

---

## Badges & Pills

### Type / category pill
```
inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border
```

Color by type:

| Type | Light | Dark |
|---|---|---|
| SaaS | `bg-amber-50 text-amber-700 border-amber-200` | `bg-amber-950/40 text-amber-300 border-amber-800/50` |
| Enterprise | `bg-blue-50 text-blue-700 border-blue-200` | `bg-blue-950/40 text-blue-300 border-blue-800/50` |
| Government | `bg-purple-50 text-purple-700 border-purple-200` | `bg-purple-950/40 text-purple-300 border-purple-800/50` |
| eCommerce | `bg-emerald-50 text-emerald-700 border-emerald-200` | `bg-emerald-950/40 text-emerald-300 border-emerald-800/50` |

### Eyebrow / brand badge (CUA cert, availability)
```
inline-flex items-center gap-2 px-3 py-1.5 rounded-full
bg-amber-50 dark:bg-amber-950/40
border border-amber-200 dark:border-amber-800/60
text-xs font-medium text-amber-800 dark:text-amber-300
```

### Status badge (open to work)
```
inline-flex items-center gap-2 px-3 py-1.5 rounded-full
bg-emerald-50 dark:bg-emerald-950/40
border border-emerald-200 dark:border-emerald-800/60
text-sm font-medium text-emerald-700 dark:text-emerald-400
```
With: `<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />`

---

## Section Layout Patterns

### Page header block
```tsx
<p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-4">
  {eyebrow}
</p>
<h1 className="font-heading text-5xl sm:text-6xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-[1.1] mb-6 text-balance">
  {heading}
</h1>
<p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
  {subtext}
</p>
```

### Section h2 with "View all" link
```tsx
<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
  <div>
    <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">
      {eyebrow}
    </p>
    <h2 className="font-heading text-4xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
      {heading}
    </h2>
  </div>
  <Link href={...} className="tertiary-link-style shrink-0">
    {label} <ArrowRight size={14} />
  </Link>
</div>
```

---

## Spacing

| Context | Value |
|---|---|
| Container | `container-portfolio` (defined in globals/tailwind config) |
| Section vertical | `py-24` default, `py-16` for denser sections |
| Page top padding | `pt-36` (accounts for fixed nav) |
| Card internal | `p-8` default, `p-5` compact |
| Between work rows | `gap-20 lg:gap-28` |
| Between cards (grid) | `gap-5` or `gap-6` |

---

## Border Radius

| Context | Value |
|---|---|
| Cards, forms, large blocks | `rounded-2xl` |
| All buttons (primary/secondary/ghost/accent) | `rounded-lg` |
| Nav icon buttons (icon-only) | `rounded-lg` |
| Non-interactive category/type badge labels | `rounded-full` |
| Image containers (inline) | `rounded-xl` |

---

## Transitions

All interactive elements use the same base:
```
transition-colors duration-200
```

Shadow/border transitions (cards):
```
transition-all duration-200
```

Motion animations (Framer):
- Fade in: `opacity 0→1, y 24→0, duration 0.5, ease [0.21, 0.47, 0.32, 0.98]`
- Stagger delay: `index * 0.08` or `index * 0.1`
- Section enter: `AnimatedSection` component

---

## Forms

Input / textarea:
```
w-full px-4 py-3 rounded-xl text-sm
border border-stone-200 dark:border-stone-700
bg-stone-50 dark:bg-stone-800/50
text-stone-900 dark:text-stone-50
placeholder-stone-400 dark:placeholder-stone-500
focus:outline-none focus:ring-2 focus:ring-amber-600 dark:focus:ring-amber-400
transition-colors duration-200
```

Label:
```
block text-sm font-medium text-stone-700 dark:text-stone-300
```

Error text:
```
text-xs text-red-600 dark:text-red-400
```

Submit button: use **Primary** button, full width (`w-full`).

---

## Icons

- Library: **Lucide React** exclusively
- Default sizes: `16` (body), `14` (small/inline), `18` (nav), `24` (hero)
- Color: inherit from parent text color — never hardcode a color class on the icon itself unless it's semantic (error = red, success = emerald)
- Always `aria-hidden="true"` on decorative icons

---

## Dark Mode

- Use `dark:` variants on every color class — never assume light only
- Test both modes before shipping any component
- Gradient backgrounds use lower opacity in dark: e.g. `dark:from-blue-950/70 dark:to-blue-900/50`
- White overlays (SVG patterns) use `fillOpacity` only — let parent handle dark/light bg

---

## Do Not

- Do not use `rounded-3xl` anywhere except the CTA banner block on homepage
- Do not use shadow without also having a hover state (`hover:shadow-md` not just `shadow-md`)
- Do not use `underline` on non-link text
- Do not use yellow `<mark>` — always use the blue highlight defined in `globals.css`
- Do not mix `rounded-xl` and `rounded-2xl` on the same card hierarchy
- Do not create new color tokens without adding them here first
