export type Runbook = {
  slug: string
  title: string
  summary: string
  tags: string[]
  lastmod: string // YYYY-MM-DD
  howto: {
    steps: string[]
  }
}

const LASTMOD = "2026-02-08"

// Providers / Platforms (SEO seeds)
const PROVIDERS = [
  { slug: "hetzner", name: "Hetzner" },
  { slug: "digitalocean", name: "DigitalOcean" },
  { slug: "aws", name: "AWS" },
  { slug: "lightsail", name: "AWS Lightsail" },
  { slug: "gcp", name: "Google Cloud" },
  { slug: "azure", name: "Azure" },
  { slug: "cloudflare", name: "Cloudflare" },
  { slug: "vercel", name: "Vercel" },
  { slug: "netlify", name: "Netlify" },
  { slug: "flyio", name: "Fly.io" },
  { slug: "render", name: "Render" },
  { slug: "railway", name: "Railway" },
  { slug: "docker", name: "Docker" },
  { slug: "kubernetes", name: "Kubernetes" },
  { slug: "nginx", name: "Nginx" },
  { slug: "traefik", name: "Traefik" },
  { slug: "caddy", name: "Caddy" },
  { slug: "postgres", name: "Postgres" },
  { slug: "redis", name: "Redis" },
  { slug: "mongodb", name: "MongoDB" },
  { slug: "sentry", name: "Sentry" },
  { slug: "prometheus", name: "Prometheus" },
  { slug: "grafana", name: "Grafana" },
  { slug: "stripe", name: "Stripe" },
  { slug: "telegram", name: "Telegram" },
  { slug: "openai", name: "OpenAI" },
  { slug: "anthropic", name: "Anthropic" }
] as const

// Topic templates (safe + money)
const TOPICS = [
  { slug: "firewall-baseline", title: "Firewall Baseline", summary: "Default deny, minimal offene Ports, sichere Defaults." },
  { slug: "ssh-hardening", title: "SSH Hardening", summary: "Key-only, Root aus, Rate-Limits, sichere Admin-Zugänge." },
  { slug: "ws-origin-hardening", title: "WebSocket Origin Hardening", summary: "Origin whitelist, Auth, Rate-Limits, sichere Headers." },
  { slug: "reverse-proxy-baseline", title: "Reverse Proxy Baseline", summary: "TLS, headers, caching, upstream health, timeouts." },
  { slug: "rate-limit-baseline", title: "Rate Limit Baseline", summary: "Edge + App Limits gegen Abuse und Cost-Spikes." },
  { slug: "ddos-first-response", title: "DDoS First Response", summary: "Blocken, absorbieren, recovern – ohne Panik." },
  { slug: "api-key-rotation", title: "API Key Rotation (Notfall)", summary: "Keys rotieren, alte killen, re-deploy, audit." },
  { slug: "secrets-management", title: "Secrets Management", summary: "Kein .env in Git. Secret stores sauber einsetzen." },
  { slug: "security-headers-csp", title: "Security Headers & CSP", summary: "CSP, HSTS, XFO, Referrer Policy – richtig." },
  { slug: "backup-restore-drill", title: "Backup/Restore Drill", summary: "Backups ohne Restore sind Fantasy. So testest du’s." },
  { slug: "observability-baseline", title: "Observability Baseline", summary: "Logs, Metrics, Traces – minimal sinnvoll." },
  { slug: "incident-communication", title: "Incident Kommunikation", summary: "Status, Updates, intern/extern – sauberer Ablauf." }
] as const

// Error strings (Longtail magnet)
const ERRORS = [
  "502 bad gateway",
  "504 gateway timeout",
  "500 internal server error",
  "429 too many requests",
  "403 forbidden",
  "401 unauthorized",
  "dns enotfound",
  "econnreset",
  "etimedout",
  "eai_again",
  "certificate expired",
  "too many redirects",
  "request entity too large 413",
  "csrf token mismatch",
  "cors blocked",
  "webhook signature verification failed",
  "stripe webhook signature mismatch",
  "database connection refused",
  "too many connections",
  "out of memory",
  "disk full",
  "read-only file system",
  "permission denied",
  "invalid jwt",
  "session expired",
  "missing environment variable",
  "module not found",
  "build failed",
  "unexpected token",
  "hydration failed",
  "fetch failed",
  "connection terminated",
  "tls handshake failed",
  "upstream prematurely closed connection",
  "worker exceeded time limit",
  "function timed out",
  "rate limit exceeded",
  "api quota exceeded",
  "websocket 1006 abnormal closure",
  "websocket 403 forbidden",
  "websocket origin not allowed",
  "postgres role does not exist",
  "relation does not exist",
  "redis connection error",
  "mongo authentication failed",
  "invalid api key",
  "unauthorized: invalid token",
  "request aborted",
  "socket hang up",
  "chunk load error",
  "edge function failed",
  "cors preflight failed",
  "blocked by cloudflare",
  "waf rule triggered",
  "too many open files"
] as const

