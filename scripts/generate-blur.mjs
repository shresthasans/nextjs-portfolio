#!/usr/bin/env node
// Precomputes base64 blur placeholders for every local raster image under
// public/images, so <Image placeholder="blur"> has instant data without
// hitting the network. Run via `npm run generate-blur`; output is committed
// to lib/blur-data.json (not regenerated at request time).
import fs from 'fs'
import path from 'path'
import { getPlaiceholder } from 'plaiceholder'

const ROOT = process.cwd()
const IMAGES_DIR = path.join(ROOT, 'public', 'images')
const OUTPUT_FILE = path.join(ROOT, 'lib', 'blur-data.json')
const EXTENSIONS = new Set(['.webp', '.jpg', '.jpeg', '.png'])

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full, files)
    } else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(full)
    }
  }
  return files
}

async function main() {
  const files = walk(IMAGES_DIR)
  const result = {}

  for (const file of files) {
    const publicPath = '/' + path.relative(path.join(ROOT, 'public'), file).split(path.sep).join('/')
    const buffer = fs.readFileSync(file)
    const { base64 } = await getPlaiceholder(buffer)
    result[publicPath] = base64
    console.log(`  ${publicPath}`)
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2) + '\n')
  console.log(`\nGenerated blur data for ${files.length} images -> ${path.relative(ROOT, OUTPUT_FILE)}`)
}

main()
