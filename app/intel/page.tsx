import Container from "@/components/shared/Container"
import IntelFeed from "@/components/intel/IntelFeed"

export default function IntelPage() {
  return (
    <Container>
      <div className="py-16">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Intel Feed</h1>
        <p className="text-gray-300 text-lg mb-8">
          Wiederkehrende Muster, kuratiert. Kein Clickbait. Du willst Handlungswissen.
        </p>
        <IntelFeed />
      </div>
    </Container>
  )
}
