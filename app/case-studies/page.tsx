import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"

const cases = [
  {
    title: "Case 01 — Exposed Panel + Key Rotation",
    tag: "Incident",
    summary:
      "Instanz war öffentlich erreichbar, Logs zeigen wiederholte Auth-Fails. Rotation + private binding + allowlist hat das Problem innerhalb von 20 Minuten beendet.",
    steps: [
      "Keys rotieren (API/Telegram) und alte Tokens invalidieren",
      "Ingress schließen (Firewall deny-by-default, private subnet)",
      "Origin allowlist für WebSockets aktivieren",
      "Monitoring & Alerting für Auth-Fails aktivieren"
    ]
  },
  {
    title: "Case 02 — „Alles läuft“, aber Kosten explodieren",
    tag: "Kosten",
    summary:
      "Root cause war nicht der Provider, sondern fehlende Limits/Autoscaling-Defaults und ein Chatty-Worker. Fix: Limits, Batching, Cache, Observability.",
    steps: [
      "Worker concurrency begrenzen",
      "Requests batchen, Cache aktivieren",
      "Rate limits setzen",
      "SLO definieren + Alarm bei Anomalien"
    ]
  },
  {
    title: "Case 03 — Random Downtime durch Deploy-Friction",
    tag: "Reliability",
    summary:
      "Deployments ohne Rollback/Healthchecks. Fix: Health endpoints, blue/green, standardisierte env validation, Backups testen.",
    steps: [
      "Healthcheck + readiness gate",
      "Rollback-Strategy",
      "ENV-Validator in CI",
      "Restore-Test (Backup ist nur Theorie, bis du restorest)"
    ]
  }
]

export default function CaseStudiesPage() {
  return (
    <Container>
      <div className="py-16">
        <SectionTitle
          kicker="Beweise > Behauptungen"
          title="Case Studies (anonymisiert)"
          subtitle="So sieht Autorität aus: Muster → Schritte → Ergebnis. Keine Magie, nur saubere Reihenfolge."
        />

        <div className="mt-10 grid lg:grid-cols-3 gap-6 items-start">
          {cases.map((c) => (
            <div key={c.title} className="p-6 rounded-3xl border border-gray-800 bg-black/30">
              <div className="text-xs uppercase tracking-widest text-cyan-300/80 font-bold">{c.tag}</div>
              <h2 className="mt-2 text-xl font-black">{c.title}</h2>
              <p className="mt-3 text-sm text-gray-300 leading-relaxed">{c.summary}</p>

              <div className="mt-5 text-sm font-bold text-gray-200">Runbook-Auszug</div>
              <ul className="mt-3 space-y-2 text-sm text-gray-300">
                {c.steps.map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <a className="px-4 py-2 rounded-xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200 transition-colors" href="/copilot">
                  Copilot anwenden →
                </a>
                <a className="px-4 py-2 rounded-xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200 transition-colors" href="/vault">
                  Vault Referenzen →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 rounded-3xl border border-gray-800 bg-black/20">
          <div className="text-lg font-black">Willst du deinen Case hier?</div>
          <p className="text-gray-300 mt-2">
            Schick anonymisierte Logs/Config-Snippets (ohne Secrets). Wir bauen daraus ein Runbook und – wenn du willst – eine Case Study.
          </p>
        </div>
      </div>
    </Container>
  )
}
