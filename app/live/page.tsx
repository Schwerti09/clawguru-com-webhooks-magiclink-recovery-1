import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import OpsWall from "@/components/live/OpsWall"

export const metadata = {
  title: "Live Ops Wall | ClawGuru",
  description:
    "Live-Signale (synthetisch) + Trends aus der Runbook-Library. Für schnelle Entscheidungen: Incident → Fix → Verify."
}

export default function LivePage() {
  return (
    <Container>
      <div className="py-16 max-w-6xl mx-auto">
        <SectionTitle
          kicker="LIVE"
          title="Ops Wall"
          subtitle="Signals, Trends, Hot Fixes — ohne Bullshit. (Der Puls ist synthetisch, keine Userdaten.)"
        />
        <div className="mt-10">
          <OpsWall />
        </div>
      </div>
    </Container>
  )
}
