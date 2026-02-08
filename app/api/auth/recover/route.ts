import { NextRequest, NextResponse } from "next/server"
import { verifyAccessToken } from "@/lib/access-token"
import { stripe } from "@/lib/stripe"

export const runtime = "nodejs"

function getOrigin(req: NextRequest) {
  return (
    req.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000"
  )
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") || ""
  const origin = getOrigin(req)
  if (!token) return NextResponse.redirect(new URL("/recover", origin))

  const payload = verifyAccessToken(token)
  if (!payload) return NextResponse.redirect(new URL("/recover?invalid=1", origin))

  // extra safety: for subscription plans verify Stripe status now
  if (payload.plan === "pro" || payload.plan === "team") {
    if (!payload.subscriptionId) return NextResponse.redirect(new URL("/recover?invalid=1", origin))
    try {
      const sub = await stripe.subscriptions.retrieve(payload.subscriptionId)
      const ok = sub.status === "active" || sub.status === "trialing"
      if (!ok) return NextResponse.redirect(new URL("/pricing?subscription_inactive=1", origin))
    } catch {
      return NextResponse.redirect(new URL("/recover?stripe_error=1", origin))
    }
  }

  const res = NextResponse.redirect(new URL("/dashboard", origin))
  const now = Math.floor(Date.now() / 1000)
  res.cookies.set({
    name: "claw_access",
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: Math.max(60, (payload.exp || now + 300) - now)
  })
  return res
}
