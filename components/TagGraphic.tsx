import type { BlogPost } from './BlogCard'

type Tag = BlogPost['tag']

export const tagBgClass: Record<Tag, string> = {
  UX: 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-950/70 dark:to-blue-900/50',
  'Design Systems':
    'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-950/70 dark:to-purple-900/50',
  AI: 'bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-950/70 dark:to-amber-900/50',
  Career:
    'bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-950/70 dark:to-emerald-900/50',
}

function UXPattern() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Two overlapping circles — research insight intersection */}
      <circle cx="155" cy="100" r="88" fill="white" fillOpacity="0.1" />
      <circle cx="245" cy="100" r="88" fill="white" fillOpacity="0.1" />
      <circle cx="200" cy="100" r="36" fill="white" fillOpacity="0.2" />
      {/* Dotted user journey path */}
      <path
        d="M40 170 Q120 60 200 100 Q280 140 360 40"
        stroke="white"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        fill="none"
        strokeDasharray="5 5"
      />
      {/* Data point nodes on path */}
      <circle cx="40" cy="170" r="3.5" fill="white" fillOpacity="0.45" />
      <circle cx="120" cy="78" r="3.5" fill="white" fillOpacity="0.45" />
      <circle cx="200" cy="100" r="5" fill="white" fillOpacity="0.9" />
      <circle cx="280" cy="122" r="3.5" fill="white" fillOpacity="0.45" />
      <circle cx="360" cy="40" r="3.5" fill="white" fillOpacity="0.45" />
      {/* Scatter dots */}
      <circle cx="80" cy="55" r="2.5" fill="white" fillOpacity="0.3" />
      <circle cx="315" cy="158" r="2.5" fill="white" fillOpacity="0.3" />
      <circle cx="345" cy="95" r="2" fill="white" fillOpacity="0.2" />
      <circle cx="60" cy="125" r="2" fill="white" fillOpacity="0.2" />
      {/* Cursor arrow */}
      <path
        d="M340 150 L340 170 L346 164 L350 172 L353 171 L349 163 L357 163 Z"
        fill="white"
        fillOpacity="0.35"
      />
    </svg>
  )
}

function DesignSystemsPattern() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Parent container */}
      <rect
        x="30"
        y="20"
        width="340"
        height="160"
        rx="10"
        fill="white"
        fillOpacity="0.08"
        stroke="white"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />
      {/* Row 1: three child components */}
      <rect x="50" y="40" width="90" height="60" rx="6" fill="white" fillOpacity="0.12" />
      <rect x="155" y="40" width="90" height="60" rx="6" fill="white" fillOpacity="0.12" />
      <rect x="260" y="40" width="90" height="60" rx="6" fill="white" fillOpacity="0.12" />
      {/* Sub-elements inside each component */}
      <rect x="62" y="52" width="36" height="14" rx="3" fill="white" fillOpacity="0.3" />
      <rect x="62" y="71" width="60" height="8" rx="2" fill="white" fillOpacity="0.18" />
      <rect x="62" y="83" width="44" height="8" rx="2" fill="white" fillOpacity="0.12" />
      <rect x="167" y="52" width="36" height="14" rx="3" fill="white" fillOpacity="0.3" />
      <rect x="167" y="71" width="60" height="8" rx="2" fill="white" fillOpacity="0.18" />
      <rect x="272" y="52" width="36" height="14" rx="3" fill="white" fillOpacity="0.3" />
      <rect x="272" y="71" width="60" height="8" rx="2" fill="white" fillOpacity="0.18" />
      <rect x="272" y="83" width="44" height="8" rx="2" fill="white" fillOpacity="0.12" />
      {/* Row 2: full-width component */}
      <rect x="50" y="115" width="300" height="48" rx="6" fill="white" fillOpacity="0.1" />
      {/* Token dots */}
      <circle cx="75" cy="139" r="6" fill="white" fillOpacity="0.55" />
      <circle cx="97" cy="139" r="6" fill="white" fillOpacity="0.35" />
      <circle cx="119" cy="139" r="6" fill="white" fillOpacity="0.2" />
      <rect x="140" y="133" width="80" height="8" rx="2" fill="white" fillOpacity="0.15" />
      <rect x="140" y="145" width="55" height="6" rx="2" fill="white" fillOpacity="0.1" />
    </svg>
  )
}

function AIPattern() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Input → hidden connections */}
      <line x1="80" y1="50" x2="200" y2="75" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
      <line x1="80" y1="100" x2="200" y2="75" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
      <line x1="80" y1="150" x2="200" y2="75" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
      <line x1="80" y1="50" x2="200" y2="125" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
      <line x1="80" y1="100" x2="200" y2="125" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
      <line x1="80" y1="150" x2="200" y2="125" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
      {/* Hidden → output connections */}
      <line x1="200" y1="75" x2="320" y2="100" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" />
      <line x1="200" y1="125" x2="320" y2="100" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" />
      {/* Input nodes */}
      <circle cx="80" cy="50" r="10" fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
      <circle cx="80" cy="100" r="10" fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
      <circle cx="80" cy="150" r="10" fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
      {/* Hidden nodes */}
      <circle cx="200" cy="75" r="14" fill="white" fillOpacity="0.22" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
      <circle cx="200" cy="125" r="14" fill="white" fillOpacity="0.22" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
      {/* Output node — brightest */}
      <circle cx="320" cy="100" r="22" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.5" strokeWidth="2" />
      <circle cx="320" cy="100" r="12" fill="white" fillOpacity="0.3" />
      <circle cx="320" cy="100" r="5" fill="white" fillOpacity="0.8" />
      {/* Outer ripple */}
      <circle cx="320" cy="100" r="34" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
    </svg>
  )
}

function CareerPattern() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Ascending bars */}
      <rect x="50" y="150" width="55" height="35" rx="4" fill="white" fillOpacity="0.12" />
      <rect x="125" y="115" width="55" height="70" rx="4" fill="white" fillOpacity="0.17" />
      <rect x="200" y="78" width="55" height="107" rx="4" fill="white" fillOpacity="0.22" />
      <rect x="275" y="40" width="55" height="145" rx="4" fill="white" fillOpacity="0.28" />
      {/* Trend line */}
      <path
        d="M77 148 L152 113 L227 76 L302 38"
        stroke="white"
        strokeWidth="2.5"
        strokeOpacity="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Milestone dots on line */}
      <circle cx="77" cy="148" r="4.5" fill="white" fillOpacity="0.6" />
      <circle cx="152" cy="113" r="4.5" fill="white" fillOpacity="0.65" />
      <circle cx="227" cy="76" r="4.5" fill="white" fillOpacity="0.7" />
      {/* Peak star */}
      <circle cx="302" cy="38" r="7" fill="white" fillOpacity="0.9" />
      <circle cx="302" cy="38" r="14" fill="white" fillOpacity="0.15" />
    </svg>
  )
}

const patterns: Record<Tag, () => JSX.Element> = {
  UX: UXPattern,
  'Design Systems': DesignSystemsPattern,
  AI: AIPattern,
  Career: CareerPattern,
}

interface TagGraphicProps {
  tag: Tag
  className?: string
}

export default function TagGraphic({ tag, className = '' }: TagGraphicProps) {
  const Pattern = patterns[tag]
  return (
    <div className={`relative overflow-hidden ${tagBgClass[tag]} ${className}`}>
      <Pattern />
    </div>
  )
}
