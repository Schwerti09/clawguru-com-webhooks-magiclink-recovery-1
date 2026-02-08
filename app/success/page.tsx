import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import { stripe } from "@/lib/stripe"

export const runtime = "nodejs"

export default async function SuccessPage({
  searchParams
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  const session_id = typeof searchParams?.session_id === "string" ? searchParams?.session_id : ""
  if (!session_id) {
    return (
      <Container>
        <div className="py-16 max-w-3xl mx-auto">
          <SectionTitle
            kicker="Checkout"
            title="Zahlung bestätigen"
            subtitle="Es fehlt eine session_id. Nutze den Link aus Stripe."
          />
          <div className="mt-8 p-6 rounded-3xl border border-gray-800 bg-black/30 text-gray-300">
            Kein <code className="text-gray-200">session_id</code> gefunden.
          </div>
        </div>
      </Container>
    )
  }

  let ok = false
  let email: string | null = null
  let product: string | null = null
  let mode: string | null = null

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)
    ok = session.payment_status === "paid" || session.status === "complete"
    email = session.customer_details?.email || null
    product = (session.metadata?.product as string) || null
    mode = session.mode || null
  } catch {
    ok = false
  }

  const activateHref = `/api/auth/activate?session_id=${encodeURIComponent(session_id)}`

  return (
    <Container>
      <div className="py-16 max-w-3xl mx-auto">
        <SectionTitle
          kicker="Checkout"
          title={ok ? "Zugang freigeschaltet" : "Noch nicht bestätigt"}
          subtitle="Aktiviere deinen Zugriff und geh in Mission Mode."
        />

        {ok ? (
          <>
            <div className="mt-8 p-6 rounded-3xl border border-gray-800 bg-black/30">
              <div className="text-sm text-gray-400">Receipt</div>
              <div className="mt-1 text-lg font-black text-white">{email || "—"}</div>
              <div className="mt-2 text-sm text-gray-400">
                Plan: <span className="text-gray-200 font-bold">{product || "—"}</span> · Mode:{" "}
                <span className="text-gray-200 font-bold">{mode || "—"}</span>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <a
                className="px-6 py-4 rounded-2xl font-black bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90 text-center"
                href={activateHref}
              >
                Zugriff aktivieren → Dashboard öffnen
              </a>

              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <a
                  className="px-6 py-4 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200 text-center"
                  href={`/api/download?key=sprint-pack&session_id=${encodeURIComponent(session_id)}`}
                >
                  Direkt-Download Sprint Pack (Fallback)
                </a>
                <a
                  className="px-6 py-4 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200 text-center"
                  href={`/api/download?key=incident-kit&session_id=${encodeURIComponent(session_id)}`}
                >
                  Direkt-Download Incident Kit (Fallback)
                </a>
              </div>

              <a
                className="px-6 py-4 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200 text-center"
                href="/check"
              >
                Direkt Score prüfen →
              </a>

              <a
                className="px-6 py-4 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200 text-center"
                href="/copilot"
              >
                Copilot starten → Runbook bauen
              </a>
            </div>

            <div className="mt-8 p-6 rounded-3xl border border-gray-800 bg-black/25 text-gray-300">
              <div className="font-black">Mini-Loop (macht süchtig)</div>
              <ol className="mt-3 list-decimal pl-6 space-y-2 text-sm">
                <li>Score checken</li>
                <li>Copilot: Runbook erzeugen</li>
                <li>Fix anwenden</li>
                <li>Re-Check + Badge teilen</li>
              </ol>
            </div>
          </>
        ) : (
          <div className="mt-8 p-6 rounded-3xl border border-gray-800 bg-black/30 text-gray-300">
            Zahlung nicht bestätigt oder Session ungültig. Wenn du gerade bezahlt hast, warte kurz und lade neu.
          </div>
        )}
      </div>
    </Container>
  )
}
