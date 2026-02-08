import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"

export default function Setup() {
  return (
    <Container>
      <div className="py-16 max-w-4xl mx-auto">
        <SectionTitle
          kicker="Setup"
          title="Einrichtung & Hardening"
          subtitle="Der Unterschied zwischen 'läuft' und 'läuft sicher' ist eine Checkliste – plus Disziplin."
        />

        <div className="space-y-6">
          {[
            ["1) Private Networking", "Deploy in privatem Subnetz. Zugriff nur via VPN/Tunnel (z.B. Tailscale/WireGuard)."],
            ["2) Auth & Origin", "Token-Binding, Origin-Validation für WebSockets, keine Wildcards."],
            ["3) Secrets", "ENV/Secret Manager statt Klartext. Rotation & Audit Logs."],
            ["4) Monitoring", "Uptime, Auth-Fails, ungewöhnliche Requests, Rate-Limits."],
            ["5) Updates", "Release-Disziplin, Rollback-Plan, Backups & Restore-Tests."]
          ].map(([t, d]) => (
            <div key={t} className="p-6 rounded-2xl border border-gray-800 bg-black/30">
              <div className="font-black text-xl mb-2">{t}</div>
              <div className="text-gray-300">{d}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-7 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/60 to-black">
          <div className="font-black text-2xl">Schnellstart</div>
          <p className="mt-2 text-gray-300">
            Erst Tools/Validator, dann Sprint, dann Vault – dann bist du auf einem Level, wo „Incidents“ seltener werden.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a className="px-5 py-3 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 hover:bg-brand-cyan/25 font-black" href="/tools">
              Tools
            </a>
            <a className="px-5 py-3 rounded-xl bg-black/30 border border-gray-700 hover:bg-black/40 font-black" href="/academy">
              Sprint
            </a>
            <a className="px-5 py-3 rounded-xl bg-black/30 border border-gray-700 hover:bg-black/40 font-black" href="/vault">
              Vault
            </a>
          </div>
        </div>
      </div>
    </Container>
  )
}
