import Container from "@/components/shared/Container"
import HardeningSprint from "@/components/academy/HardeningSprint"

export default function Academy() {
  const howtoJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "OpenClaw Hardening Sprint (30 Minuten)",
    "description": "Kurz-Sprint: Baseline-Hardening für OpenClaw/Moltbot Instanzen.",
    "step": [
      { "@type": "HowToStep", "name": "Secrets rotieren", "text": "API/Telegram Keys erneuern und alte Tokens invalidieren." },
      { "@type": "HowToStep", "name": "Exposition schließen", "text": "Private networking + Firewall deny-by-default." },
      { "@type": "HowToStep", "name": "Origin/Token Disziplin", "text": "WebSocket Origin allowlist und kurze Token TTL." },
      { "@type": "HowToStep", "name": "Monitoring aktivieren", "text": "Auth-Fails, Anomalien und Kosten-Spikes alarmieren." }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoJsonLd) }} />
      <Container>
      <div className="py-16">
        <HardeningSprint />
      </div>
    </Container>
    </>
  )
}
