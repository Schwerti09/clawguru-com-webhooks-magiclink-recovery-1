import Container from "@/components/shared/Container"
import ShareScore from "@/components/shared/ShareScore"

export default function ScorePage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const target = typeof searchParams?.target === "string" ? searchParams?.target : "unknown"
  const scoreRaw = typeof searchParams?.score === "string" ? Number(searchParams?.score) : 0
  const score = Number.isFinite(scoreRaw) ? Math.max(0, Math.min(100, Math.round(scoreRaw))) : 0
  const vulnerable = typeof searchParams?.vulnerable === "string" ? searchParams?.vulnerable === "1" : false

  const params = new URLSearchParams({
    target,
    score: String(score),
    vulnerable: vulnerable ? "1" : "0"
  })

  const badgeUrl = `/api/score-badge?${params.toString()}`
  const copilotSeed = encodeURIComponent(
    vulnerable
      ? `Ich habe einen Score von ${score}/100 für ${target} bekommen (Risiko erhöht). Gib mir ein Notfall-Runbook.`
      : `Ich habe einen Score von ${score}/100 für ${target} bekommen. Wie mache ich daraus 95+?`
  )

  return (
    <Container>
      <div className="py-16">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Dein Claw Security Score</h1>
        <p className="text-gray-300 text-lg mb-8">
          Teilbar, zitierbar, nervig gut. (Und ja: es ist eine Heuristik, kein Audit.)
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="rounded-3xl overflow-hidden border border-gray-800 bg-black/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={badgeUrl} alt="Claw Security Score Badge" className="w-full h-auto" />
          </div>

          <div className="space-y-5">
            <div className="p-6 rounded-3xl border border-gray-800 bg-black/30">
              <div className="text-sm text-gray-400 mb-2">Target</div>
              <div className="font-mono text-gray-100 break-all">{target}</div>

              <div className="mt-4 text-sm text-gray-400 mb-2">Score</div>
              <div className="text-5xl font-black">{score}/100</div>

              <div className="mt-5">
                <ShareScore target={target} score={score} vulnerable={vulnerable} />
              </div>

              <div className="mt-4 text-xs text-gray-500">
                Hinweis: Der Score ist eine heuristische Risiko-Einschätzung (kein Portscan/kein Audit).
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-gray-800 bg-black/30">
              <div className="text-lg font-bold mb-2">Nächster Schritt</div>
              <p className="text-gray-300 mb-4">
                Lass den Copilot daraus ein Runbook bauen – konkret für dein Setup.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`/copilot?q=${copilotSeed}`}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 font-bold text-white transition-all"
                >
                  Copilot öffnen →
                </a>
                <a
                  href={badgeUrl}
                  download
                  className="px-5 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200 transition-colors"
                >
                  SVG downloaden
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
