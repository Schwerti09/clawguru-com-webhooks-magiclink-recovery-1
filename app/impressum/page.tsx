import Container from "@/components/shared/Container"
import { LEGAL_INFO } from "@/lib/constants"

export default function Impressum() {
  return (
    <Container>
      <div className="py-16 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-8">Impressum</h1>

        <div className="space-y-8">
          <section className="p-6 rounded-2xl border border-gray-800 bg-black/30">
            <h2 className="text-2xl font-black mb-3">Angaben gemäß § 5 TMG</h2>
            <p><strong>Unternehmen:</strong> {LEGAL_INFO.company}</p>
            <p><strong>Inhaber:</strong> {LEGAL_INFO.owner}</p>
            <p><strong>Anschrift:</strong> {LEGAL_INFO.address}, {LEGAL_INFO.city}</p>
            <p><strong>E-Mail:</strong> <a className="text-brand-cyan" href={`mailto:${LEGAL_INFO.email}`}>{LEGAL_INFO.email}</a></p>
            <p><strong>Steuerliche Angaben:</strong> {LEGAL_INFO.taxNote}</p>
          </section>

          <section className="p-6 rounded-2xl border border-gray-800 bg-black/30">
            <h2 className="text-2xl font-black mb-3">Affiliate-Offenlegung</h2>
            <p className="text-gray-300">
              Diese Website enthält Affiliate-Links. Wenn du darüber kaufst, erhalten wir ggf. eine Provision – ohne Mehrkosten für dich.
            </p>
          </section>

          <section className="p-6 rounded-2xl border border-gray-800 bg-black/30">
            <h2 className="text-2xl font-black mb-3">Haftung</h2>
            <p className="text-gray-300">
              Inhalte werden nach bestem Wissen erstellt. Keine Gewähr für Vollständigkeit/Aktualität. Sicherheitsinfos ersetzen keinen professionellen Audit.
            </p>
          </section>
        </div>
      </div>
    </Container>
  )
}
