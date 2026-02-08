import Container from "@/components/shared/Container"

export default function Secrets() {
  return (
    <Container>
      <div className="py-16 max-w-4xl mx-auto">
        <div className="text-xs uppercase tracking-widest text-brand-cyan/80">Vault</div>
        <h1 className="mt-2 text-4xl font-black">Secrets Hygiene</h1>
        <p className="mt-4 text-gray-300 text-lg">
          Secrets sind nicht „Konfiguration“. Sie sind Zugänge. Und Zugänge müssen rotieren können.
        </p>

        <div className="mt-10 space-y-6">
          <div className="p-6 rounded-2xl border border-gray-800 bg-black/30">
            <div className="font-black text-xl mb-2">Die 5 Regeln</div>
            <ol className="list-decimal pl-5 space-y-2 text-gray-300">
              <li>Keine Secrets im Repo. Punkt.</li>
              <li>Rotation ist ein Prozess, kein Event.</li>
              <li>Scope minimieren (least privilege).</li>
              <li>Audit Logs aktivieren.</li>
              <li>Incident: erst rotieren, dann aufräumen.</li>
            </ol>
          </div>

          <div className="p-6 rounded-2xl border border-gray-800 bg-black/30">
            <div className="font-black text-xl mb-2">Schnelltest</div>
            <p className="text-gray-300">
              Wenn ein Key nicht rotierbar ist, ist er ein Bug. Bau Rotation ein – bevor der Leak passiert.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a className="px-5 py-3 rounded-xl bg-brand-red/10 border border-brand-red/30 hover:bg-brand-red/15 font-bold" href="/security/notfall-leitfaden">
              Notfall: Rotation Reihenfolge
            </a>
            <a className="px-5 py-3 rounded-xl bg-black/30 border border-gray-700 hover:bg-black/40 font-bold" href="/academy">
              Sprint
            </a>
          </div>
        </div>
      </div>
    </Container>
  )
}
