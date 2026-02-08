import { NextRequest, NextResponse } from "next/server"
import { AFFILIATE_REDIRECTS } from "@/lib/constants"

export const dynamic = "force-dynamic"

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const slug = (params?.slug || "").toLowerCase()
  const target = AFFILIATE_REDIRECTS[slug]

  if (!target) {
    return NextResponse.redirect(new URL("/hosting-kosten", _req.url))
  }

  // Optional: add UTM tags here centrally
  const url = new URL(target)
  if (!url.searchParams.get("utm_source")) url.searchParams.set("utm_source", "clawguru")
  if (!url.searchParams.get("utm_medium")) url.searchParams.set("utm_medium", "referral")
  if (!url.searchParams.get("utm_campaign")) url.searchParams.set("utm_campaign", slug)

  return NextResponse.redirect(url.toString())
}