const STACKS = [
  { slug: "nextjs", name: "Next.js" },
  { slug: "node", name: "Node.js" },
  { slug: "nginx", name: "Nginx" },
  { slug: "cloudflare", name: "Cloudflare" },
  { slug: "docker", name: "Docker" },
  { slug: "kubernetes", name: "Kubernetes" },
  { slug: "stripe", name: "Stripe" },
  { slug: "postgres", name: "Postgres" }
] as const

// Config pages (operators google these)
const CONFIGS = [
  { slug: "nginx-origin-whitelist-map", title: "Nginx: Origin Whitelist via map", summary: "WebSocket/HTTP Origins whitelisten ohne Chaos." },
  { slug: "nginx-rate-limit-zone", title: "Nginx: Rate Limit Zone", summary: "limit_req, limit_conn, bursts, safe defaults." },
  { slug: "cloudflare-waf-baseline", title: "Cloudflare WAF Baseline", summary: "WAF, Rate Limits, Bot fight – gute Defaults." },
  { slug: "docker-secrets", title: "Docker Secrets statt .env", summary: "Saubere Secrets ohne Git-Leaks." },
  { slug: "next-env-leak-prevent", title: "Next.js ENV Leak verhindern", summary: "Server/Client Boundary richtig ziehen." },
  { slug: "stripe-webhook-verify", title: "Stripe Webhooks verifizieren", summary: "Signaturen prüfen, Replay verhindern." },
  { slug: "postgres-least-privilege", title: "Postgres Least Privilege", summary: "Rollen, Rechte, Netzwerk minimal halten." },
  { slug: "redis-auth-tls", title: "Redis Auth + TLS", summary: "Redis nicht offen ins Internet – bitte nie." },
  { slug: "tailscale-admin-access", title: "Admin Access via Tailscale", summary: "SSH privat, keine öffentliche Angriffsfläche." },
  { slug: "log-rotation", title: "Log Rotation", summary: "Logs nicht explodieren lassen – rotation + retention." },
  { slug: "healthchecks-uptime", title: "Healthchecks & Uptime", summary: "Checks, Alerting, minimale SLOs." },
  { slug: "rate-limit-edge", title: "Edge Rate Limiting", summary: "Edge-first Limits gegen Abuse und Kosten." }
] as const

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr))
}

function stepsProviderTopic(providerName: string, topicTitle: string) {
  return [
    `Scope klären: Was genau willst du härten/ändern? (${topicTitle} auf ${providerName})`,
    "Ist-Zustand messen: Ports, Logs, Requests, Zugriffspfade.",
    "Fix anwenden (minimal & rückrollbar).",
    "Verifizieren: Re-Check + Smoke Tests.",
    "Guardrail setzen: Alerts/Rate Limits/Policies dokumentieren."
  ]
}

function stepsError(err: string, stack: string) {
  return [
    `Reproduzieren: Wann tritt "${err}" auf? (${stack})`,
    "Logs einsammeln (10–30 Zeilen) + Metriken (CPU/RAM/Latency).",
    "Wahrscheinliche Ursachen priorisieren (Top 3) und einzeln testen.",
    "Fix deployen (klein), dann verifizieren (Re-Check).",
    "Post-Fix: Guardrail (Rate Limit, Timeout, Retries, Circuit Breaker)."
  ]
}

function stepsConfig(title: string) {
  return [
    `Ziel definieren: Was soll diese Konfiguration erreichen? (${title})`,
    "Sichere Defaults setzen (deny-by-default, least privilege).",
    "Konfig anwenden + Reload/Deploy.",
    "Verifizieren (curl/healthcheck/logs) + Re-Check.",
    "Dokumentieren: Warum, wie, rollback."
  ]
}

