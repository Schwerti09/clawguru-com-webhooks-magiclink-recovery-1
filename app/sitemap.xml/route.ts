import { NextResponse } from "next/server"
import { bucketsAF, bucketsTagsAF } from "@/lib/pseo"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

function isoDate(d = new Date()) {
  return d.toISOString().slice(0, 10)
}

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.com"
  const lastmod = isoDate()

  const rb = bucketsAF()
  const tg = bucketsTagsAF()

  const sitemapUrls = [
    `${base}/sitemaps/main.xml`,

    `${base}/sitemaps/runbooks-a-f.xml`,
    `${base}/sitemaps/runbooks-g-l.xml`,
    `${base}/sitemaps/runbooks-m-r.xml`,
    `${base}/sitemaps/runbooks-s-z.xml`,
    `${base}/sitemaps/runbooks-0-9.xml`,

    `${base}/sitemaps/tags-a-f.xml`,
    `${base}/sitemaps/tags-g-l.xml`,
    `${base}/sitemaps/tags-m-r.xml`,
    `${base}/sitemaps/tags-s-z.xml`,
    `${base}/sitemaps/tags-0-9.xml`
  ]

  const active = sitemapUrls.filter((u) => {
    if (u.includes("runbooks-a-f")) return rb["a-f"].length > 0
    if (u.includes("runbooks-g-l")) return rb["g-l"].length > 0
    if (u.includes("runbooks-m-r")) return rb["m-r"].length > 0
    if (u.includes("runbooks-s-z")) return rb["s-z"].length > 0
    if (u.includes("runbooks-0-9")) return rb["0-9"].length > 0

    if (u.includes("tags-a-f")) return tg["a-f"].length > 0
    if (u.includes("tags-g-l")) return tg["g-l"].length > 0
    if (u.includes("tags-m-r")) return tg["m-r"].length > 0
    if (u.includes("tags-s-z")) return tg["s-z"].length > 0
    if (u.includes("tags-0-9")) return tg["0-9"].length > 0

    return true
  })

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    active.map((loc) => `  <sitemap><loc>${loc}</loc><lastmod>${lastmod}</lastmod></sitemap>`).join("\n") +
    `\n</sitemapindex>\n`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  })
}
