import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import { BRAND, COMMUNITY } from "@/lib/constants"

const people = [
  {
    name: "Rolf S.",
    role: "Founder · Ops/Research",
    bio: "Baut seit Jahren Bots, Pipelines und Deployments. Wenn etwas nachts um 03:00 brennt: Runbook statt Panik."
  },
  {
    name: "Mara K.",
    role: "Security Engineering",
    bio: "Threat Modeling, Default-Hardening, Incident-Forensik. Allergisch gegen 'wird schon'."
  },
  {
    name: "Jonas P.",
    role: "Platform & Reliability",
    bio: "Observability, SLOs, Kosten & Stabilität. Macht Systeme langweilig — das ist ein Kompliment."
  }
]

export default function AboutPage() {
  return (
    <Container>
      <div className="py-16">
        <SectionTitle
          kicker="E-A-T / Transparenz"
          title="Über uns: Warum ClawGuru existiert"
          subtitle="Autorität entsteht nicht durch Lautstärke, sondern durch Methodik, Klarheit und wiederholbare Ergebnisse."
        />

        <div className="mt-10 grid lg:grid-cols-2 gap-10 items-start">
          <div className="p-8 rounded-3xl border border-gray-800 bg-black/30">
            <h2 className="text-2xl font-black mb-3">Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              {BRAND.name} ist ein Ops- und Security-Command-Center für das OpenClaw/Moltbot-Ökosystem:
              weniger Gerücht, mehr Checklisten. Weniger „irgendwie“, mehr „so geht’s reproduzierbar“.
            </p>

            <div className="mt-6 p-5 rounded-2xl border border-gray-800 bg-black/20">
              <div className="text-xs uppercase tracking-widest text-gray-400">Wichtig</div>
              <p className="mt-2 text-sm text-gray-300">
                Der LIVE-Checker ist eine <span className="font-semibold">heuristische Risiko-Einschätzung</span> (kein Audit, kein Portscan).
                Für belastbare Aussagen brauchst du Config/Logs, Monitoring und ggf. einen echten Security-Review.
              </p>
            </div>

            <h3 className="mt-8 text-xl font-black mb-3">Kontakt</h3>
            <p className="text-gray-300">
              Partnerships, Listings, Responsible Disclosure:{" "}
              <a className="text-cyan-300 underline hover:text-cyan-200" href="/impressum">Impressum</a>
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Community:{" "}
              <a className="text-cyan-300 underline hover:text-cyan-200" href={COMMUNITY.discordInvite} target="_blank" rel="noreferrer">
                Discord
              </a>
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-3xl border border-gray-800 bg-black/30">
              <h2 className="text-2xl font-black mb-6">Team</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {people.map((p) => (
                  <div key={p.name} className="p-5 rounded-2xl border border-gray-800 bg-black/20">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-cyan to-brand-violet flex items-center justify-center font-black">
                        {p.name.split(" ").map((x) => x[0]).join("")}
                      </div>
                      <div>
                        <div className="font-black">{p.name}</div>
                        <div className="text-xs text-gray-400">{p.role}</div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-300 leading-relaxed">{p.bio}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Hinweis: Namen können gekürzt/pseudonymisiert sein. Inhalte und Methodik sind das, was zählt.
              </div>
            </div>

            <div className="p-8 rounded-3xl border border-gray-800 bg-black/30">
              <h2 className="text-2xl font-black mb-3">Wie wir Autorität bauen</h2>
              <ul className="mt-4 space-y-3 text-gray-300">
                <li><span className="text-cyan-300 font-bold">•</span> Runbooks statt Blog-Noise</li>
                <li><span className="text-cyan-300 font-bold">•</span> Konversation → Checkliste → Tool → Ergebnis</li>
                <li><span className="text-cyan-300 font-bold">•</span> Transparenz: Affiliate-Links werden markiert</li>
                <li><span className="text-cyan-300 font-bold">•</span> Community-Feedback: Cases werden anonymisiert dokumentiert</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
