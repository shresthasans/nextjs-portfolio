declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, {
    page_location: window.location.href,
    page_referrer: document.referrer || undefined,
    ...params,
  })
}
