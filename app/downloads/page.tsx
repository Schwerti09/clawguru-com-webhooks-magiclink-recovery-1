import Container from "@/components/shared/Container"
import CTAButton from "@/components/marketing/CTAButton"
import BuyButton from "@/components/commerce/BuyButton"
import { PRODUCTS } from "@/lib/constants"

export const metadata = {
  title: "Downloads | ClawGuru",
  description:
    "Kostenlose Runbooks & Templates + Pro Access (Abo) für Dashboard, Kits und Copilot Runbooks."
}

export default function DownloadsPage() {
  return (
    <Container>
      <div className="py-16 max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black mb-3">Downloads</h1>
          <p className="text-gray-400 text-lg">
            Lead Magnet (free) + Pro Access (paid). Das Ziel ist nicht „PDF verkaufen“, sondern: Nutzer in den Loop ziehen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Free Launch Pack */}
          <div className="rounded-3xl border border-gray-800 bg-gray-950/60 p-6">
            <div className="text-sm text-brand-cyan font-bold mb-2">FREE</div>
            <h2 className="text-2xl font-black mb-2">{PRODUCTS.launchPack.title}</h2>
            <p className="text-gray-400 mb-5">{PRODUCTS.launchPack.description}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <CTAButton href={PRODUCTS.launchPack.downloadUrl} label="PDF herunterladen" variant="primary" size="lg" />
              <CTAButton href="/check" label="Security-Score prüfen" variant="outline" size="lg" />
            </div>

            <div className="mt-4 text-sm text-gray-500">
              Pro Move: Nach dem Download sofort „Check starten“ → Copilot → Pro Upsell.
            </div>
          </div>

          {/* Pro Access */}
          <div className="rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-950/70 to-blue-950/30 p-6">
            <div className="text-sm text-orange-300 font-bold mb-2">PRO ACCESS</div>
            <h2 className="text-2xl font-black mb-2">Dashboard + Kits + Copilot Runbooks</h2>
            <p className="text-gray-400 mb-5">
              Abo für Operatoren. Day Pass für Notfälle. Gleicher Outcome: Fixen, verifizieren, teilen.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
              <BuyButton product="pro" label="Pro Abo starten" className="px-6 py-3 rounded-2xl font-black bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90" />
              <BuyButton product="team" label="Team Pro" />
              <BuyButton product="daypass" label="Day Pass (24h)" className="px-6 py-3 rounded-2xl font-black bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90" />
            </div>

            <div className="mt-6 border-t border-gray-800 pt-5">
              <h3 className="font-bold mb-2">Was du bekommst</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Sprint Pack (PDF) + Incident Kit (ZIP)</li>
                <li>• Copilot Runbooks + Schritt-für-Schritt Fixes</li>
                <li>• Badge Studio + Share Loop</li>
                <li>• (Next) Weekly Digest + Alerts</li>
              </ul>
            </div>

            <div className="mt-6">
              <a href="/pricing" className="text-cyan-300 underline hover:text-cyan-200">
                Details & Pläne →
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-4">
          {PRODUCTS.quickLinks.map((q) => (
            <a
              key={q.href}
              href={q.href}
              className="p-5 rounded-3xl border border-gray-800 bg-black/25 hover:bg-black/35 transition-colors"
            >
              <div className="font-black">{q.title}</div>
              <div className="text-sm text-gray-400 mt-1">{q.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </Container>
  )
}
