import blurData from './blur-data.json'

const data: Record<string, string> = blurData

export function getBlurDataURL(src: string): string | undefined {
  return data[src]
}
