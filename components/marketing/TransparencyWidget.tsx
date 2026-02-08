import Container from "@/components/shared/Container"

export default function TransparencyWidget() {
  return (
    <section className="py-14 border-t border-gray-800 bg-gray-950">
      <Container>
        <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/70 to-gray-950 p-8">
          <h2 className="text-2xl font-black mb-2">Transparenz</h2>
          <p className="text-gray-300 max-w-3xl">
            ClawGuru ist kostenlos. Einige Empfehlungen sind Affiliate-Links. Wir kuratieren nach Nutzwert im echten Betrieb.
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div className="p-4 rounded-xl border border-gray-800 bg-black/30">
              <div className="font-black text-gray-100">1) Affiliate-Erlöse</div>
              <div className="text-gray-400">Hosting & Security-Tools</div>
            </div>
            <div className="p-4 rounded-xl border border-gray-800 bg-black/30">
              <div className="font-black text-gray-100">2) Managed Ops</div>
              <div className="text-gray-400">Hardening, Monitoring, Wartung</div>
            </div>
            <div className="p-4 rounded-xl border border-gray-800 bg-black/30">
              <div className="font-black text-gray-100">3) Research/Reports</div>
              <div className="text-gray-400">Verdichtete Lageberichte</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
