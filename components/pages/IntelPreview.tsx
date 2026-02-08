'use client'

import { useEffect, useState } from "react"

type Incident = { id: string; title: string; severity: "low" | "medium" | "high"; when: string; summary: string }

function pill(sev: Incident["severity"]) {
  if (sev === "high") return "border-brand-red/30 bg-brand-red/10 text-brand-red"
  if (sev === "medium") return "border-brand-orange/30 bg-brand-orange/10 text-brand-orange"
  return "border-brand-green/30 bg-brand-green/10 text-brand-green"
}

export default function IntelPreview() {
  const [items, setItems] = useState<Incident[]>([])
  useEffect(() => {
    fetch("/api/incidents").then(r => r.json()).then(d => setItems((d.items || []).slice(0, 3))).catch(() => setItems([]))
  }, [])

  return (
    <div className="space-y-3">
      {items.map((i) => (
        <div key={i.id} className="p-5 rounded-2xl border border-gray-800 bg-black/30">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-black">{i.title}</div>
              <div className="text-xs text-gray-500 mt-1">{i.when}</div>
            </div>
            <div className={"px-3 py-1 rounded-full text-xs border " + pill(i.severity)}>{i.severity.toUpperCase()}</div>
          </div>
          <div className="mt-2 text-sm text-gray-300">{i.summary}</div>
        </div>
      ))}
      <a className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-black/30 border border-gray-700 hover:bg-black/40 font-bold" href="/intel">
        Alle Intel sehen →
      </a>
    </div>
  )
}
