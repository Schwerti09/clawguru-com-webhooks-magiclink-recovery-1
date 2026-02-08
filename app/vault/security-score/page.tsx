import Container from "@/components/shared/Container"

export default function SecurityScoreVault() {
  return (
    <Container>
      <div className="py-16 max-w-4xl mx-auto">
        <div className="text-xs uppercase tracking-widest text-brand-cyan/80">Vault</div>
        <h1 className="mt-2 text-4xl font-black">Claw Security Score</h1>
        <p className="mt-4 text-gray-300 text-lg leading-relaxed">
          Der Score ist eine <strong>heuristische Risiko-Einschätzung</strong>. Er sagt: „Wie wahrscheinlich ist es,
          dass du gerade in typische Fallen läufst?“ — nicht: „Du bist sicher.“
        </p>

        <div className="mt-8 p-6 rounded-3xl border border-gray-800 bg-black/30">
          <h2 className="text-2xl font-black">Wofür er gut ist</h2>
          <ul className="mt-4 space-y-3 text-gray-300">
            <li><span className="text-cyan-300 font-bold">•</span> Als Startpunkt: Welche 3 Dinge zuerst?</li>
            <li><span className="text-cyan-300 font-bold">•</span> Als Kommunikations-Asset: Score + Runbook teilen</li>
            <li><span className="text-cyan-300 font-bold">•</span> Als Ritual: Check → Sprint → Re-Check</li>
          </ul>
        </div>

        <div className="mt-8 p-6 rounded-3xl border border-gray-800 bg-black/30">
          <h2 className="text-2xl font-black">Wie du 95+ erreichst</h2>
          <ol className="mt-4 space-y-3 text-gray-300 list-decimal pl-6">
            <li><strong>Private Networking</strong> als Default (keine Bind-All Ports)</li>
            <li><strong>Secrets Rotation</strong> + kurze Token TTL</li>
            <li><strong>Origin Allowlist</strong> (WebSocket/Callback)</li>
            <li><strong>Monitoring</strong>: Auth-Fails, Anomalien, Requests/min</li>
            <li><strong>Backups + Restore-Test</strong> (sonst ist es kein Backup)</li>
          </ol>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="/check" className="px-6 py-3 rounded-2xl font-black bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90">
            Score checken →
          </a>
          <a href="/academy" className="px-6 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200">
            30-Min Sprint →
          </a>
          <a href="/copilot" className="px-6 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200">
            Copilot →
          </a>
        </div>
      </div>
    </Container>
  )
}
