export type CopilotMsg = { role: "user" | "assistant" | "system"; content: string }
export type CopilotResponse = {
  reply: string
  followups: string[]
  actions: Array<{ label: string; href?: string; command?: string }>
  confidence: "low" | "medium" | "high"
}

function includesAny(t: string, xs: string[]) {
  const s = t.toLowerCase()
  return xs.some((x) => s.includes(x))
}

export function ruleBasedCopilot(input: string): CopilotResponse {
  const t = input.trim()
  if (!t) {
    return {
      reply: `Sag mir, was du gerade versuchst: **deploy**, **härten**, **Kosten senken** oder **Incident**?`,
      followups: ["Ich will härten", "Ich glaube ich bin exposed", "Ich will Kosten optimieren", "Ich will Logs interpretieren"],
      actions: [{ label: "Tools öffnen", href: "/tools" }],
      confidence: "high"
    }
  }

  if (includesAny(t, ["exposed", "leak", "gehackt", "kompromitt", "key", "api key", "token"])) {
    return {
      reply: `Okay. Priorität ist **Schaden stoppen**.

1) **Keys rotieren** (OpenAI/Anthropic/Telegram/etc.)
2) **Zugriff schließen** (private subnet/VPN, Firewall)
3) **Logs sichern** (Ingress/Auth-Fails) bevor du aufräumst
4) **WebSocket/Origin** prüfen (häufigster Remote-Control-Vektor)

Wenn du willst: paste mir ein Snippet aus deiner Config/Compose oder ein Log-Excerpt (10–30 Zeilen).`,
      followups: ["Ich hab nginx logs", "Hier ist docker-compose", "Wie rotiere ich Keys sauber?", "Was genau heißt Origin-Validation?"],
      actions: [
        { label: "Notfall-Leitfaden", href: "/security/notfall-leitfaden" },
        { label: "Config Validator", href: "/tools" },
        { label: "Pillar: Lagebericht", href: "/openclaw-security-2026" },
        { label: "Incident Kit Pro (Stripe)", href: "/pricing" }
      ],
      confidence: "high"
    }
  }

  if (includesAny(t, ["websocket", "ws://", "origin", "csrf"])) {
    return {
      reply: `**WebSocket-Hardening** in 4 Punkten:

• Origin-Validation: nur deine Domains erlauben (keine Wildcards)
• Session/Token Binding: Token an Session/Client binden, kurze TTL
• CSRF-Schutz: wenn Cookies/Session genutzt werden
• Rate Limits + Auth-Fail Alerts

Wenn du mir sagst, welches Gateway/Framework du nutzt, gebe ich dir ein konkretes Pattern.`,
      followups: ["Ich nutze Next.js API Routes", "Ich nutze nginx + node", "Ich nutze Cloudflare", "Ich nutze raw ws"],
      actions: [{ label: "Knowledge: WS Origin", href: "/vault/ws-origin" }],
      confidence: "high"
    }
  }

  if (includesAny(t, ["kosten", "tco", "hosting", "hetzner", "aws", "digitalocean"])) {
    return {
      reply: `Kosten-Truth: **Infra ist selten das Problem**. Die Top-Killer sind Incidents + Betriebszeit.

Schnell-Optimierung:
• Private networking reduziert Incident-Risiko massiv
• Monitoring spart Debug-Zeit
• Ein solides Baseline-Setup schlägt 'billigster VPS'

Willst du eher **Minimal Budget** oder **Stabilität**?`,
      followups: ["Minimal Budget", "Stabilität", "Ich will EU-Only", "Ich will Enterprise"],
      actions: [{ label: "Kosten & Provider", href: "/hosting-kosten" },
      { label: "Hardening Sprint Pack (Stripe)", href: "/pricing" }],
      confidence: "medium"
    }
  }

  if (includesAny(t, ["config", "docker", "compose", "env", "yaml"])) {
    return {
      reply: `Nice. Paste es in den **Validator** – der findet typische Misconfigs.

Wenn du hier im Chat paste-st: entferne Secrets (oder ersetze sie durch \`***\`).`,
      followups: ["Ok, ich nutze den Validator", "Welche 3 Stellen sind am wichtigsten?", "Wie erkenne ich Bind-All?"],
      actions: [{ label: "Config Validator", href: "/tools" }],
      confidence: "high"
    }
  }

  return {
    reply: `Ich kann dir helfen – gib mir Kontext in 1 Satz: **Was läuft wo** (Provider/Stack) und **was ist das Ziel** (security, uptime, costs)?

Wenn du Logs hast: 10–30 Zeilen reichen.`,
    followups: ["Stack: nginx + node, Ziel: hardening", "Stack: docker, Ziel: costs", "Ich glaube ich bin exposed"],
    actions: [
      { label: "Mission Control", href: "/mission-control" },
      { label: "Tools", href: "/tools" }
    ],
    confidence: "low"
  }
}
