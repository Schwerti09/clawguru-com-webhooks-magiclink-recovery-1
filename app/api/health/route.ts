import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET() {
  return NextResponse.json({
    ok: true,
    time: new Date().toISOString(),
    site: process.env.NEXT_PUBLIC_SITE_URL || null,
    stripe: Boolean(process.env.STRIPE_SECRET_KEY),
    openai: Boolean(process.env.OPENAI_API_KEY)
  })
}
