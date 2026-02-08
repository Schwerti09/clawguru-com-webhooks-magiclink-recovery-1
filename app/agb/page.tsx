import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import { LEGAL_INFO } from "@/lib/constants"

export const metadata = {
  title: "AGB | ClawGuru",
  description:
    "Allgemeine Geschäftsbedingungen für ClawGuru (SaaS-Zugang, Day Pass, Downloads, Copilot)."
}

/**
 * Hinweis: Diese AGB sind ein sauberes, praxisnahes Template.
 * Bitte einmal kurz juristisch gegenchecken lassen, weil Details (Widerruf/Consent, B2C/B2B, Support-Level)
 * je nach konkreter Umsetzung variieren.
 */
export default function AGBPage() {
  return (
    <Container>
      <div className="py-16 max-w-4xl mx-auto">
        <SectionTitle
          kicker="Rechtliches"
          title="Allgemeine Geschäftsbedingungen (AGB)"
          subtitle="Lesbar, konkret, ohne Juristendeutsch-Orgie. Stand: Februar 2026."
        />

        <div className="mt-10 space-y-10 text-gray-200 leading-relaxed">
          <section className="p-6 rounded-3xl border border-gray-800 bg-black/25">
            <h2 className="text-2xl font-black">1. Anbieter & Kontakt</h2>
            <p className="mt-3 text-gray-300">
              Anbieter dieses Dienstes ist <strong>{LEGAL_INFO.company}</strong> (Inhaber:{" "}
              <strong>{LEGAL_INFO.owner}</strong>), {LEGAL_INFO.address}, {LEGAL_INFO.city}. Kontakt:{" "}
              <a className="text-cyan-300 hover:underline" href={`mailto:${LEGAL_INFO.email}`}>
                {LEGAL_INFO.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black">2. Geltungsbereich</h2>
            <p className="mt-3 text-gray-300">
              Diese AGB gelten für die Nutzung der Website und der angebotenen digitalen Leistungen von ClawGuru,
              insbesondere: Security-Check, Runbooks, Copilot-Funktionen, digitale Downloads (PDF/ZIP) sowie
              kostenpflichtige Zugänge (Abo „Pro“, Abo „Team Pro“, „Day Pass“).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black">3. Leistungsbeschreibung</h2>
            <ul className="mt-3 space-y-2 text-gray-300 list-disc pl-6">
              <li>
                <strong>Security-Check:</strong> heuristische Checks/Indikatoren (kein vollumfängliches Audit).
              </li>
              <li>
                <strong>Runbooks:</strong> Schritt-für-Schritt-Anleitungen zur Fehlerbehebung / Absicherung.
              </li>
              <li>
                <strong>Copilot:</strong> assistive Vorschläge (optional KI-basiert), die du eigenverantwortlich prüfst.
              </li>
              <li>
                <strong>Downloads:</strong> digitale Inhalte (PDF/ZIP) für Ops/Security-Workflows.
              </li>
              <li>
                <strong>Pro/Team/Day Pass:</strong> zeitlich begrenzter Zugriff auf Pro-Bereiche (Dashboard, Kits etc.).
              </li>
            </ul>
            <p className="mt-3 text-gray-400 text-sm">
              Wichtig: ClawGuru ist ein Informations- und Tool-Angebot. Es ersetzt keine professionelle Sicherheitsprüfung,
              kein Penetration-Testing und keine Rechtsberatung.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black">4. Vertragsschluss</h2>
            <p className="mt-3 text-gray-300">
              Kostenpflichtige Leistungen werden über Stripe Checkout erworben. Der Vertrag kommt zustande, sobald
              die Zahlung erfolgreich abgeschlossen ist und dir der Zugriff bzw. Download bereitgestellt wird.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black">5. Preise & Zahlung</h2>
            <p className="mt-3 text-gray-300">
              Alle Preise werden auf der Pricing-Seite angezeigt. Die Abwicklung erfolgt über Stripe. Du erhältst
              den Zugriff nach erfolgreicher Zahlung über den Success-Link (Aktivierung).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black">6. Laufzeit, Verlängerung, Kündigung</h2>
            <ul className="mt-3 space-y-2 text-gray-300 list-disc pl-6">
              <li>
                <strong>Pro/Team Pro:</strong> monatliches Abo, automatische Verlängerung, solange nicht gekündigt.
              </li>
              <li>
                <strong>Day Pass:</strong> einmaliger Kauf, Zugriff für 24 Stunden ab Aktivierung.
              </li>
              <li>
                <strong>Kündigung:</strong> über das Billing-Portal (im Dashboard) oder per E-Mail an{" "}
                <a className="text-cyan-300 hover:underline" href={`mailto:${LEGAL_INFO.email}`}>
                  {LEGAL_INFO.email}
                </a>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black">7. Nutzungsrechte & zulässige Nutzung</h2>
            <ul className="mt-3 space-y-2 text-gray-300 list-disc pl-6">
              <li>Die Inhalte/Runbooks/Downloads sind für deine eigene Nutzung bzw. dein Team gedacht.</li>
              <li>
                Weiterverkauf, öffentliche Veröffentlichung oder massenhaftes Scraping/Spiegeln der Inhalte ist untersagt,
                sofern nicht ausdrücklich schriftlich erlaubt.
              </li>
              <li>
                Missbrauch (z. B. Angriffe, Exploits, unbefugtes Scanning Dritter) ist untersagt. Nutze die Tools nur für
                Systeme, die du kontrollierst oder für die du eine ausdrückliche Erlaubnis hast.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black">8. Verfügbarkeit & Änderungen</h2>
            <p className="mt-3 text-gray-300">
              Wir bemühen uns um hohe Verfügbarkeit. Wartungen, Updates oder Sicherheitsmaßnahmen können zeitweise zu
              Einschränkungen führen. Inhalte und Features dürfen weiterentwickelt werden (z. B. Runbook-Updates,
              neue Checks, neue Kits).
            </p>
          </section>

          <section className="p-6 rounded-3xl border border-gray-800 bg-black/25">
            <h2 className="text-2xl font-black">9. Haftung</h2>
            <p className="mt-3 text-gray-300">
              ClawGuru liefert Hinweise und Empfehlungen nach bestem Wissen, jedoch ohne Gewähr. Du setzt Maßnahmen
              eigenverantwortlich um. Für Schäden haften wir nur bei Vorsatz und grober Fahrlässigkeit; bei leichter
              Fahrlässigkeit nur bei Verletzung wesentlicher Vertragspflichten und begrenzt auf den vorhersehbaren
              Schaden. Zwingende gesetzliche Haftung (z. B. Produkthaftung) bleibt unberührt.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black">10. Widerruf (Verbraucher)</h2>
            <p className="mt-3 text-gray-300">
              Wenn du Verbraucher bist, kann dir grundsätzlich ein gesetzliches Widerrufsrecht zustehen. Bei digitalen
              Inhalten bzw. digitalen Dienstleistungen kann das Widerrufsrecht unter bestimmten Voraussetzungen erlöschen,
              wenn die Ausführung vor Ablauf der Widerrufsfrist beginnt und du ausdrücklich zustimmst. Details hängen von
              der konkreten Checkout-/Consent-Implementierung ab.
            </p>
            <p className="mt-3 text-gray-400 text-sm">
              Praktischer Hinweis: Wenn du maximale Rechtssicherheit willst, aktiviere in Stripe Checkout die verpflichtende
              Zustimmung zu den AGB/Datenschutz und (falls nötig) eine ausdrückliche Zustimmung zum vorzeitigen Beginn.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black">11. Schlussbestimmungen</h2>
            <p className="mt-3 text-gray-300">
              Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist – soweit zulässig – der Sitz
              des Anbieters. Sollten einzelne Bestimmungen unwirksam sein, bleibt der Vertrag im Übrigen wirksam.
            </p>
          </section>
        </div>
      </div>
    </Container>
  )
}
