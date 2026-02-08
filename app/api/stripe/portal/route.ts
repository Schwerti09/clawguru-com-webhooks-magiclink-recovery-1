import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { verifyAccessToken } from "@/lib/access-token"
import { cookies } from "next/headers"

export const runtime = "nodejs"

function getOrigin(req: NextRequest) {
  return (
    req.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000"
  )
}

export async function POST(req: NextRequest) {
  const token = cookies().get("claw_access")?.value || ""
  const payload = token ? verifyAccessToken(token) : null
  if (!payload) return NextResponse.json({ error: "Not authorized" }, { status: 401 })

  const origin = getOrigin(req)
  const session = await stripe.billingPortal.sessions.create({
    customer: payload.customerId,
    return_url: `${origin}/dashboard`
  })

  return NextResponse.json({ url: session.url })
}
