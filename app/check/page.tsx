import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import HeroSecurityCheck from "@/components/marketing/HeroSecurityCheck"

export default function CheckPage() {
  return (
    <Container>
      <div className="py-16">
        <SectionTitle
          kicker="LIVE"
          title="Security-Check"
          subtitle="IP/Domain rein. Score raus. Und dann: klare nächste Schritte."
        />
        <div className="mt-8">
          <HeroSecurityCheck />
        </div>
      </div>
    </Container>
  )
}
