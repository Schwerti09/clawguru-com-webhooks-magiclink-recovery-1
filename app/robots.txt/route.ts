import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.com"
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    "# Blockiere Admin & Backend",
    "Disallow: /admin/",
    "Disallow: /api/",
    "Disallow: /dashboard/",
    "",
    "# Blockiere interne Suchergebnisse (Spider Trap)",
    "Disallow: /search",
    "Disallow: /search/",
    "Disallow: /search?*",
    "",
    "# Blockiere Checkout/Success",
    "Disallow: /checkout/",
    "Disallow: /success/",
    "",
    `Sitemap: ${base}/sitemap.xml`
  ].join("\n")

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  })
}
