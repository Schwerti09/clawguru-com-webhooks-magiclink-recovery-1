import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"

export const metadata = {
  title: "Zugang wiederherstellen | ClawGuru",
  description: "Magic Link öffnen oder Recovery anfordern."
}

export default function RecoverPage({
  searchParams
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  const token = typeof searchParams?.token === "string" ? searchParams?.token : ""
  return (
    <Container>
      <div className="py-16 max-w-3xl mx-auto">
        <SectionTitle
          kicker="Recovery"
          title="Zugang wiederherstellen"
          subtitle="Magic Link öffnen – oder dir einen neuen Link schicken lassen."
        />

        {token ? (
          <div className="mt-8 p-6 rounded-3xl border border-gray-800 bg-black/30 text-gray-200">
            <div className="text-sm text-gray-400">Magic Link erkannt</div>
            <div className="mt-3">
              <a
                className="px-6 py-4 rounded-2xl font-black bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90 text-center inline-flex"
                href={`/api/auth/recover?token=${encodeURIComponent(token)}`}
              >
                Zugriff aktivieren → Dashboard
              </a>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Falls das nicht klappt: unten Recovery-Link neu anfordern.
            </div>
          </div>
        ) : (
          <div className="mt-8 p-6 rounded-3xl border border-gray-800 bg-black/30 text-gray-300">
            Kein Token gefunden. Du kannst dir unten einen neuen Link schicken lassen.
          </div>
        )}

        <div className="mt-8 p-6 rounded-3xl border border-gray-800 bg-black/25">
          <div className="font-black text-white">Neuen Magic Link anfordern</div>
          <p className="mt-2 text-sm text-gray-400">
            Gib die E‑Mail ein, die du bei Stripe verwendet hast. Wenn ein aktiver Zugang existiert,
            senden wir dir einen Link.
          </p>

          <form className="mt-4 flex flex-col sm:flex-row gap-3" action="/api/recovery/request" method="post">
            <input
              type="email"
              name="email"
              required
              placeholder="deinname@domain.tld"
              className="flex-1 px-4 py-3 rounded-2xl bg-gray-900 border border-gray-700 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/30"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl font-black bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90"
            >
              Link senden
            </button>
          </form>

          <div className="mt-3 text-xs text-gray-500">
            Tipp: Check auch Spam/Promotions. Versand dauert i.d.R. &lt; 1 Minute.
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <a href="/pricing" className="px-5 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200">
            Zurück zu Pricing
          </a>
          <a href="/check" className="px-5 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200">
            Erst Score prüfen
          </a>
        </div>
      </div>
    </Container>
  )
}
