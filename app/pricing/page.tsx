import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import BuyButton from "@/components/commerce/BuyButton"

export const metadata = {
  title: "Pricing | ClawGuru",
  description:
    "ClawGuru Pro (Abo), Team Pro (Abo) und Day Pass (24h). Outcome: Score → Runbook → Fix → Re-Check."
}

function Card({
  title,
  price,
  cadence,
  desc,
  bullets,
  children,
  accent
}: {
  title: string
  price: string
  cadence: string
  desc: string
  bullets: string[]
  children: React.ReactNode
  accent?: string
}) {
  return (
    <div className={"p-7 rounded-3xl border border-gray-800 bg-black/30 " + (accent || "")}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-2xl font-black">{title}</div>
          <div className="text-gray-400 mt-2">{desc}</div>
        </div>

        <div className="text-right">
          <div className="text-3xl font-black text-white">{price}</div>
          <div className="text-xs text-gray-500 mt-1">{cadence}</div>
        </div>
      </div>

      <ul className="mt-5 space-y-2 text-sm text-gray-200">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span className="text-cyan-300 font-bold">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">{children}</div>
    </div>
  )
}

export default function PricingPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const canceled = typeof searchParams?.canceled === "string" ? searchParams?.canceled : ""
  const missing = typeof searchParams?.missing_session === "string" ? searchParams?.missing_session : ""
  return (
    <Container>
      <div className="py-16 max-w-6xl mx-auto">
        <SectionTitle
          kicker="Stripe SaaS"
          title="Pro Access"
          subtitle="Der Unterschied zwischen „lesen“ und „lösen“: Dashboards, Runbooks, Kits, Reports."
        />

        {canceled ? (
          <div className="mt-6 p-4 rounded-2xl border border-gray-800 bg-black/30 text-gray-300">
            Checkout abgebrochen. Kein Stress. Du kannst jederzeit wieder starten.
          </div>
        ) : null}

        {missing ? (
          <div className="mt-6 p-4 rounded-2xl border border-gray-800 bg-black/30 text-gray-300">
            Zugriff konnte nicht aktiviert werden. Öffne den Success-Link aus Stripe erneut.
          </div>
        ) : null}

        <div className="mt-10 grid lg:grid-cols-3 gap-6 items-start">
          <Card
            title="ClawGuru Pro"
            price="€9,99"
            cadence="pro Monat"
            desc="Für Solo-Operatoren, die ihr Setup nicht verlieren wollen."
            bullets={[
              "Dashboard (Mission Mode) + Zugriff aktivieren",
              "Kits: Sprint Pack (PDF) + Incident Kit (ZIP)",
              "Copilot Runbook Builder (Playbooks)",
              "Badge Studio (Share Loop)",
              "Weekly Digest (coming next)"
            ]}
          >
            <div className="flex flex-wrap gap-3">
              <BuyButton product="pro" label="Pro starten" className="px-6 py-3 rounded-2xl font-black bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90" />
              <a href="/check" className="px-6 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200">
                Erst Score prüfen →
              </a>
            </div>
          </Card>

          <Card
            title="Team Pro"
            price="€29,99"
            cadence="pro Monat"
            desc="Für 2–10 Projekte. Shared Ops statt Chaos."
            bullets={[
              "Alles aus Pro",
              "Mehr Projekte + Shared Dashboard (coming next)",
              "Team Alerts (E-Mail/Discord – coming next)",
              "Gemeinsame Runbook Library",
              "Priorisierter Copilot Kontext"
            ]}
            accent="bg-gradient-to-br from-gray-950/70 to-blue-950/30"
          >
            <div className="flex flex-wrap gap-3">
              <BuyButton product="team" label="Team starten" />
              <a href="/mission-control" className="px-6 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200">
                Mission Control ansehen →
              </a>
            </div>
          </Card>

          <Card
            title="Day Pass"
            price="€7"
            cadence="nur 24h"
            desc="Für akute Incidents: ein Tag Pro-Zugang. Rein, fixen, raus."
            bullets={[
              "24 Stunden Dashboard + Kits",
              "Copilot Runbooks",
              "Score + Re-Check Loop",
              "Perfekt für Notfälle / Cost Spikes"
            ]}
          >
            <div className="flex flex-wrap gap-3">
              <BuyButton product="daypass" label="Day Pass holen" className="px-6 py-3 rounded-2xl font-black bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90" />
              <a href="/security/notfall-leitfaden" className="px-6 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200">
                Notfall-Runbook →
              </a>
            </div>
          </Card>
        </div>

        <div className="mt-10 p-7 rounded-3xl border border-gray-800 bg-black/25">
          <div className="text-xs uppercase tracking-widest text-gray-400">Schon bezahlt?</div>
          <div className="mt-2 text-2xl font-black">Öffne deinen Success-Link und aktiviere Zugriff</div>
          <p className="mt-3 text-gray-300 max-w-3xl">
            Nach dem Stripe Checkout landest du auf <code className="text-gray-200">/success</code>. Dort klickst du „Zugriff aktivieren“ → Dashboard.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="/dashboard" className="px-6 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200">
              Dashboard öffnen →
            </a>
          </div>
        </div>

        <div className="mt-10 text-sm text-gray-500">
          Dev-Hinweis: Setze in Vercel/Netlify <code className="text-gray-200">STRIPE_SECRET_KEY</code>. Price IDs sind vorkonfiguriert, können aber via
          <code className="text-gray-200"> STRIPE_PRICE_PRO</code>, <code className="text-gray-200"> STRIPE_PRICE_TEAM</code>, <code className="text-gray-200"> STRIPE_PRICE_DAYPASS</code> überschrieben werden.
        </div>
      </div>
    </Container>
  )
}
