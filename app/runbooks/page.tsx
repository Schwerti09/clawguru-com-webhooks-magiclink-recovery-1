import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import { RUNBOOKS } from "@/lib/pseo"

export const metadata = {
  title: "Runbooks | ClawGuru",
  description:
    "Runbooks für OpenClaw/Moltbot Ops: Security, Setup, Fixes, Incident Response. Score → Runbook → Fix → Re-Check."
}

function Tag({ t }: { t: string }) {
  return (
    <a href={`/tag/${encodeURIComponent(t)}`} className="px-2 py-1 rounded-lg border border-gray-800 bg-black/30 text-xs text-gray-300 hover:bg-black/40">
      {t}
    </a>
  )
}

export default function RunbooksPage({ searchParams }: { searchParams?: { q?: string } }) {
  const q = typeof searchParams?.q === "string" ? searchParams.q.trim().toLowerCase() : ""
  const items = [...RUNBOOKS]
    .filter((r) => {
      if (!q) return true
      const hay = `${r.title} ${r.summary} ${r.tags.join(" ")}`.toLowerCase()
      return hay.includes(q)
    })
    .sort((a, b) => a.title.localeCompare(b.title))
  return (
    <Container>
      <div className="py-16 max-w-6xl mx-auto">
        <SectionTitle
          kicker="Programmatic SEO"
          title="Runbook Library"
          subtitle="Jede Seite ist ein Einstiegspunkt: Problem → Fix → Verifikation."
        />


        <div className="mt-8 p-4 rounded-3xl border border-gray-800 bg-black/30">
          <div className="text-sm font-bold mb-2">Schnellsuche</div>
          <form className="flex gap-2" action="/runbooks" method="get">
            <input
              name="q"
              defaultValue={typeof searchParams?.q === "string" ? searchParams.q : ""}
              placeholder="z.B. 502, webhook, nginx, docker secrets, env leak…"
              className="flex-1 px-4 py-3 rounded-2xl bg-black/40 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
            <button className="px-4 py-3 rounded-2xl bg-gray-900 hover:bg-gray-800 border border-gray-700 font-bold" type="submit">
              Suchen
            </button>
          </form>
          {q ? (
            <div className="mt-3 text-xs text-gray-500">
              Treffer für <span className="font-mono text-gray-200">{q}</span>: <span className="font-bold">{items.length}</span>
            </div>
          ) : (
            <div className="mt-3 text-xs text-gray-500">Tipp: Fehlercode + Provider kombiniert gewinnt.</div>
          )}
        </div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((r) => (
            <a
              key={r.slug}
              href={`/runbook/${r.slug}`}
              className="p-6 rounded-3xl border border-gray-800 bg-black/25 hover:bg-black/35 transition-colors"
            >
              <div className="text-lg font-black">{r.title}</div>
              <div className="mt-2 text-sm text-gray-400">{r.summary}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {r.tags.slice(0, 5).map((t) => (
                  <Tag key={t} t={t} />
                ))}
              </div>
              <div className="mt-5 text-sm text-cyan-300 underline">Runbook öffnen →</div>
            </a>
          ))}
        </div>
      </div>
    </Container>
  )
}
