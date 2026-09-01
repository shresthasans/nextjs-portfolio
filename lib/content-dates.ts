import { execSync } from 'child_process'

// Real edit history, not build time: `next build` runs on a fresh checkout where every
// file's mtime resets to the same instant, so file-system dates are useless for "when did
// this content last change." Git history survives the checkout. Falls back to null (caller
// supplies frontmatter/publish-date fallback) if git isn't available — e.g. a shallow CI
// clone with no history for a given path, or no .git directory at all.
export function getLastCommitISODate(relativePath: string): string | null {
  try {
    const out = execSync(`git log -1 --format=%aI -- "${relativePath}"`, {
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim()
    return out || null
  } catch {
    return null
  }
}
