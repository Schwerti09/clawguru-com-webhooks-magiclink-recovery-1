import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { signAccessToken, AccessPlan } from "@/lib/access-token"

export const runtime = "nodejs"

function getOrigin(req: NextRequest) {
  return (
    req.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000"
  )
}

export async function GET(req: NextRequest) {
  const session_id = req.nextUrl.searchParams.get("session_id") || ""
  if (!session_id) {
    return NextResponse.redirect(new URL("/pricing?missing_session=1", getOrigin(req)))
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, { expand: ["subscription", "customer"] })

    // Ensure paid / completed
    const paid = session.payment_status === "paid" || session.status === "complete"
    if (!paid) return NextResponse.redirect(new URL(`/success?session_id=${encodeURIComponent(session_id)}`, getOrigin(req)))

    const origin = getOrigin(req)

    // Determine plan from metadata/price
    const product = (session.metadata?.product || "").toLowerCase()
    let plan: AccessPlan | null = null

    if (product === "daypass") plan = "daypass"
    if (product === "pro") plan = "pro"
    if (product === "team") plan = "team"

    if (!plan) {
      // Fallback by mode
      plan = session.mode === "payment" ? "daypass" : "pro"
    }

    const customerId =
      typeof session.customer === "string"
        ? session.customer
        : (session.customer as any)?.id

    if (!customerId) {
      return NextResponse.redirect(new URL("/pricing?no_customer=1", origin))
    }

    const now = Math.floor(Date.now() / 1000)

    let exp = now + 60 * 60 * 24 // 24h for daypass
    let subscriptionId: string | undefined = undefined

    if (plan === "pro" || plan === "team") {
      exp = now + 60 * 60 * 24 * 30 // 30d token lifetime (subscription validated on each access)
      subscriptionId =
        typeof session.subscription === "string"
          ? session.subscription
          : (session.subscription as any)?.id
      if (!subscriptionId) {
        return NextResponse.redirect(new URL("/pricing?no_subscription=1", origin))
      }
    }

    const token = signAccessToken({
      v: 1,
      plan,
      customerId,
      subscriptionId,
      iat: now,
      exp
    })

    const res = NextResponse.redirect(new URL("/dashboard", origin))
    res.cookies.set({
      name: "claw_access",
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: Math.max(60, exp - now)
    })
    return res
  } catch {
    return NextResponse.redirect(new URL(`/success?session_id=${encodeURIComponent(session_id)}`, getOrigin(req)))
  }
}
