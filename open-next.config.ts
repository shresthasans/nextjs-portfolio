// default open-next.config.ts file created by @opennextjs/cloudflare
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
	// This site is fully static (no revalidation) — serve prerendered
	// pages straight from Workers static assets instead of R2/KV.
	// See https://opennext.js.org/cloudflare/caching for more details
	incrementalCache: staticAssetsIncrementalCache,
});
