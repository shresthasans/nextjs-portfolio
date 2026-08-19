declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    clarity?: (...args: unknown[]) => void
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return

  if (window.gtag) {
    window.gtag('event', name, {
      page_location: window.location.href,
      page_referrer: document.referrer || undefined,
      ...params,
    })
  }

  if (typeof window.clarity === 'function') {
    window.clarity('event', name)
  }
}
