import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import { allTags } from "@/lib/pseo"

export const metadata = {
  title: "Tags | ClawGuru",
  description:
    "Tag Index für Runbooks: Provider, Fehler, Topics, Configs. Interne Linkpower für Longtail-Dominanz."
}

export default function TagsPage() {
  const tags = allTags()
  return (
    <Container>
      <div className="py-16 max-w-6xl mx-auto">
        <SectionTitle
          kicker="Internal Link Clusters"
          title="Tag Index"
          subtitle="Provider · Error · Topic · Config – jede Kombination wird ein Einstiegspunkt."
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {tags.map((t) => (
            <a
              key={t}
              href={`/tag/${encodeURIComponent(t)}`}
              className="px-3 py-2 rounded-xl border border-gray-800 bg-black/25 hover:bg-black/35 text-sm text-gray-200"
            >
              {t}
            </a>
          ))}
        </div>

        <div className="mt-10 text-sm text-gray-500">
          Tipp: Tags sind ein Link-Graph. Je mehr Runbooks du fütterst, desto stärker wird die interne Autorität.
        </div>
      </div>
    </Container>
  )
}
