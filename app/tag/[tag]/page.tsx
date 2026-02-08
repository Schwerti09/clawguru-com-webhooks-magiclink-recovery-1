import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import { allTags, runbooksByTag } from "@/lib/pseo"
import { notFound } from "next/navigation"

export const revalidate = 60 * 60 * 24
export const dynamicParams = true

export async function generateStaticParams() {
  // pre-render a slice of tags
  return allTags().slice(0, 60).map((t) => ({ tag: t }))
}

export async function generateMetadata({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag)
  const items = runbooksByTag(tag)
  if (!items.length) return {}
  return {
    title: `${tag} | ClawGuru Tags`,
    description: `Runbooks unter dem Tag "${tag}". ${items.length} Einträge.`,
    alternates: { canonical: `/tag/${encodeURIComponent(tag)}` }
  }
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag)
  const items = runbooksByTag(tag)
  if (!items.length) return notFound()

  return (
    <Container>
      <div className="py-16 max-w-6xl mx-auto">
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li><a href="/" className="hover:text-cyan-400">ClawGuru</a></li>
            <li>/</li>
            <li><a href="/tags" className="hover:text-cyan-400">Tags</a></li>
            <li>/</li>
            <li className="text-gray-300">{tag}</li>
          </ol>
        </nav>

        <SectionTitle
          kicker="Tag Cluster"
          title={tag}
          subtitle={`${items.length} Runbooks. Klick rein, fix, re-check, repeat.`}
        />

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.slice(0, 120).map((r) => (
            <a
              key={r.slug}
              href={`/runbook/${r.slug}`}
              className="p-6 rounded-3xl border border-gray-800 bg-black/25 hover:bg-black/35 transition-colors"
            >
              <div className="text-lg font-black">{r.title}</div>
              <div className="mt-2 text-sm text-gray-400">{r.summary}</div>
              <div className="mt-5 text-sm text-cyan-300 underline">Runbook öffnen →</div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-sm text-gray-500">
          Hinweis: Tag-Seiten sind absichtlich „hubby“. Sie erhöhen Crawl-Tiefe und verteilen Link-Juice auf Longtail-Runbooks.
        </div>
      </div>
    </Container>
  )
}
