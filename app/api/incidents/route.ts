import { NextResponse } from "next/server"

const ITEMS = [
  {
    id: "inc-001",
    title: "Exposed Gateway (public) → Token Leakage",
    severity: "high",
    category: "exposure",
    when: "Feb 2026 · 6h ago",
    summary: "Öffentliche Gateway-Endpunkte ohne private networking + weak auth führen wiederholt zu Key/Token-Leaks.",
    actions: ["Private subnet/VPN", "Firewall deny-by-default", "Keys rotieren", "Auth-Fail alerts"]
  },
  {
    id: "inc-002",
    title: "WebSocket Origin wildcard → Remote Control Vector",
    severity: "high",
    category: "websocket",
    when: "Feb 2026 · 1d ago",
    summary: "Origin nicht gebunden + lange Token-TTL: Angriffe über fremde Origins möglich (je nach Setup).",
    actions: ["Origin allowlist", "Token scope + short TTL", "Rate limits", "CSRF/Session binding"]
  },
  {
    id: "inc-003",
    title: "Secrets committed in repo (env/config)",
    severity: "high",
    category: "secrets",
    when: "Jan 2026 · 2w ago",
    summary: "Keys im Klartext in .env/config/compose → Leaks über Forks/Logs/Backups.",
    actions: ["Secrets entfernen", "Rotation", "Secret scanning", "Least privilege"]
  },
  {
    id: "inc-004",
    title: "Debug endpoints left on in production",
    severity: "medium",
    category: "ops",
    when: "Jan 2026 · 3w ago",
    summary: "Debug/metrics offen → Info leak + Einstiegshilfe für Angreifer.",
    actions: ["Debug off", "Auth vor metrics", "IP allowlists", "Monitoring über private links"]
  },
  {
    id: "inc-005",
    title: "Supply-chain drift (dependencies) in skills",
    severity: "medium",
    category: "supply-chain",
    when: "Dec 2025 · 6w ago",
    summary: "Ungepinntes Dependency-Update in Skill-Repo → unerwartetes Verhalten, potentiell riskant.",
    actions: ["Lockfiles", "Review", "SBOM", "Minimal perms"]
  }
]

export async function GET() {
  return NextResponse.json({ items: ITEMS, updatedAt: new Date().toISOString() })
}
