import Container from "@/components/shared/Container"
import CopilotChat from "@/components/copilot/CopilotChat"

export default function CopilotPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const q = typeof searchParams?.q === "string" ? searchParams?.q : ""
  return (
    <Container>
      <div className="py-16">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Copilot</h1>
        <p className="text-gray-300 text-lg mb-8">
          Konversation → Prioritäten → Runbook. (Wenn du nur scrollst, gewinnt der nächste Incident.)
        </p>
        {/* CopilotChat supports manual input; prefill hint displayed below */}
        {q ? (
          <div className="mb-6 p-4 rounded-2xl border border-gray-800 bg-black/30 text-gray-300">
            Prefill: <span className="font-mono">{q}</span> — kopier das in den Input oder klick unten einen Followup.
          </div>
        ) : null}
        <CopilotChat />
      </div>
    </Container>
  )
}
