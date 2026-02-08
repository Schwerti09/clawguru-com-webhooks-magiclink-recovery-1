import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export const runtime = "nodejs"

type Product = "pro" | "team" | "daypass"
type Body = { product?: Product }

const DEFAULT_PRICE_PRO = "price_1SyY02INFtiy8u5xA9v6IeVA"
const DEFAULT_PRICE_TEAM = "price_1SyY1FINFtiy8u5xGhxFTkEe"
const DEFAULT_PRICE_DAYPASS = "price_1SyZiaINFtiy8u5xSuvtlste"

function getOrigin(req: NextRequest) {
  return (
    req.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000"
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as Body
    const product = body.product

    if (product !== "pro" && product !== "team" && product !== "daypass") {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 })
    }

    const origin = getOrigin(req)

    const pricePro = process.env.STRIPE_PRICE_PRO || DEFAULT_PRICE_PRO
    const priceTeam = process.env.STRIPE_PRICE_TEAM || DEFAULT_PRICE_TEAM
    const priceDay = process.env.STRIPE_PRICE_DAYPASS || DEFAULT_PRICE_DAYPASS

    const price =
      product === "team" ? priceTeam :
      product === "daypass" ? priceDay :
      pricePro

    const mode = product === "daypass" ? "payment" : "subscription"

    const session = await stripe.checkout.sessions.create({
      mode,
      allow_promotion_codes: true,
      customer_creation: "always",
      line_items: [{ price, quantity: 1 }],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?canceled=1`,
      metadata: { product },
      ...(mode === "subscription"
        ? { subscription_data: { metadata: { product } } }
        : { payment_intent_data: { metadata: { product } } })
    })

    return NextResponse.json({ url: session.url })
  } catch (e) {
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 })
  }
}
