import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import { RUNBOOKS, getRunbook } from "@/lib/pseo"
import { notFound } from "next/navigation"

export const revalidate = 60 * 60 * 24 // 24h
export const dynamicParams = true

export async function generateStaticParams() {
  // pre-render top N (fast + SEO), rest via ISR
  return RUNBOOKS.slice(0, 20).map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const r = getRunbook(params.slug)
  if (!r) return {}
  return {
    title: `${r.title} | ClawGuru Runbook`,
    description: r.summary,
    alternates: { canonical: `/runbook/${r.slug}` },
    openGraph: {
      title: `${r.title} | ClawGuru`,
      description: r.summary,
      type: "article"
    }
  }
}

function jsonLd(r: { title: string; summary: string; slug: string; steps: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: r.title,
    description: r.summary,
    url: `/runbook/${r.slug}`,
    step: r.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s,
      text: s
    }))
  }
}

export default function RunbookPage({ params }: { params: { slug: string } }) {
  const r = getRunbook(params.slug)
  if (!r) return notFound()

  const related = RUNBOOKS.filter((x) => x.slug !== r.slug && x.tags.some((t) => r.tags.includes(t))).slice(0, 6)

  return (
    <Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd({ title: r.title, summary: r.summary, slug: r.slug, steps: r.howto.steps })) }}
      />
      <div className="py-16 max-w-4xl mx-auto">
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li><a href="/" className="hover:text-cyan-400">ClawGuru</a></li>
            <li>/</li>
            <li><a href="/runbooks" className="hover:text-cyan-400">Runbooks</a></li>
            <li>/</li>
            <li className="text-gray-300">{r.title}</li>
          </ol>
        </nav>

        <SectionTitle kicker="Runbook" title={r.title} subtitle={r.summary} />

        <div className="mt-10 p-6 rounded-3xl border border-gray-800 bg-black/25">
          <div className="text-xs uppercase tracking-widest text-gray-500">Steps</div>
          <ol className="mt-4 list-decimal pl-6 space-y-3 text-gray-200">
            {r.howto.steps.map((s) => (
              <li key={s} className="leading-relaxed">{s}</li>
            ))}
          </ol>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/check"
              className="px-6 py-3 rounded-2xl font-black bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90"
            >
              Re-Check starten →
            </a>
            <a
              href="/copilot"
              className="px-6 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200"
            >
              Copilot Runbook Builder →
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {r.tags.map((t) => (
              <a key={t} href={`/tag/${encodeURIComponent(t)}`} className="px-2 py-1 rounded-lg border border-gray-800 bg-black/30 text-xs text-gray-300 hover:bg-black/40">
                {t}
              </a>
            ))}
          </div>
        </div>

        {related.length > 0 ? (
          <div className="mt-10">
            <div className="text-xl font-black mb-4">Related Runbooks</div>
            <div className="grid md:grid-cols-2 gap-4">
              {related.map((x) => (
                <a
                  key={x.slug}
                  href={`/runbook/${x.slug}`}
                  className="p-5 rounded-3xl border border-gray-800 bg-black/25 hover:bg-black/35 transition-colors"
                >
                  <div className="font-black">{x.title}</div>
                  <div className="mt-2 text-sm text-gray-400">{x.summary}</div>
                  <div className="mt-3 text-sm text-cyan-300 underline">Öffnen →</div>
                </a>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-12 p-6 rounded-3xl border border-gray-800 bg-black/20 text-sm text-gray-400">
          Hinweis: Diese Inhalte sind für Ops/Security gedacht. Keine „Namen-Datenbank“, keine Anschuldigungen – nur Runbooks, Tools und verifizierbare Checks.
        </div>
      </div>
    </Container>
  )
}
