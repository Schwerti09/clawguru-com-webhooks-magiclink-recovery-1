import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { stripe } from "@/lib/stripe"
import { signAccessToken, AccessPlan } from "@/lib/access-token"
import { sendEmail } from "@/lib/email"

export const runtime = "nodejs"

async function readRawBody(req: NextRequest) {
  // NextRequest supports arrayBuffer()
  const ab = await req.arrayBuffer()
  return Buffer.from(ab)
}


function planFromSession(session: Stripe.Checkout.Session): AccessPlan {
  const product = (session.metadata?.product || "").toLowerCase()
  if (product === "team") return "team"
  if (product === "daypass") return "daypass"
  return "pro"
}

function tokenExp(plan: AccessPlan, now: number) {
  if (plan === "daypass") return now + 60 * 60 * 24
  return now + 60 * 60 * 24 * 30
}

function emailHtml({
  url,
  plan,
  support,
  dashboardUrl
}: {
  url: string
  plan: string
  support: string
  dashboardUrl: string
}) {
  return `
  <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.5; color:#111;">
    <h2 style="margin:0 0 10px 0;">ClawGuru Zugriff: <span style="color:#0ea5e9;">aktivieren</span></h2>
    <p style="margin:0 0 14px 0;">Dein Plan: <b>${plan}</b></p>
    <p style="margin:0 0 18px 0;">
      Öffne diesen Magic Link. Er setzt deinen Zugang (Cookie) und bringt dich direkt ins Dashboard.
    </p>
    <p style="margin:18px 0;">
      <a href="${url}" style="display:inline-block; padding:12px 18px; background:#111827; color:#fff; text-decoration:none; border-radius:12px; font-weight:800;">
        Zugriff aktivieren → Dashboard
      </a>
    </p>
    <p style="margin:0 0 10px 0; font-size:12px; color:#555;">
      Direktlink (falls Button nicht klickbar):<br/>
      <a href="${url}">${url}</a>
    </p>
    <hr style="border:none; border-top:1px solid #e5e7eb; margin:18px 0;" />
    <p style="margin:0; font-size:12px; color:#555;">
      Support: ${support}<br/>
      Dashboard: <a href="${dashboardUrl}">${dashboardUrl}</a>
    </p>
  </div>`
}

async function sendAccessEmail(session: Stripe.Checkout.Session) {
  const email = session.customer_details?.email || session.customer_email
  if (!email) return

  const plan = planFromSession(session)
  const now = Math.floor(Date.now() / 1000)

  const customerId = typeof session.customer === "string" ? session.customer : (session.customer as any)?.id
  if (!customerId) return

  let subscriptionId: string | undefined = undefined
  if (plan === "pro" || plan === "team") {
    subscriptionId = typeof session.subscription === "string" ? session.subscription : (session.subscription as any)?.id
    if (!subscriptionId) return
  }

  const token = signAccessToken({
    v: 1,
    plan,
    customerId,
    subscriptionId,
    iat: now,
    exp: tokenExp(plan, now)
  })

  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const url = `${base}/api/auth/recover?token=${encodeURIComponent(token)}`
  const dash = `${base}/dashboard`
  const support = process.env.SUPPORT_EMAIL || process.env.EMAIL_REPLY_TO || process.env.EMAIL_FROM || "support@clawguru.com"

  await sendEmail({
    to: email,
    subject: "Dein ClawGuru Zugang (Magic Link)",
    html: emailHtml({ url, plan, support, dashboardUrl: dash })
  })
}

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET" }, { status: 500 })
  }

  const sig = req.headers.get("stripe-signature")
  if (!sig) return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 })

  let event: Stripe.Event
  try {
    const raw = await readRawBody(req)
    event = stripe.webhooks.constructEvent(raw, sig, webhookSecret)
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      // Ensure paid/complete
      const paid = session.payment_status === "paid" || session.status === "complete"
      if (paid) {
        // If we need subscription/customer ids reliably, retrieve expanded session
        const full = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ["customer", "subscription"]
        })
        await sendAccessEmail(full)
      }
    }

    // optional: you can add cancellation/failed payment mails later
    return NextResponse.json({ received: true })
  } catch (e) {
    return NextResponse.json({ received: true })
  }
}
