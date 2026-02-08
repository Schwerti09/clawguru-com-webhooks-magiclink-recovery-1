import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import { getAccess } from "@/lib/access"
import PortalButton from "@/components/commerce/PortalButton"

export const runtime = "nodejs"

function Paywall() {
  return (
    <Container>
      <div className="py-16 max-w-4xl mx-auto">
        <SectionTitle
          kicker="ClawGuru Pro"
          title="Zugang nötig"
          subtitle="Dashboard, Weekly Digest, Reports, Kits. Erst aktivieren – dann Mission Mode."
        />
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            ["Pro", "Abo", "Score-History · Reports · Kits · Digest"],
            ["Team", "Abo", "Mehr Projekte · Shared Ops · Team Alerts"],
            ["Day Pass", "24h", "Ein Tag Pro-Zugang – für akute Incidents"]
          ].map(([t, p, d]) => (
            <div key={t} className="p-6 rounded-3xl border border-gray-800 bg-black/30">
              <div className="text-2xl font-black">{t}</div>
              <div className="text-gray-400 mt-1">{p}</div>
              <div className="text-sm text-gray-300 mt-3">{d}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/pricing" className="px-6 py-3 rounded-2xl font-black bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90">
            Pricing öffnen
          </a>
          <a href="/check" className="px-6 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200">
            Erst Score prüfen →
          </a>
        </div>
      </div>
    </Container>
  )
}

export default async function DashboardPage() {
  const access = await getAccess()
  if (!access.ok) return <Paywall />

  const plan = access.plan || "pro"

  return (
    <Container>
      <div className="py-16 max-w-5xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle
            kicker="Dashboard"
            title="Mission Mode"
            subtitle="Alles, was du brauchst, um nicht in Logs zu sterben."
          />
          <div className="flex gap-3">
            <PortalButton />
            <a
              href="/api/auth/logout"
              className="px-5 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200"
            >
              Logout
            </a>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl border border-gray-800 bg-black/30 lg:col-span-2">
            <div className="text-xs uppercase tracking-widest text-gray-400">Access</div>
            <div className="mt-2 text-3xl font-black">
              {plan === "team" ? "Team Pro" : plan === "daypass" ? "Day Pass" : "Pro"}
            </div>
            <p className="mt-3 text-gray-300">
              Jetzt wird’s ernst: Score → Runbook → Fix → Re-Check → Share.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/check"
                className="px-6 py-3 rounded-2xl font-black bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90"
              >
                Live Security Check
              </a>
              <a
                href="/copilot"
                className="px-6 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200"
              >
                Copilot Runbook
              </a>
              <a
                href="/vault"
                className="px-6 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200"
              >
                Vault / Templates
              </a>
            </div>
          </div>

          <div className="p-7 rounded-3xl border border-gray-800 bg-black/30">
            <div className="text-xs uppercase tracking-widest text-gray-400">Downloads</div>
            <div className="mt-2 font-black text-xl">Kits</div>
            <div className="mt-4 grid gap-3">
              <a
                className="px-5 py-3 rounded-2xl font-black bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90 text-center"
                href="/api/download?key=sprint-pack"
              >
                Sprint Pack (PDF)
              </a>
              <a
                className="px-5 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200 text-center"
                href="/api/download?key=incident-kit"
              >
                Incident Kit (ZIP)
              </a>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Hinweis: Ersetze die Placeholder-Dateien in <code className="text-gray-300">/private_downloads</code>.
            </div>
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-6">
          <div className="p-7 rounded-3xl border border-gray-800 bg-black/30">
            <div className="text-xs uppercase tracking-widest text-gray-400">Weekly Digest</div>
            <div className="mt-2 text-2xl font-black">Automatische Lageberichte</div>
            <p className="mt-3 text-gray-300 text-sm">
              Coming next: wöchentliche Risk-Delta Reports + „Top 5 Fixes“ für deine Instanzen.
            </p>
          </div>
          <div className="p-7 rounded-3xl border border-gray-800 bg-black/30">
            <div className="text-xs uppercase tracking-widest text-gray-400">Share Loop</div>
            <div className="mt-2 text-2xl font-black">Security Score Badge</div>
            <p className="mt-3 text-gray-300 text-sm">
              Score teilen → neue Nutzer → mehr Daten → bessere Autorität. Das ist der Growth-Motor.
            </p>
            <a href="/badge" className="mt-4 inline-flex text-cyan-300 underline hover:text-cyan-200">
              Badge Studio öffnen →
            </a>
          </div>
        </div>
      </div>
    </Container>
  )
}
