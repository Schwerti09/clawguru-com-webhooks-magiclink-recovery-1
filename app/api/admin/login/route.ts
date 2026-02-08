import { NextRequest, NextResponse } from "next/server"
import { adminCookieName, issueAdminToken } from "@/lib/admin-auth"

export const runtime = "nodejs"

function json(status: number, body: any) {
  return NextResponse.json(body, { status })
}

export async function POST(req: NextRequest) {
  const { user, pass } = await req.json().catch(() => ({ user: "", pass: "" }))

  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || ""
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ""

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !(process.env.ADMIN_SESSION_SECRET || "")) {
    return json(500, { error: "Admin ENV missing" })
  }

  if (typeof user !== "string" || typeof pass !== "string") {
    return json(400, { error: "Invalid payload" })
  }

  // timing-safe compare
  const okUser = user === ADMIN_USERNAME
  const a = Buffer.from(pass)
  const b = Buffer.from(ADMIN_PASSWORD)
  const crypto = await import("crypto")
  const okPass = a.length === b.length && (a.length > 0) && crypto.timingSafeEqual(a, b)

  if (!(okUser && okPass)) {
    return json(401, { error: "Wrong credentials" })
  }

  const token = issueAdminToken(ADMIN_USERNAME)

  const res = json(200, { ok: true })
  res.cookies.set({
    name: adminCookieName(),
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 8
  })
  return res
}
