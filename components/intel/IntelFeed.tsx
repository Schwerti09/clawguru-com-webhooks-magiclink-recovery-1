'use client'

import { useEffect, useMemo, useState } from "react"

type Incident = {
  id: string
  title: string
  severity: "low" | "medium" | "high"
  category: "exposure" | "websocket" | "secrets" | "supply-chain" | "ops"
  when: string
  summary: string
  actions: string[]
}

function pill(sev: Incident["severity"]) {
  if (sev === "high") return "border-brand-red/30 bg-brand-red/10 text-brand-red"
  if (sev === "medium") return "border-brand-orange/30 bg-brand-orange/10 text-brand-orange"
  return "border-brand-green/30 bg-brand-green/10 text-brand-green"
}

const CATS: Array<Incident["category"] | "all"> = ["all", "exposure", "websocket", "secrets", "supply-chain", "ops"]

export default function IntelFeed() {
  const [items, setItems] = useState<Incident[]>([])
  const [q, setQ] = useState("")
  const [cat, setCat] = useState<(typeof CATS)[number]>("all")
  const [sev, setSev] = useState<Incident["severity"] | "all">("all")

  useEffect(() => {
    fetch("/api/incidents")
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .catch(() => setItems([]))
  }, [])

  const filtered = useMemo(() => {
    const t = q.toLowerCase().trim()
    return items.filter((i) => {
      const okQ = !t || (i.title + " " + i.summary).toLowerCase().includes(t)
      const okCat = cat === "all" || i.category === cat
      const okSev = sev === "all" || i.severity === sev
      return okQ && okCat && okSev
    })
  }, [items, q, cat, sev])

  return (
    <div className="space-y-4">
      <div className="p-5 rounded-2xl border border-gray-800 bg-black/30">
        <div className="font-black text-lg">Intel Feed</div>
        <div className="text-sm text-gray-400 mt-1">
          Kuratierte Muster, nicht „News“. Fokus: wiederkehrende Fehlerklassen + Gegenmaßnahmen.
        </div>

        <div className="mt-4 grid md:grid-cols-3 gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="px-4 py-3 rounded-xl bg-black/40 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-cyan/30 focus:border-brand-cyan"
            placeholder="Suche… (z.B. websocket, keys, firewall)"
          />
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value as any)}
            className="px-4 py-3 rounded-xl bg-black/40 border border-gray-700"
          >
            {CATS.map((c) => (
              <option key={c} value={c}>
                Kategorie: {c}
              </option>
            ))}
          </select>
          <select
            value={sev}
            onChange={(e) => setSev(e.target.value as any)}
            className="px-4 py-3 rounded-xl bg-black/40 border border-gray-700"
          >
            <option value="all">Severity: all</option>
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {filtered.map((i) => (
          <div key={i.id} className="p-6 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-black">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-black text-xl">{i.title}</div>
                <div className="text-xs text-gray-400 mt-1">{i.when} · {i.category}</div>
              </div>
              <div className={"px-3 py-1 rounded-full text-xs border " + pill(i.severity)}>
                {i.severity.toUpperCase()}
              </div>
            </div>

            <p className="mt-3 text-gray-300">{i.summary}</p>

            <div className="mt-4">
              <div className="text-sm font-bold text-gray-200 mb-2">Recommended actions</div>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                {i.actions.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <a className="px-4 py-2 rounded-xl bg-black/30 border border-gray-700 hover:bg-black/40 text-sm" href="/tools">Validator</a>
              <a className="px-4 py-2 rounded-xl bg-black/30 border border-gray-700 hover:bg-black/40 text-sm" href="/security/notfall-leitfaden">Runbook</a>
              <a className="px-4 py-2 rounded-xl bg-black/30 border border-gray-700 hover:bg-black/40 text-sm" href="/openclaw-security-2026">Lagebericht</a>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-8 rounded-2xl border border-gray-800 bg-black/30 text-gray-400">
          Keine Treffer. (Oder dein Browser hat beschlossen, heute nicht zu kooperieren.)
        </div>
      )}
    </div>
  )
}
