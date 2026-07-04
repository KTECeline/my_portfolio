import { fileURLToPath } from "node:url"
import { dirname } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin BOTH roots to this project. A stray package.json + pnpm-lock.yaml in the
  // parent folder makes Next infer that folder (~33GB of unrelated projects) as
  // the workspace root, so the dev file-watcher/tracer crawls the whole tree and
  // memory explodes. turbopack.root scopes module resolution; outputFileTracingRoot
  // scopes the file tracer/watcher. Both are needed.
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: __dirname,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
