import { NextResponse } from "next/server"
import { RUNBOOKS, allTags } from "@/lib/pseo"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function isoDate(d = new Date()) {
  return d.toISOString().slice(0, 10)
}

function mulberry32(seed: number) {
  let t = seed >>> 0
  return function () {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function hash(str: string) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function pickUnique<T>(arr: T[], n: number, rnd: () => number) {
  const copy = [...arr]
  const out: T[] = []
  while (copy.length && out.length < n) {
    const i = Math.floor(rnd() * copy.length)
    out.push(copy.splice(i, 1)[0]!)
  }
  return out
}

function countTop<T extends string>(items: T[]) {
  const map = new Map<string, number>()
  for (const x of items) map.set(x, (map.get(x) || 0) + 1)
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 14)
    .map(([name, count]) => ({ name, count }))
}

export async function GET() {
  const now = new Date()
  const day = isoDate(now)
  const seed = hash(day)
  const rnd = mulberry32(seed)

  const tags = allTags()
  const topTags = countTop(RUNBOOKS.flatMap((r) => r.tags))

  const issueKeywords = [
    "502",
    "503",
    "504",
    "ECONNRESET",
    "ETIMEDOUT",
    "webhook",
    "signature",
    "CORS",
    "rate limit",
    "SSH",
    "firewall",
    "nginx",
    "docker",
    "secrets",
    "env",
    "redis",
    "postgres",
    "neon",
    "oauth",
    "cookie"
  ]

  const issueCounts = issueKeywords
    .map((k) => {
      const key = k.toLowerCase()
      const count = RUNBOOKS.filter((r) => (r.title + " " + r.summary).toLowerCase().includes(key)).length
      return { name: k, count }
    })
    .filter((x) => x.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  const trending = pickUnique(RUNBOOKS, 10, rnd).map((r) => ({
    slug: r.slug,
    title: r.title,
    summary: r.summary,
    tags: r.tags.slice(0, 4)
  }))

  // Synthetic live signal (keine Userdaten)
  const t = now.getTime() / 1000
  const pulse = Math.round(60 + 18 * Math.sin(t / 18) + 11 * Math.sin(t / 7) + rnd() * 7)

  return NextResponse.json(
    {
      updatedAt: now.toISOString(),
      day,
      counts: {
        runbooks: RUNBOOKS.length,
        tags: tags.length
      },
      pulse: Math.max(7, pulse),
      topTags,
      issueCounts,
      trending
    },
    {
      headers: {
        "Cache-Control": "no-store"
      }
    }
  )
}
