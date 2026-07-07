import { clsx } from 'clsx'

interface MediaFrameProps {
  aspectRatio?: string
  padded?: boolean
  className?: string
  children: React.ReactNode
}

export default function MediaFrame({
  aspectRatio = 'aspect-[4/3]',
  padded = true,
  className,
  children,
}: MediaFrameProps) {
  return (
    <div
      className={clsx(
        'relative w-full overflow-hidden rounded-xl border bg-white dark:bg-stone-900',
        'border-stone-200 dark:border-stone-800 shadow-sm',
        'transition-all duration-300 ease-out',
        'group-hover:border-stone-300 dark:group-hover:border-stone-700',
        'group-hover:shadow-md dark:group-hover:shadow-stone-950/40',
        'group-hover:-translate-y-1',
        aspectRatio,
        className
      )}
    >
      <div className={clsx('absolute inset-0', padded && 'p-5 sm:p-6')}>{children}</div>
    </div>
  )
}
