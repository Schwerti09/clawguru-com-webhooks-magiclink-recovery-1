import { NextResponse } from "next/server"
import { adminCookieName } from "@/lib/admin-auth"

export const runtime = "nodejs"

export async function GET() {
  const res = NextResponse.redirect(new URL("/admin", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"))
  res.cookies.set({
    name: adminCookieName(),
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 0
  })
  return res
}
