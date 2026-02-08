export default function CopilotPreview() {
  return (
    <div className="p-8 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/60 to-black shadow-glow2">
      <div className="text-sm text-gray-300">
        <div className="font-black text-lg">Beispiel: „Ich glaube mein Gateway ist exposed“</div>
        <div className="mt-3 space-y-2 text-gray-300">
          <div className="p-4 rounded-2xl border border-gray-800 bg-black/30">
            <div className="text-xs text-gray-500 mb-1">Copilot Output</div>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Priorität: Keys rotieren</li>
              <li>Exposition schließen (private subnet/VPN)</li>
              <li>Logs sichern</li>
              <li>WS Origin/Token Binding prüfen</li>
            </ul>
          </div>
          <div className="p-4 rounded-2xl border border-gray-800 bg-black/30">
            <div className="text-xs text-gray-500 mb-1">Links</div>
            <div className="flex flex-wrap gap-2">
              <a className="px-3 py-2 rounded-xl border border-gray-800 bg-black/20 hover:bg-black/30 text-sm" href="/security/notfall-leitfaden">Runbook</a>
              <a className="px-3 py-2 rounded-xl border border-gray-800 bg-black/20 hover:bg-black/30 text-sm" href="/tools">Validator</a>
              <a className="px-3 py-2 rounded-xl border border-gray-800 bg-black/20 hover:bg-black/30 text-sm" href="/academy">Sprint</a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a className="px-6 py-3 rounded-xl font-black bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90 shadow-glow2" href="/copilot">
          Copilot öffnen
        </a>
        <a className="px-6 py-3 rounded-xl border border-gray-700 bg-gray-900/40 hover:bg-gray-900 rounded-xl font-bold" href="/tools">
          Tools
        </a>
      </div>
    </div>
  )
}
