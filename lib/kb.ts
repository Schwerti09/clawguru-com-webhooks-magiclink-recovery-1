export type KBItem = {
  id: string
  title: string
  tags: string[]
  excerpt: string
  href: string
}

export const KB: KBItem[] = [
  {
    id: "ws-origin",
    title: "WebSocket Origin Validation (warum es zählt)",
    tags: ["security", "websocket", "origin", "csrf"],
    excerpt: "Origin/CSRF/Session-Binding sind die drei häufigsten Lücken bei Bot-Gateways.",
    href: "/vault/ws-origin"
  },
  {
    id: "secrets-hygiene",
    title: "Secrets Hygiene: Rotieren, Scope, Vault",
    tags: ["security", "secrets", "ops"],
    excerpt: "Wenn Keys geleakt sind, ist 'später' keine Option. Rotation ist ein Prozess.",
    href: "/vault/secrets"
  },
  {
    id: "private-networking",
    title: "Private Networking (VPN/Tunnel) als Default",
    tags: ["ops", "network", "hardening"],
    excerpt: "Öffentliche Exposition ist der Standardfehler. Private Subnets machen dich langweilig – gut so.",
    href: "/einrichtung"
  },
  {
    id: "incident-runbook",
    title: "Incident Runbook: 0–60 Minuten",
    tags: ["ops", "incident", "runbook"],
    excerpt: "Wenn’s brennt: Reihenfolge schlägt Intelligenz.",
    href: "/security/notfall-leitfaden"
  },
  {
    id: "cost-tco",
    title: "TCO: Die echten Kosten von 'DIY in Prod'",
    tags: ["costs", "ops"],
    excerpt: "Infra ist billig. Incidents sind teuer. Zeit ist die teuerste Währung.",
    href: "/hosting-kosten"
  }
]
