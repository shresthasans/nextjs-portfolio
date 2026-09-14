'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { trackEvent } from '@/lib/analytics'

interface TrackedLinkProps extends ComponentProps<typeof Link> {
  eventName: string
  eventParams?: Record<string, unknown>
}

export default function TrackedLink({ eventName, eventParams, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent(eventName, eventParams)
        onClick?.(e)
      }}
    />
  )
}
