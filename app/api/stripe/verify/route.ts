import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export const runtime = "nodejs"

function allowedDownloadsFromLineItems(lineItems: any[]): string[] {
  const sprint = process.env.STRIPE_PRICE_SPRINT
  const incident = process.env.STRIPE_PRICE_INCIDENT
  const ids = new Set(lineItems.map((li) => li?.price?.id).filter(Boolean))
  const out: string[] = []
  if (sprint && ids.has(sprint)) out.push("sprint-pack")
  if (incident && ids.has(incident)) out.push("incident-kit")
  return out
}

export async function GET(req: NextRequest) {
  const session_id = req.nextUrl.searchParams.get("session_id") || ""
  if (!session_id) return NextResponse.json({ paid: false, error: "Missing session_id" }, { status: 400 })

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)
    const lineItems = await stripe.checkout.sessions.listLineItems(session_id, { expand: ["data.price"] })

    const paid = session.payment_status === "paid"
    const allowed = paid ? allowedDownloadsFromLineItems(lineItems.data as any[]) : []

    return NextResponse.json({
      paid,
      customer_email: session.customer_details?.email || null,
      allowedDownloads: allowed,
      currency: session.currency || null,
      amount_total: session.amount_total || null
    })
  } catch {
    return NextResponse.json({ paid: false, error: "Invalid session_id" }, { status: 200 })
  }
}