function buildRunbooks(limit = 1000): Runbook[] {
  const out: Runbook[] = []

  // 1) Provider x Topic combos (high-intent)
  for (const p of PROVIDERS) {
    for (const t of TOPICS) {
      out.push({
        slug: `${p.slug}-${t.slug}`,
        title: `${t.title} auf ${p.name}`,
        summary: `${t.summary} (Operator Guide für ${p.name}).`,
        tags: uniq(["provider:" + p.slug, "topic:" + t.slug, ...[p.slug, "runbook", "ops"]]),
        lastmod: LASTMOD,
        howto: { steps: stepsProviderTopic(p.name, t.title) }
      })
      if (out.length >= limit) return out
    }
  }

  // 2) Error pages: Error x Stack combos
  for (const s of STACKS) {
    for (const e of ERRORS) {
      const es = slugify(e)
      out.push({
        slug: `${s.slug}-${es}`,
        title: `Fix: ${e} (${s.name})`,
        summary: `Runbook, um „${e}“ in ${s.name} schnell zu analysieren, zu fixen und zu verifizieren.`,
        tags: uniq(["error:" + es, "stack:" + s.slug, "debug", "incident", "runbook"]),
        lastmod: LASTMOD,
        howto: { steps: stepsError(e, s.name) }
      })
      if (out.length >= limit) return out
    }
  }

  // 3) Config pages
  for (const c of CONFIGS) {
    out.push({
      slug: c.slug,
      title: c.title,
      summary: c.summary,
      tags: uniq(["config", "runbook", "ops", ...c.slug.split("-").slice(0, 2)]),
      lastmod: LASTMOD,
      howto: { steps: stepsConfig(c.title) }
    })
    if (out.length >= limit) return out
  }

  // 4) Fillers: combine topic + config-ish patterns to reach exactly limit
  const fillers = [
    "tls-baseline",
    "hsts-baseline",
    "csp-baseline",
    "jwt-refresh-rotation",
    "session-revocation",
    "webhook-replay-protection",
    "bot-mitigation",
    "origin-lockdown",
    "least-privilege-iam",
    "k8s-network-policy",
    "log-based-alerting",
    "metrics-slo-sla",
    "cache-stampede",
    "thundering-herd",
    "queue-backpressure",
    "retry-storm",
    "timeout-tuning",
    "connection-pooling",
    "db-migrations-safe",
    "blue-green-deploy"
  ]

  for (const f of fillers) {
    for (const p of PROVIDERS) {
      out.push({
        slug: `${p.slug}-${f}`,
        title: `${f.replace(/-/g, " ").toUpperCase()} auf ${p.name}`,
        summary: `Operativer Guide: ${f.replace(/-/g, " ")} auf ${p.name} (sichere Defaults + Verifikation).`,
        tags: uniq([p.slug, "ops", "runbook", "topic:" + f]),
        lastmod: LASTMOD,
        howto: { steps: stepsProviderTopic(p.name, f.replace(/-/g, " ")) }
      })
      if (out.length >= limit) return out
    }
  }

  return out.slice(0, limit)
}

export const RUNBOOKS: Runbook[] = buildRunbooks(1000)

export function getRunbook(slug: string) {
  return RUNBOOKS.find((r) => r.slug === slug) || null
}

export function bucketsAF() {
  // Bucket by first char for sitemap chunking
  const groups: Record<string, Runbook[]> = {
    "a-f": [],
    "g-l": [],
    "m-r": [],
    "s-z": [],
    "0-9": []
  }
  for (const r of RUNBOOKS) {
    const c = (r.slug[0] || "").toLowerCase()
    if (c >= "a" && c <= "f") groups["a-f"].push(r)
    else if (c >= "g" && c <= "l") groups["g-l"].push(r)
    else if (c >= "m" && c <= "r") groups["m-r"].push(r)
    else if (c >= "s" && c <= "z") groups["s-z"].push(r)
    else groups["0-9"].push(r)
  }
  return groups
}

export function allTags() {
  const set = new Set<string>()
  for (const r of RUNBOOKS) for (const t of r.tags) set.add(t)
  return Array.from(set).sort((a, b) => a.localeCompare(b))
}

export function bucketsTagsAF() {
  const tags = allTags()
  const groups: Record<string, string[]> = { "a-f": [], "g-l": [], "m-r": [], "s-z": [], "0-9": [] }
  for (const t of tags) {
    const c = (t[0] || "").toLowerCase()
    if (c >= "a" && c <= "f") groups["a-f"].push(t)
    else if (c >= "g" && c <= "l") groups["g-l"].push(t)
    else if (c >= "m" && c <= "r") groups["m-r"].push(t)
    else if (c >= "s" && c <= "z") groups["s-z"].push(t)
    else groups["0-9"].push(t)
  }
  return groups
}

export function runbooksByTag(tag: string) {
  return RUNBOOKS.filter((r) => r.tags.includes(tag))
}
