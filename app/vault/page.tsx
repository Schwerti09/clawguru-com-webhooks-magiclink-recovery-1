'use client'

import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import { KB } from "@/lib/kb"
import { useMemo, useState } from "react"

export default function Vault() {
  const [q, setQ] = useState("")
  const filtered = useMemo(() => {
    const t = q.toLowerCase().trim()
    return KB.filter((k) => {
      if (!t) return true
      const hay = (k.title + " " + k.excerpt + " " + k.tags.join(" ")).toLowerCase()
      return hay.includes(t)
    })
  }, [q])

  return (
    <Container>
      <div className="py-16">
        <SectionTitle
          kicker="Knowledge Base"
          title="Vault"
          subtitle="Kurz, referenzierbar, wiederverwendbar. Das sind die Seiten, die man später verlinkt."
        />

        <div className="p-5 rounded-2xl border border-gray-800 bg-black/30">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-cyan/30 focus:border-brand-cyan"
            placeholder="Suche im Vault… (origin, secrets, runbook, tco)"
          />
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {filtered.map((k) => (
            <a key={k.id} href={k.href} className="p-6 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-black hover:bg-black/40">
              <div className="font-black text-xl">{k.title}</div>
              <div className="text-gray-300 mt-2">{k.excerpt}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {k.tags.map((t) => (
                  <span key={t} className="px-2 py-1 rounded-full border border-gray-700 bg-black/30 text-xs text-gray-400">
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </Container>
  )
}
