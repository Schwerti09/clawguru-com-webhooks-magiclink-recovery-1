import crypto from "crypto"

export type AccessPlan = "daypass" | "pro" | "team"

export type AccessTokenPayload = {
  v: 1
  plan: AccessPlan
  customerId: string
  // For subscriptions
  subscriptionId?: string
  // Unix seconds
  exp: number
  iat: number
}

function b64url(input: Buffer | string) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input, "utf-8")
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "")
}

function b64urlToBuf(s: string) {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4))
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad
  return Buffer.from(b64, "base64")
}

export function signAccessToken(payload: AccessTokenPayload) {
  const secret = process.env.ACCESS_TOKEN_SECRET || process.env.NEXTAUTH_SECRET || process.env.STRIPE_SECRET_KEY
  if (!secret) throw new Error("Missing ACCESS_TOKEN_SECRET (or NEXTAUTH_SECRET)")
  const body = b64url(JSON.stringify(payload))
  const sig = crypto.createHmac("sha256", secret).update(body).digest()
  return `${body}.${b64url(sig)}`
}

export function verifyAccessToken(token: string): AccessTokenPayload | null {
  try {
    const secret = process.env.ACCESS_TOKEN_SECRET || process.env.NEXTAUTH_SECRET || process.env.STRIPE_SECRET_KEY
    if (!secret) return null
    const [body, sig] = token.split(".")
    if (!body || !sig) return null
    const expected = crypto.createHmac("sha256", secret).update(body).digest()
    const got = b64urlToBuf(sig)
    if (got.length !== expected.length) return null
    if (!crypto.timingSafeEqual(got, expected)) return null
    const payload = JSON.parse(b64urlToBuf(body).toString("utf-8")) as AccessTokenPayload
    if (!payload?.exp || !payload?.plan || !payload?.customerId) return null
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp <= now) return null
    return payload
  } catch {
    return null
  }
}
