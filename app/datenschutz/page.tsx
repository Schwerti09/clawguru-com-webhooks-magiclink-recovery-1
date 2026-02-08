import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import { LEGAL_INFO } from "@/lib/constants"

export const metadata = {
  title: "Datenschutz | ClawGuru",
  description:
    "Datenschutzerklärung (DSGVO) für ClawGuru: Hosting, Stripe-Zahlungen, Access-Cookies, Copilot (optional KI)."
}

/**
 * Hinweis: Datenschutzerklärung muss zur tatsächlichen Datenverarbeitung passen.
 * Diese Version ist bewusst „minimal & wahr“ gehalten (ohne Analytics/Tracking-Behauptungen).
 * Wenn du später Analytics, Newsletter, Discord-Bots etc. ergänzt: hier nachziehen.
 */
export default function DatenschutzPage() {
  return (
    <Container>
      <div className="py-16 max-w-4xl mx-auto">
        <SectionTitle
          kicker="DSGVO"
          title="Datenschutzerklärung"
          subtitle="Kurz, sauber, und auf das ausgerichtet, was die Seite wirklich tut."
        />

        <div className="mt-10 space-y-10 text-gray-200 leading-relaxed">
          <section className="p-6 rounded-3xl border border-gray-800 bg-black/25">
            <h2 className="text-2xl font-black">1. Verantwortlicher</h2>
            <p className="mt-3 text-gray-300">
              Verantwortlich für die Datenverarbeitung ist <strong>{LEGAL_INFO.company}</strong> (Inhaber:{" "}
              <strong>{LEGAL_INFO.owner}</strong>), {LEGAL_INFO.address}, {LEGAL_INFO.city}. Kontakt:{" "}
              <a className="text-cyan-300 hover:underline" href={`mailto:${LEGAL_INFO.email}`}>
                {LEGAL_INFO.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black">2. Welche Daten verarbeiten wir?</h2>
            <ul className="mt-3 space-y-2 text-gray-300 list-disc pl-6">
              <li>
                <strong>Server-/Zugriffslogs (Hosting):</strong> technisch notwendige Daten wie IP-Adresse, Zeitpunkt, URL,
                User-Agent, Referrer (je nach Hosting/CDN).
              </li>
              <li>
                <strong>Security-Check Eingaben:</strong> Zielangaben (z. B. Domain/IP/URL), die du im Check eingibst.
                Diese werden zur Ergebnisberechnung verarbeitet. Wir speichern Check-Eingaben nicht als Nutzerprofil.
              </li>
              <li>
                <strong>Access-Cookie:</strong> Nach Kauf setzen wir ein technisch notwendiges Cookie (<code>claw_access</code>),
                das einen signierten Zugriffstoken enthält (Plan, Ablaufzeit, Stripe Customer-ID).
              </li>
              <li>
                <strong>Zahlungsdaten:</strong> Die Zahlung wird über Stripe abgewickelt. Zahlungsdaten (z. B. Karte/IBAN)
                werden von Stripe verarbeitet – wir erhalten typischerweise nur Status/IDs (z. B. Customer/Subscription).
              </li>
              <li>
                <strong>Kontakt:</strong> Wenn du uns per E-Mail kontaktierst, verarbeiten wir die von dir gesendeten Angaben.
              </li>
              <li>
                <strong>Copilot (optional):</strong> Wenn KI-Funktionen aktiv sind, können Texteingaben zur Generierung von
                Antworten an den KI-Dienst übertragen werden.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black">3. Zwecke & Rechtsgrundlagen</h2>
            <ul className="mt-3 space-y-2 text-gray-300 list-disc pl-6">
              <li>
                <strong>Bereitstellung der Website & Sicherheit</strong> (Logs, Abwehr von Angriffen) – berechtigtes Interesse.
              </li>
              <li>
                <strong>Vertragserfüllung</strong> (Zugang, Day Pass, Abos, Downloads, Billing-Portal) – Vertrag/vorvertragliche Maßnahmen.
              </li>
              <li>
                <strong>Support/Kommunikation</strong> (E-Mail) – Vertrag oder berechtigtes Interesse.
              </li>
              <li>
                <strong>KI-Copilot</strong> – je nach Implementierung Vertrag oder Einwilligung.
              </li>
            </ul>
            <p className="mt-3 text-gray-400 text-sm">
              Hinweis: Die konkrete Rechtsgrundlage hängt von deiner Nutzung (B2C/B2B), den aktivierten Features und dem Hosting-Setup ab.
            </p>
          </section>

          <section className="p-6 rounded-3xl border border-gray-800 bg-black/25">
            <h2 className="text-2xl font-black">4. Empfänger / Drittanbieter</h2>
            <ul className="mt-3 space-y-2 text-gray-300 list-disc pl-6">
              <li>
                <strong>Hosting/CDN:</strong> Je nach Deployment z. B. Netlify oder Vercel (Auslieferung der Website, Serverless-Funktionen).
              </li>
              <li>
                <strong>Stripe:</strong> Zahlungsabwicklung, Rechnungen, Abo-Management, Billing-Portal.
              </li>
              <li>
                <strong>KI-Provider (optional):</strong> z. B. OpenAI (nur wenn KI-Funktionen aktiv sind).
              </li>
            </ul>
            <p className="mt-3 text-gray-400 text-sm">
              Wenn Anbieter außerhalb der EU/des EWR sitzen, können Übermittlungen in Drittländer stattfinden. In solchen Fällen werden
              geeignete Schutzmaßnahmen (z. B. Standardvertragsklauseln) genutzt – soweit vom Anbieter bereitgestellt.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black">5. Cookies</h2>
            <p className="mt-3 text-gray-300">
              Wir setzen primär technisch notwendige Cookies. Das wichtigste ist <code>claw_access</code>, damit du nach dem Kauf
              Zugriff auf Pro/Team/Day Pass erhältst. Dieses Cookie ist <strong>httpOnly</strong> (nicht via JS auslesbar) und wird
              automatisch nach Ablauf ungültig.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black">6. Speicherdauer</h2>
            <p className="mt-3 text-gray-300">
              Logs werden je nach Hosting-Anbieter für einen begrenzten Zeitraum gespeichert. Access-Tokens laufen automatisch ab.
              Vertrags-/Zahlungsdaten werden im Rahmen der gesetzlichen Aufbewahrungspflichten verarbeitet (typischerweise bei Stripe).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black">7. Deine Rechte</h2>
            <ul className="mt-3 space-y-2 text-gray-300 list-disc pl-6">
              <li>Auskunft, Berichtigung, Löschung</li>
              <li>Einschränkung der Verarbeitung</li>
              <li>Datenübertragbarkeit</li>
              <li>Widerspruch gegen Verarbeitung aus berechtigtem Interesse</li>
              <li>Beschwerde bei einer Aufsichtsbehörde</li>
            </ul>
            <p className="mt-3 text-gray-300">
              Schreibe uns dazu an{" "}
              <a className="text-cyan-300 hover:underline" href={`mailto:${LEGAL_INFO.email}`}>
                {LEGAL_INFO.email}
              </a>
              .
            </p>
          </section>

          <section className="p-6 rounded-3xl border border-gray-800 bg-black/25">
            <h2 className="text-2xl font-black">8. Sicherheitsmaßnahmen</h2>
            <p className="mt-3 text-gray-300">
              Wir setzen angemessene technische und organisatorische Maßnahmen ein (z. B. TLS/HTTPS, Zugriffskontrollen, signierte Tokens).
              Dennoch gilt: 100% Sicherheit existiert nicht – deshalb gibt es ClawGuru.
            </p>
          </section>
        </div>
      </div>
    </Container>
  )
}
