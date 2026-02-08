import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { adminCookieName, verifyAdminToken } from "@/lib/admin-auth"
import { stripe } from "@/lib/stripe"

export const runtime = "nodejs"

function unauthorized() {
  return NextResponse.json({ error: "unauthorized" }, { status: 401 })
}

async function stripeSummary() {
  const now = Math.floor(Date.now() / 1000)
  const day = 60 * 60 * 24
  const since24h = now - day
  const since7d = now - day * 7

  // charges
  const [c24, c7] = await Promise.all([
    stripe.charges.list({ limit: 100, created: { gte: since24h } }),
    stripe.charges.list({ limit: 100, created: { gte: since7d } })
  ])

  const sum = (arr: any[]) =>
    arr.reduce((acc, ch) => (ch.paid && ch.status === "succeeded" ? acc + (ch.amount || 0) : acc), 0)

  const charges24h = sum(c24.data)
  const charges7d = sum(c7.data)
  const currency = (c7.data[0]?.currency || c24.data[0]?.currency || "eur") as string

  // subs
  const subs = await stripe.subscriptions.list({ limit: 100, status: "all" })
  const activeSubs = subs.data.filter((s) => s.status === "active").length
  const trialingSubs = subs.data.filter((s) => s.status === "trialing").length

  const lastPayments = c7.data
    .filter((c) => c.paid && c.status === "succeeded")
    .slice(0, 10)
    .map((c) => ({
      created: c.created,
      amount: c.amount,
      currency: c.currency,
      description: c.description || c.billing_details?.name || null
    }))

  return {
    currency,
    charges7d,
    charges24h,
    chargeCount7d: c7.data.length,
    activeSubs,
    trialingSubs,
    lastPayments
  }
}

export async function GET(_req: NextRequest) {
  const token = cookies().get(adminCookieName())?.value || ""
  const session = token ? verifyAdminToken(token) : null
  if (!session) return unauthorized()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const hasStripe = Boolean(process.env.STRIPE_SECRET_KEY)
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY)
  const hasAdmin = Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET)
  const hasWebhook = Boolean(process.env.STRIPE_WEBHOOK_SECRET)
  const hasEmail = Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM)

  let stripeData: any = undefined
  if (hasStripe) {
    try {
      stripeData = await stripeSummary()
    } catch {
      stripeData = undefined
    }
  }

  return NextResponse.json({
    now: new Date().toISOString(),
    siteUrl,
    env: { hasStripe, hasOpenAI, hasAdmin, hasWebhook, hasEmail },
    stripe: stripeData
  })
}
