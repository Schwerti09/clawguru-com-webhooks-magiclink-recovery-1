import Container from "@/components/shared/Container"

const TOC = [
  { id: "status", label: "Status 2026" },
  { id: "cves", label: "CVE & Angriffsklassen" },
  { id: "checklist", label: "Hardening Checklist" },
  { id: "ops", label: "Ops-Disziplin" },
  { id: "links", label: "Weiterführend" }
]

export default function Pillar() {
  return (
    <Container>
      <div className="py-16">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-gray-800 bg-black/30 text-xs text-gray-300">
            📌 Pillar Page · ständig aktualisiert
          </div>

          <h1 className="mt-4 text-4xl md:text-6xl font-black leading-tight">
            OpenClaw Security 2026 – der lebende Lagebericht
          </h1>
          <p className="mt-5 text-gray-300 text-lg max-w-3xl">
            Dieses Dokument sammelt reale Risiken, Misconfigs und Schutzmaßnahmen. Ziel: du liest 10 Minuten
            und bist sicherer als 90% der „läuft doch“-Deployments.
          </p>

          <div className="mt-10 grid lg:grid-cols-[1fr_320px] gap-8">
            <article className="space-y-10">
              <section id="status" className="p-7 rounded-2xl border border-gray-800 bg-black/30">
                <h2 className="text-2xl font-black mb-2">Status 2026</h2>
                <p className="text-gray-300">
                  Das Hauptproblem ist selten der Code. Es ist Exposition + fehlende Disziplin:
                  Keys, Ports, WebSockets, Skills, Secrets.
                </p>
                <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-300">
                  <li>Viele Instanzen sind öffentlich erreichbar (Gateway/Ports/Debug).</li>
                  <li>WebSocket-Frontdoors werden oft ohne Origin-Binding betrieben.</li>
                  <li>Skills sind Supply-Chain-Risiko (Dependencies, Secrets, Prompt-Injection).</li>
                </ul>
              </section>

              <section id="cves" className="p-7 rounded-2xl border border-gray-800 bg-black/30">
                <h2 className="text-2xl font-black mb-2">CVE & Angriffsklassen</h2>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  {[
                    ["WebSocket Hijacking", "Origin/CSRF/Session Binding fehlt → Remote Control möglich."],
                    ["Exponierte Gateways", "Ports offen + weak auth → Keys/Conversations raus."],
                    ["Malicious Skills", "Supply Chain: Dependencies, Secrets, RCE-Vektoren."],
                    ["Prompt Injection", "Skill/Browser/Tools → Datenabfluss und Aktionen außerhalb Scope."]
                  ].map(([t, d]) => (
                    <div key={t} className="p-5 rounded-2xl border border-gray-800 bg-black/25">
                      <div className="font-black">{t}</div>
                      <div className="text-gray-300 mt-1 text-sm">{d}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-sm text-gray-400">
                  Hinweis: Dieses Dokument ersetzt keinen Pen-Test. Es ersetzt nur Chaos durch Prioritäten.
                </div>
              </section>

              <section id="checklist" className="p-7 rounded-2xl border border-gray-800 bg-black/30">
                <h2 className="text-2xl font-black mb-2">Hardening Checklist (Kurzfassung)</h2>
                <ol className="mt-4 list-decimal pl-5 space-y-2 text-gray-300">
                  <li>Private Networking (VPN/Tunnel), keine offenen Admin-Ports.</li>
                  <li>Token Scope + Rotation, Secrets niemals in Klartext.</li>
                  <li>Origin-Validation + CSRF für WebSockets.</li>
                  <li>Monitoring: Uptime, Auth-Fails, ungewöhnliche Requests, Rate Limits.</li>
                  <li>Skill Supply Chain: Review, Signierung/Lockfiles, Secrets-Scanner.</li>
                </ol>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a className="px-5 py-3 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 hover:bg-brand-cyan/25 font-black" href="/tools">
                    Tools: Validator
                  </a>
                  <a className="px-5 py-3 rounded-xl bg-brand-red/10 border border-brand-red/30 hover:bg-brand-red/15 font-black" href="/security/notfall-leitfaden">
                    Notfall-Protokoll
                  </a>
                </div>
              </section>

              <section id="ops" className="p-7 rounded-2xl border border-gray-800 bg-black/30">
                <h2 className="text-2xl font-black mb-2">Ops-Disziplin</h2>
                <p className="text-gray-300">
                  „Sicher“ ist kein Zustand, sondern ein Prozess:
                </p>
                <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-300">
                  <li>Release-Zyklen + Rollback (kein YOLO in Prod)</li>
                  <li>Incident-Runbook (wer macht was, wann)</li>
                  <li>Backups + Restore-Test (sonst sind Backups Fiktion)</li>
                  <li>Audit Logs + Zugriffstrennung (least privilege)</li>
                </ul>
              </section>

              <section id="links" className="p-7 rounded-2xl border border-gray-800 bg-black/30">
                <h2 className="text-2xl font-black mb-2">Weiterführend</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li><a href="/intel">Intel Feed</a></li>
                  <li><a href="/copilot">Copilot</a></li>
                  <li><a href="/academy">Academy Sprint</a></li>
                  <li><a href="/vault">Vault</a></li>
                </ul>
              </section>
            </article>

            <aside className="lg:sticky lg:top-36 h-fit p-6 rounded-2xl border border-gray-800 bg-gray-900/30">
              <div className="font-black mb-3">Inhalt</div>
              <ul className="space-y-2 text-sm">
                {TOC.map((t) => (
                  <li key={t.id}>
                    <a className="text-gray-200 hover:text-brand-cyan" href={`#${t.id}`}>{t.label}</a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 rounded-xl border border-gray-800 bg-black/25">
                <div className="font-black">Quick Action</div>
                <div className="text-sm text-gray-300 mt-1">Wenn du nur 2 Dinge tust:</div>
                <ol className="mt-2 text-sm text-gray-300 list-decimal pl-5 space-y-1">
                  <li>Keys rotieren</li>
                  <li>Exposition schließen</li>
                </ol>
                <div className="mt-4 flex flex-col gap-2">
                  <a className="px-4 py-2 rounded-xl bg-brand-red/10 border border-brand-red/30 hover:bg-brand-red/15 font-black text-center" href="/security/notfall-leitfaden">
                    Notfall
                  </a>
                  <a className="px-4 py-2 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 hover:bg-brand-cyan/25 font-black text-center" href="/copilot">
                    Copilot
                  </a>
                  <a className="px-4 py-2 rounded-xl bg-black/30 border border-gray-700 hover:bg-black/40 font-black text-center" href="/academy">
                    Sprint
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Container>
  )
}
