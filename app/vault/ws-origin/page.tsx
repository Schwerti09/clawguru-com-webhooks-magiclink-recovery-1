import Container from "@/components/shared/Container"

export default function WSOrigin() {
  return (
    <Container>
      <div className="py-16 max-w-4xl mx-auto">
        <div className="text-xs uppercase tracking-widest text-brand-cyan/80">Vault</div>
        <h1 className="mt-2 text-4xl font-black">WebSocket Origin Validation</h1>
        <p className="mt-4 text-gray-300 text-lg">
          WebSockets sind oft die unbewachte Hintertür: „läuft“ bedeutet nicht „gebunden“. Wenn Origin/Token-Binding fehlt,
          kann eine fremde Seite Requests im Kontext deines Users/Servers triggern.
        </p>

        <div className="mt-10 space-y-6">
          <div className="p-6 rounded-2xl border border-gray-800 bg-black/30">
            <div className="font-black text-xl mb-2">Minimum Baseline</div>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Erlaube nur bekannte Origins (keine Wildcards)</li>
              <li>Authentifiziere beim Upgrade (nicht erst danach)</li>
              <li>Token kurzlebig & scope-limited</li>
              <li>Rate Limit + Auth-Fail Alerts</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-gray-800 bg-black/30">
            <div className="font-black text-xl mb-2">Praktischer Check</div>
            <p className="text-gray-300">
              Wenn du irgendwo <code className="text-gray-200">Access-Control-Allow-Origin: *</code> oder
              „accept all origins“ siehst: stopp. Das ist (je nach Kontext) ein Einfallstor.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a className="px-5 py-3 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 hover:bg-brand-cyan/25 font-bold" href="/copilot">
              Frag Copilot (mit deinem Stack)
            </a>
            <a className="px-5 py-3 rounded-xl bg-black/30 border border-gray-700 hover:bg-black/40 font-bold" href="/tools">
              Validator
            </a>
          </div>
        </div>
      </div>
    </Container>
  )
}
