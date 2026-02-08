'use client'

import Container from "@/components/shared/Container"
import { useMemo, useState } from "react"

type Finding = { severity: "low" | "medium" | "high"; title: string; detail: string }

function analyze(text: string): Finding[] {
  const f: Finding[] = []
  const t = text || ""
  const add = (severity: Finding["severity"], title: string, detail: string) => f.push({ severity, title, detail })

  if (!t.trim()) return f

  if (/0\.0\.0\.0|\b0\:\:0\b|listen\s*:\s*0\.0\.0\.0/i.test(t)) {
    add("high", "Bind-All / öffentliche Exposition", "Du bindest wahrscheinlich auf allen Interfaces. Nutze private subnet + Firewall.")
  }
  if (/ws:\/\//i.test(t)) {
    add("medium", "WebSocket Surface erkannt", "Prüfe Origin-Validation, CSRF/Session Binding und Token Scope.")
  }
  if (/password\s*:\s*(admin|password|1234)/i.test(t)) {
    add("high", "Default Credentials", "Standard-Passwörter sind ein Meme. Und ein Einbruch.")
  }
  if (/api[_-]?key\s*:\s*['\"][^'\"]+['\"]/i.test(t) || /OPENAI_API_KEY|ANTHROPIC_API_KEY|TELEGRAM_TOKEN/i.test(t)) {
    add("high", "Secrets im Klartext", "API Keys nicht in Config committen. Nutze ENV/Secret Manager.")
  }
  if (/allow[_-]?origin\s*:\s*\*/i.test(t)) {
    add("high", "CORS/Origin zu offen", "Wildcard-Origin ist bei WebSockets/Apps oft ein Riesentor.")
  }
  if (/debug\s*:\s*true/i.test(t)) {
    add("medium", "Debug aktiv", "Debug kann sensitive Infos ausspucken. Für Prod: aus.")
  }
  if (/http:\/\//i.test(t)) {
    add("medium", "Unverschlüsselt (http://)", "TLS erzwingen, HSTS prüfen, keine Credentials im Klartext.")
  }

  if (f.length === 0) add("low", "Keine offensichtlichen Muster", "Das heißt nicht sicher – nur keine typischen Anfänger-Fehler erkannt.")
  return f
}

function sevColor(s: Finding["severity"]) {
  if (s === "high") return "text-brand-red border-brand-red/30 bg-brand-red/10"
  if (s === "medium") return "text-brand-orange border-brand-orange/30 bg-brand-orange/10"
  return "text-brand-green border-brand-green/30 bg-brand-green/10"
}

export default function Tools() {
  const [config, setConfig] = useState("")
  const findings = useMemo(() => analyze(config), [config])

  function download() {
    const report = [
      "ClawGuru Config Report",
      "=====================",
      "",
      `Generated: ${new Date().toISOString()}`,
      "",
      ...findings.map((f) => `- [${f.severity.toUpperCase()}] ${f.title}\n  ${f.detail}`)
    ].join("\n")
    const blob = new Blob([report], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "clawguru-config-report.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Container>
      <div className="py-16 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Tools</h1>
        <p className="text-gray-300 text-lg mb-10">
          Utilities, die dir Zeit sparen: Validator + Report. Kein Login.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="p-7 rounded-2xl border border-gray-800 bg-black/30">
            <h2 className="text-2xl font-black mb-2">Config Validator</h2>
            <p className="text-gray-400 mb-4">Paste Config Snippets. Wir markieren typische Misconfigs.</p>
            <textarea
              className="w-full h-56 rounded-xl bg-black/40 border border-gray-700 p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/30 focus:border-brand-cyan"
              placeholder="Paste config.yaml / .env / docker-compose Snippet…"
              value={config}
              onChange={(e) => setConfig(e.target.value)}
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={download}
                disabled={!config.trim()}
                className="px-5 py-3 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 hover:bg-brand-cyan/25 font-black disabled:opacity-50"
              >
                Report downloaden
              </button>
              <a
                href="/copilot"
                className="px-5 py-3 rounded-xl bg-black/30 border border-gray-700 hover:bg-black/40 font-black"
              >
                Mit Copilot diskutieren
              </a>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Hinweis: Pattern-basiert. Für harte Audits: professionelle Prüfung.
            </div>
          </div>

          <div className="p-7 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/60 to-black">
            <h2 className="text-2xl font-black mb-4">Findings</h2>
            <div className="space-y-3">
              {config.trim() ? (
                findings.map((f) => (
                  <div key={f.title} className={"p-4 rounded-2xl border " + sevColor(f.severity)}>
                    <div className="font-black">{f.title}</div>
                    <div className="text-gray-200 text-sm mt-1">{f.detail}</div>
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-2xl border border-gray-800 bg-black/30 text-gray-400">
                  Paste links rein, Findings erscheinen hier.
                </div>
              )}
            </div>

            <div className="mt-8 p-5 rounded-2xl border border-gray-800 bg-black/30">
              <div className="font-black mb-2">Empfohlene Route</div>
              <ol className="text-sm text-gray-300 list-decimal pl-5 space-y-1">
                <li>Notfall? Runbook</li>
                <li>Sprint</li>
                <li>Vault</li>
              </ol>
              <div className="mt-4 flex flex-wrap gap-2">
                <a className="px-4 py-2 rounded-xl bg-black/30 border border-gray-700 hover:bg-black/40" href="/security/notfall-leitfaden">Runbook</a>
                <a className="px-4 py-2 rounded-xl bg-black/30 border border-gray-700 hover:bg-black/40" href="/academy">Sprint</a>
                <a className="px-4 py-2 rounded-xl bg-black/30 border border-gray-700 hover:bg-black/40" href="/vault">Vault</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
