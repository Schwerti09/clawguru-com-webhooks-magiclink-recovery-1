import { NextRequest, NextResponse } from "next/server"

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" } as any)[c] || c)
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const target = esc(String(searchParams.get("target") || "unknown"))
  const scoreRaw = Number(searchParams.get("score") || "0")
  const score = Number.isFinite(scoreRaw) ? Math.max(0, Math.min(100, Math.round(scoreRaw))) : 0
  const vulnerable = String(searchParams.get("vulnerable") || "0") === "1"

  const label = score >= 90 ? "EXZELLENT" : score >= 75 ? "SOLIDE" : score >= 60 ? "ANGREIFBAR" : "KRITISCH"
  const accent = vulnerable ? "#ef4444" : score >= 90 ? "#22c55e" : score >= 75 ? "#22c55e" : score >= 60 ? "#f59e0b" : "#ef4444"

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#030712"/>
      <stop offset="1" stop-color="#0b1b3a"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.2"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0.0"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="40" y="40" width="1120" height="550" rx="36" fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.08)" />
  <rect x="60" y="60" width="1080" height="510" rx="28" fill="url(#glow)" opacity="0.35" />

  <text x="90" y="140" fill="#e5e7eb" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="44" font-weight="800">
    Claw Security Score
  </text>

  <text x="90" y="200" fill="#9ca3af" font-family="JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="22" font-weight="600">
    target: ${target}
  </text>

  <text x="90" y="420" fill="#ffffff" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="160" font-weight="900">
    ${score}
  </text>

  <text x="420" y="420" fill="#9ca3af" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="44" font-weight="800">
    / 100
  </text>

  <rect x="90" y="455" width="240" height="54" rx="27" fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.10)" />
  <text x="210" y="492" text-anchor="middle" fill="${accent}" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="22" font-weight="900">
    ${label}
  </text>

  <text x="90" y="545" fill="#cbd5e1" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="22" font-weight="700">
    geprüft via clawguru.com
  </text>

  <text x="990" y="545" text-anchor="end" fill="rgba(255,255,255,0.55)" font-family="JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="18" font-weight="600">
    heuristik · kein audit
  </text>

  <circle cx="1090" cy="135" r="48" fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.10)" />
  <path d="M1070 135h40" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
  <path d="M1090 115v40" stroke="${accent}" stroke-width="8" stroke-linecap="round" opacity="0.55"/>
</svg>`

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  })
}
