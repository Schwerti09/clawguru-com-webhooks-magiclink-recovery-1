import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"

export default function MissionControl() {
  return (
    <Container>
      <div className="py-16 max-w-4xl mx-auto">
        <SectionTitle
          kicker="Definition"
          title="Mission Control"
          subtitle="Die operative Schicht zwischen Code und Produktion: Security, Monitoring, Governance, Kostenkontrolle."
        />

        <div className="space-y-6">
          {[
            ["Warum es nötig ist", "OpenClaw ist mächtig. Production ist brutal. Ohne Sichtbarkeit = Incident."],
            ["Was wir liefern", "Tools, Runbooks, Intel, Sprints – alles auf Handlung optimiert."],
            ["Wie du es nutzt", "Copilot → Sprint → Vault → Lagebericht. Wiederkehr statt einmal lesen."]
          ].map(([t, d]) => (
            <div key={t} className="p-6 rounded-2xl border border-gray-800 bg-black/30">
              <div className="font-black text-xl mb-2">{t}</div>
              <div className="text-gray-300">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
