import Container from "@/components/shared/Container"

export default function KeyRotationVault() {
  return (
    <Container>
      <div className="py-16 max-w-4xl mx-auto">
        <div className="text-xs uppercase tracking-widest text-brand-cyan/80">Vault</div>
        <h1 className="mt-2 text-4xl font-black">Key Rotation (Runbook)</h1>
        <p className="mt-4 text-gray-300 text-lg leading-relaxed">
          Rotation ist nicht „neuen Key erzeugen“. Rotation ist: <strong>neuen Key aktivieren + alten Key töten</strong> —
          und zwar so, dass du nicht nebenbei deine Produktion abfackelst.
        </p>

        <div className="mt-8 p-6 rounded-3xl border border-gray-800 bg-black/30">
          <h2 className="text-2xl font-black">Minimal-Runbook</h2>
          <ol className="mt-4 space-y-3 text-gray-300 list-decimal pl-6">
            <li>Neuen Key erzeugen (Provider-Konsole) — <strong>noch nicht</strong> old key löschen.</li>
            <li>Deploy vorbereiten: ENV update, config check, smoke test.</li>
            <li>Deploy ausrollen (rolling) — prüfen, dass neue Keys genutzt werden.</li>
            <li>Alte Keys invalidieren/löschen.</li>
            <li>Monitoring: Auth-Fails, ungewöhnliche Requests, Kosten-Spikes.</li>
          </ol>
        </div>

        <div className="mt-8 p-6 rounded-3xl border border-gray-800 bg-black/30">
          <h2 className="text-2xl font-black">Fehler, die dich teuer machen</h2>
          <ul className="mt-4 space-y-3 text-gray-300">
            <li><span className="text-cyan-300 font-bold">•</span> Rotation ohne Log-Sicherung (du verlierst forensische Spuren)</li>
            <li><span className="text-cyan-300 font-bold">•</span> Kein Rollback-Plan</li>
            <li><span className="text-cyan-300 font-bold">•</span> Keys in Logs/Client-Bundles</li>
          </ul>
        </div>

        <div className="mt-10">
          <a href="/copilot?q=Ich%20will%20ein%20Key-Rotation%20Runbook%20f%C3%BCr%20mein%20Setup.%20Hier%20ist%20mein%20Stack%3A%20" className="text-cyan-300 underline hover:text-cyan-200">
            Copilot: Rotation runbook →
          </a>
        </div>
      </div>
    </Container>
  )
}
