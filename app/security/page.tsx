import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"

export default function Security() {
  return (
    <Container>
      <div className="py-16 max-w-4xl mx-auto">
        <SectionTitle
          kicker="Hub"
          title="Security"
          subtitle="CVE-Klassen, Misconfigs, Runbooks. Ziel: Handeln, nicht scrollen."
        />

        <div className="grid md:grid-cols-2 gap-4">
          <a className="p-6 rounded-2xl border border-gray-800 bg-black/30 hover:bg-black/40" href="/security/notfall-leitfaden">
            <div className="text-brand-red font-black">Notfall-Leitfaden</div>
            <div className="text-gray-400">0–60 Minuten Runbook, wenn du exponiert bist.</div>
          </a>
          <a className="p-6 rounded-2xl border border-gray-800 bg-black/30 hover:bg-black/40" href="/openclaw-security-2026#cves">
            <div className="text-brand-cyan font-black">CVE & Angriffsklassen</div>
            <div className="text-gray-400">Was zählt + wie du mitigierst.</div>
          </a>
          <a className="p-6 rounded-2xl border border-gray-800 bg-black/30 hover:bg-black/40" href="/tools">
            <div className="text-brand-orange font-black">Tools</div>
            <div className="text-gray-400">Validatoren, Checklisten, Reports.</div>
          </a>
          <a className="p-6 rounded-2xl border border-gray-800 bg-black/30 hover:bg-black/40" href="/copilot">
            <div className="text-green-400 font-black">Copilot</div>
            <div className="text-gray-400">Konversation → Prioritäten → Runbook.</div>
          </a>
        </div>
      </div>
    </Container>
  )
}
