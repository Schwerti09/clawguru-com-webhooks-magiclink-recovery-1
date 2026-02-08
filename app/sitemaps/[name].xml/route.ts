import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { bucketsAF, bucketsTagsAF } from "@/lib/pseo"

// IMPORTANT: This route must stay dynamic (Netlify prerender can call it without params)
export const dynamic = "force-dynamic"
export const runtime = "nodejs"

function isoDate(d = new Date()) {
  return d.toISOString().slice(0, 10)
}

function urlset(urls: Array<{ loc: string; lastmod?: string; changefreq?: string; priority?: string }>) {
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((u) => {
        const parts = [
          `  <url>`,
          `    <loc>${u.loc}</loc>`,
          u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : "",
          u.changefreq ? `    <changefreq>${u.changefreq}</changefreq>` : "",
          u.priority ? `    <priority>${u.priority}</priority>` : "",
          `  </url>`
        ].filter(Boolean)
        return parts.join("\n")
      })
      .join("\n") +
    `\n</urlset>\n`
  return xml
}

export async function GET(
  _req: NextRequest,
  context?: { params?: { name?: string } }
) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.com"
  const lastmod = isoDate()
  const name = context?.params?.name

  if (!name) {
    return new NextResponse("Not Found", { status: 404 })
  }

  if (name === "main") {
    const urls = [
      { loc: `${base}/`, lastmod, changefreq: "daily", priority: "1.0" },
      { loc: `${base}/live`, lastmod, changefreq: "daily", priority: "0.95" },
      { loc: `${base}/check`, lastmod, changefreq: "daily", priority: "0.9" },
      { loc: `${base}/copilot`, lastmod, changefreq: "weekly", priority: "0.9" },
      { loc: `${base}/runbooks`, lastmod, changefreq: "daily", priority: "0.9" },
      { loc: `${base}/tags`, lastmod, changefreq: "weekly", priority: "0.8" },
      { loc: `${base}/intel`, lastmod, changefreq: "daily", priority: "0.8" },
      { loc: `${base}/academy`, lastmod, changefreq: "weekly", priority: "0.8" },
      { loc: `${base}/pricing`, lastmod, changefreq: "weekly", priority: "0.7" },
      { loc: `${base}/downloads`, lastmod, changefreq: "weekly", priority: "0.7" }
    ]
    return new NextResponse(urlset(urls), {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600"
      }
    })
  }

  const rb = bucketsAF()
  const tg = bucketsTagsAF()

  const rbMap: Record<string, keyof typeof rb> = {
    "runbooks-a-f": "a-f",
    "runbooks-g-l": "g-l",
    "runbooks-m-r": "m-r",
    "runbooks-s-z": "s-z",
    "runbooks-0-9": "0-9"
  }

  const tgMap: Record<string, keyof typeof tg> = {
    "tags-a-f": "a-f",
    "tags-g-l": "g-l",
    "tags-m-r": "m-r",
    "tags-s-z": "s-z",
    "tags-0-9": "0-9"
  }

  if (rbMap[name]) {
    const key = rbMap[name]
    const urls = rb[key].map((r) => ({
      loc: `${base}/runbook/${r.slug}`,
      lastmod: r.lastmod || lastmod,
      changefreq: "weekly",
      priority: "0.8"
    }))
    return new NextResponse(urlset(urls), {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600"
      }
    })
  }

  if (tgMap[name]) {
    const key = tgMap[name]
    const urls = tg[key].map((t) => ({
      loc: `${base}/tag/${encodeURIComponent(t)}`,
      lastmod,
      changefreq: "weekly",
      priority: "0.6"
    }))
    return new NextResponse(urlset(urls), {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600"
      }
    })
  }

  return new NextResponse("Not Found", { status: 404 })
}
