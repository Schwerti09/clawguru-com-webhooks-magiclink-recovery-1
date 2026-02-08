import { cookies } from "next/headers"
import { stripe } from "@/lib/stripe"
import { verifyAccessToken, AccessTokenPayload, AccessPlan } from "@/lib/access-token"

export type AccessInfo = {
  ok: boolean
  plan?: AccessPlan
  customerId?: string
  subscriptionId?: string
  exp?: number
  reason?: string
}

export async function getAccess(): Promise<AccessInfo> {
  const token = cookies().get("claw_access")?.value || ""
  const payload = token ? verifyAccessToken(token) : null
  if (!payload) return { ok: false, reason: "no_token" }

  // daypass = only expiry check (already verified in token)
  if (payload.plan === "daypass") {
    return { ok: true, plan: payload.plan, customerId: payload.customerId, exp: payload.exp }
  }

  // subscription plans: verify Stripe subscription status (authoritative)
  const subId = payload.subscriptionId
  if (!subId) return { ok: false, reason: "no_subscription_id" }

  try {
    const sub = await stripe.subscriptions.retrieve(subId)
    const status = sub.status
    const active = status === "active" || status === "trialing"
    if (!active) return { ok: false, reason: "subscription_inactive" }
    return {
      ok: true,
      plan: payload.plan,
      customerId: payload.customerId,
      subscriptionId: subId,
      exp: payload.exp
    }
  } catch {
    return { ok: false, reason: "stripe_error" }
  }
}
