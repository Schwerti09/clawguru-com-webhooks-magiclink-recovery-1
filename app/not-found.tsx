import Container from "@/components/shared/Container"

export default function NotFound() {
  return (
    <Container>
      <div className="py-24 text-center">
        <div className="text-5xl font-black">404</div>
        <p className="mt-3 text-gray-300">Diese Seite existiert nicht. Aber dein Incident vielleicht schon.</p>
        <div className="mt-6 flex justify-center gap-3">
          <a className="px-5 py-3 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 hover:bg-brand-cyan/25 font-bold" href="/intel">Intel Feed</a>
          <a className="px-5 py-3 rounded-xl bg-black/30 border border-gray-700 hover:bg-black/40 font-bold" href="/copilot">Copilot</a>
        </div>
      </div>
    </Container>
  )
}
