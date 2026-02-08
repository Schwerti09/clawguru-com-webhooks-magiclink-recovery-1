import Stripe from "stripe"

// Server-only Stripe client.
// Required env vars:
// - STRIPE_SECRET_KEY
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  // Use a pinned API version if you want stricter stability:
  // apiVersion: "2024-06-20" as any
})
