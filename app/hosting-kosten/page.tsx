import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import AffiliateComparison from "@/components/marketing/AffiliateComparison"

export default function Costs() {
  return (
    <Container>
      <div className="py-16">
        <SectionTitle
          kicker="Costs"
          title="Hosting & Kosten"
          subtitle="Infra ist billig. Incidents sind teuer. Zeit ist die teuerste Währung."
        />

        <div className="grid lg:grid-cols-3 gap-4 mb-12">
          {[
            ["Infra", "VPS/Cloud, Storage, Netzwerk, Backups"],
            ["Betrieb", "Monitoring, Updates, On-Call, Incidents"],
            ["Risiko", "Leaks, Datenabfluss, Reputationsschaden"]
          ].map(([t, d]) => (
            <div key={t} className="p-6 rounded-2xl border border-gray-800 bg-black/30">
              <div className="font-black text-xl mb-2">{t}</div>
              <div className="text-gray-300">{d}</div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-black mb-4">Provider Vergleich</h2>
        <AffiliateComparison />

        <div className="mt-12 p-7 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/60 to-black">
          <div className="font-black text-2xl">Wenn du nicht basteln willst</div>
          <p className="mt-2 text-gray-300">
            Managed Ops ist oft günstiger als der erste Incident. (Ja, zynisch. Ja, wahr.)
          </p>
          <div className="mt-5">
            <a className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red hover:opacity-90 font-black" href="https://clawsyndicate.com?ref=clawguru_costs">
              Managed Ops ansehen
            </a>
          </div>
        </div>
      </div>
    </Container>
  )
}
