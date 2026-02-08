import Container from "@/components/shared/Container"
import { COMMUNITY } from "@/lib/constants"

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-800 py-10">
      <Container>
        <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-400">
          <div>
            <div className="font-black text-gray-200 mb-2">ClawGuru</div>
            <p>
              Unabhängiges Lage- & Ops-Zentrum für OpenClaw/Moltbot. Fokus: Security, Betrieb, Kostenkontrolle.
            </p>
            <div className="mt-4 text-xs text-gray-500">
              Hinweis: Tools liefern heuristische Orientierung, keine Garantie. Für harte Audits: professionelle Prüfung.
            </div>
          </div>
          <div>
            <div className="font-black text-gray-200 mb-2">Hubs</div>
            <ul className="space-y-1">
              <li><a href="/check">Security-Check</a></li>
              <li><a href="/copilot">Copilot</a></li>
              <li><a href="/intel">Intel Feed</a></li>
              <li><a href="/academy">Academy</a></li>
              <li><a href="/vault">Vault</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/downloads">Downloads</a></li>
              <li><a href="/case-studies">Case Studies</a></li>
              <li><a href="/ueber-uns">Über uns</a></li>
            </ul>
          </div>
          <div>
            <div className="font-black text-gray-200 mb-2">Rechtliches</div>
            <ul className="space-y-1">
              <li><a href="/impressum">Impressum</a></li>
              <li><a href="/datenschutz">Datenschutz</a></li>
              <li><a href="/agb">AGB</a></li>
            </ul>
            <div className="mt-4">
              <a className="inline-flex px-4 py-2 rounded-xl border border-gray-700 hover:border-gray-500 text-gray-200" href={COMMUNITY.discordInvite} target="_blank" rel="noreferrer">
                Discord Community →
              </a>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Affiliate-Hinweis: Einige Links können Provisionen enthalten. Transparenz bleibt Pflicht.
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
