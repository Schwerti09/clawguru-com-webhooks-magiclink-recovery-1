'use client'

import { useState } from "react"

export default function HeroInstitution() {
  const [q, setQ] = useState("")

  return (
    <div className="pt-28 pb-14">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="animate-fadeUp">
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-gray-800 bg-black/30 text-xs text-gray-300">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulseSoft" />
            Institutional Ops Intelligence · 2026
          </div>

          <h1 className="mt-4 text-5xl md:text-6xl font-black leading-tight">
            Die <span className="bg-gradient-to-r from-brand-cyan to-brand-violet bg-clip-text text-transparent">Institution</span> für
            OpenClaw Security & Ops
          </h1>

          <p className="mt-5 text-lg text-gray-300 max-w-xl">
            Tools, Lageberichte, Incident-Runbooks und ein Copilot, der Prioritäten setzt.
            Ziel: weniger Panik, mehr Betriebssicherheit.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a className="px-5 py-3 rounded-xl font-black bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90 shadow-glow2" href="/copilot">
              Ask Copilot
            </a>
            <a className="px-5 py-3 rounded-xl font-black bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 shadow-glow2" href="/pricing">
              Pro Kits (Stripe)
            </a>
            <a className="px-5 py-3 rounded-xl border border-gray-700 bg-gray-900/40 hover:bg-gray-900 rounded-xl font-bold" href="/intel">
              Intel Feed
            </a>
            <a className="px-5 py-3 rounded-xl font-black bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 shadow-glow2" href="/pricing">
              Pro Kits (Stripe)
            </a>
            <a className="px-5 py-3 rounded-xl border border-gray-700 bg-gray-900/40 hover:bg-gray-900 rounded-xl font-bold" href="/academy">
              Hardening Sprint
            </a>
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-3 text-sm text-gray-300">
            <div className="p-4 rounded-2xl border border-gray-800 bg-black/30">
              <div className="font-black">Copilot</div>
              <div className="text-gray-400">Konversation → Runbook</div>
            </div>
            <div className="p-4 rounded-2xl border border-gray-800 bg-black/30">
              <div className="font-black">Vault</div>
              <div className="text-gray-400">Referenzen & Patterns</div>
            </div>
            <div className="p-4 rounded-2xl border border-gray-800 bg-black/30">
              <div className="font-black">Academy</div>
              <div className="text-gray-400">Sprints statt Kurse</div>
            </div>
          </div>
        </div>

        <div className="border border-gray-800 rounded-2xl bg-gradient-to-br from-gray-900/70 to-black p-6 md:p-7 shadow-glow">
          <div className="font-black text-lg">Mini-Copilot</div>
          <div className="text-sm text-gray-400 mt-1">
            Schreib dein Problem in 1 Satz. Wir leiten dich in den richtigen Hub.
          </div>

          <div className="mt-4 flex gap-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="z.B. 'ich glaube mein gateway ist exposed'"
              className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-cyan/30 focus:border-brand-cyan"
            />
            <a
              href={"/copilot?q=" + encodeURIComponent(q || "ich will hardening")}
              className="px-5 py-3 rounded-xl font-black bg-gradient-to-r from-brand-orange to-brand-red hover:opacity-90"
            >
              Los
            </a>
          </div>

          <div className="mt-6 text-sm text-gray-300">
            <div className="font-black mb-2">Beliebte Prompts</div>
            <div className="flex flex-wrap gap-2">
              {[
                "Ich glaube ich bin exposed",
                "Wie härte ich WebSockets?",
                "Welche Provider sind stabil & günstig?",
                "Was sind die Top 5 Misconfigs?"
              ].map((s) => (
                <a key={s} href={"/copilot?q=" + encodeURIComponent(s)} className="px-3 py-2 rounded-xl border border-gray-800 bg-black/30 hover:bg-black/40 text-sm">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-2xl border border-gray-800 bg-black/25 text-xs text-gray-400">
            Kein Login. Keine Dark-Patterns. Nur eine Seite, die dich wirklich aus dem Feuer zieht.
          </div>
        </div>
      </div>
    </div>
  )
}
