'use client'
import { useState } from "react"

const ITEMS = [
  { q: "Speichert ClawGuru meine Eingaben?", a: "Nein. Keine persistente Speicherung deiner Checks. Einige Server-Logs können technisch notwendige Metadaten enthalten." },
  { q: "Ist das offiziell?", a: "Nein. ClawGuru ist unabhängig. Genau deshalb ist die Perspektive operativ statt PR." },
  { q: "Was ist der häufigste Fehler?", a: "Öffentliche Exposition + keine Origin/Token-Disziplin. Das ist die klassische Kombi." },
  { q: "Warum so viel 'Ops'?", a: "Weil 90% der Schäden aus Betrieb/Disziplin kommen, nicht aus fancy Features." }
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="space-y-3">
      {ITEMS.map((it, idx) => (
        <div key={it.q} className="border border-gray-800 rounded-2xl overflow-hidden">
          <button
            className="w-full text-left px-5 py-4 bg-gray-900/40 hover:bg-gray-900/60 transition-colors flex items-center justify-between"
            onClick={() => setOpen(open === idx ? null : idx)}
          >
            <span className="font-black">{it.q}</span>
            <span className="text-gray-400">{open === idx ? "–" : "+"}</span>
          </button>
          {open === idx && <div className="px-5 py-4 text-gray-300 bg-black/20">{it.a}</div>}
        </div>
      ))}
    </div>
  )
}
