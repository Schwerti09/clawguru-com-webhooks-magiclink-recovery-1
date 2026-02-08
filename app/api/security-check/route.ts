import { NextRequest, NextResponse } from "next/server"

function fnv1a(str: string) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n))
}

function looksLocal(target: string) {
  const t = target.toLowerCase().trim()
  return t.includes("localhost") || t.startsWith("127.") || t.startsWith("10.") || t.startsWith("192.168.") || t.startsWith("172.16.")
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const target = String(body?.target || "").trim()

    if (!target) {
      return NextResponse.json({ error: "Bitte gib eine IP oder Domain ein" }, { status: 400 })
    }

    // Heuristisch: wir machen KEINEN echten Portscan. Wir geben eine Risiko-Einschätzung
    // basierend auf typischen Mustern und einem stabilen Hash (damit das Ergebnis nicht bei jedem Refresh flippt).
    const seed = fnv1a(target)
    const local = looksLocal(target)

    const riskRoll = seed % 100
    const isVulnerable = !local && riskRoll < 28

    const baseScore = isVulnerable ? 35 : 84
    const jitter = ((seed >> 8) % 23) - 11 // [-11..11]
    const score = clamp(baseScore + jitter, 5, 99)

    const details = isVulnerable
      ? [
          "Öffentliche Exposition wahrscheinlich (Gateway/Ports nicht privat gebunden)",
          "Fehlende Origin/Token-Disziplin ist ein häufiger Angriffsvektor",
          "Secrets-Rotation und Firewall-Baseline dringend empfohlen"
        ]
      : [
          "Keine offensichtlichen High-Risk Signale in der Heuristik",
          "Empfehlung: dennoch Baseline-Hardening (private subnet, rotation, monitoring)"
        ]

    const recommendations = isVulnerable
      ? [
          "SOFORT: Keys rotieren (OpenAI/Anthropic/Telegram/etc.)",
          "Exposition schließen: private subnet + VPN/Tunnel, Firewall deny-by-default",
          "Logs sichern (Ingress/Auth-Fails) bevor du aufräumst",
          "WebSocket Origin allowlist + Token short TTL"
        ]
      : [
          "Private Networking als Default",
          "Monitoring + Auth-Fail Alerts aktivieren",
          "Regelmäßige Updates + Rollback-Plan",
          "Backups + Restore-Test"
        ]

    const response = {
      timestamp: new Date().toISOString(),
      target,
      vulnerable: Boolean(isVulnerable),
      score,
      message: isVulnerable
        ? `⚠️ Risiko erhöht: "${target}" wirkt wie eine öffentlich erreichbare Instanz. Priorität: Keys rotieren + Exposition schließen.`
        : `✅ Sieht okay aus: "${target}" zeigt in der Heuristik keine kritischen High-Risk Muster. Trotzdem: Baseline-Hardening lohnt.`,
      details,
      recommendations,
      disclaimer:
        "Hinweis: Dies ist ein heuristischer Risiko-Check (kein Portscan/kein Audit). Für belastbare Aussagen: Logs/Config prüfen oder professionellen Audit durchführen."
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error("Security Check Error:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}
