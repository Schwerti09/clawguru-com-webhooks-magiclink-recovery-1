import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const res = NextResponse.redirect(new URL("/", origin))
  res.cookies.set({ name: "claw_access", value: "", maxAge: 0, path: "/" })
  return res
}
