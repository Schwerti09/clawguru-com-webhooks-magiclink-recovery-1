import Container from "@/components/shared/Container"
import CTAButton from "@/components/marketing/CTAButton"
import { PRODUCTS } from "@/lib/constants"

export const metadata = {
  title: "Launch Pack | ClawGuru",
  description: "Der schnelle Setup-Guide für Affiliate, Tracking, Payment & Delivery – damit ClawGuru ein User-Magnet wird."
}

export default function LaunchPackPage() {
  const p = PRODUCTS.launchPack

  return (
    <Container>
      <div className="py-16 max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="text-sm text-brand-cyan font-bold mb-2">FREE RESOURCE</div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">
            {p.title}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl">
            Einkaufsliste + Templates, um deine Seite scharf zu stellen: Affiliate, Checkout, Delivery, Tracking und Trust.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <CTAButton href={p.downloadUrl} label="PDF jetzt laden" variant="primary" size="lg" />
            <CTAButton href="/downloads" label="Alle Downloads" variant="outline" size="lg" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-gray-800 bg-gray-950/60 p-6">
            <h2 className="text-2xl font-black mb-3">Was drin ist</h2>
            <ul className="space-y-2 text-gray-300">
              {p.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-brand-cyan">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-950/60 to-blue-950/25 p-6">
            <h2 className="text-2xl font-black mb-3">Next Step: Outcome verkaufen</h2>
            <p className="text-gray-400 mb-5">
              PDFs verkaufen funktioniert, wenn sie <strong>Runbooks + Templates</strong> liefern (Outcome, nicht Theorie).
              Im Downloads-Bereich findest du die Pro-Kits (Sprint/Incident).
            </p>
            <CTAButton href="/downloads" label="Zu den Pro-Kits" variant="primary" size="lg" />
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-gray-800 bg-gray-950/40 p-6">
          <div className="text-sm text-gray-500 mb-2">Pro-Tipp</div>
          <div className="text-gray-300">
            Setze das PDF als Lead Magnet ein: Nach dem Security-Score führst du den User in den Sprint/Incident-Kauf.
            Das ist ein sauberer, verständlicher Funnel – ohne Trickkiste.
          </div>
        </div>
      </div>
    </Container>
  )
}
