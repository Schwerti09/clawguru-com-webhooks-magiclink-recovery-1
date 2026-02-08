"use client"

import { useEffect, useMemo, useState } from "react"

type LivePayload = {
  updatedAt: string
  day: string
  counts: { runbooks: number; tags: number }
  pulse: number
  topTags: { name: string; count: number }[]
  issueCounts: { name: string; count: number }[]
  trending: { slug: string; title: string; summary: string; tags: string[] }[]
}

function fmtTime(iso: string) {
  try {
    const d = new Date(iso)
    return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  } catch {
    return iso
  }
}

export default function OpsWall() {
  const [data, setData] = useState<LivePayload | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [q, setQ] = useState("")
  const [incident, setIncident] = useState("")

  async function load() {
    try {
      const res = await fetch("/api/live-wall", { cache: "no-store" })
      if (!res.ok) throw new Error("Live Feed nicht erreichbar")
      const json = (await res.json()) as LivePayload
      setData(json)
      setErr(null)
    } catch (e: any) {
      setErr(e?.message || "Live Feed Fehler")
    }
  }

  useEffect(() => {
    load()
    const t = setInterval(load, 12000)
    return () => clearInterval(t)
  }, [])

  const incidentLink = useMemo(() => {
    const base = incident.trim()
      ? `Ich habe ein Incident-Symptom: ${incident.trim()}. Gib mir ein Runbook mit Steps + Checks.`
      : `Ich will eine Härtungs-Session: gib mir ein Runbook für sichere Defaults (Firewall, SSH, Secrets, Webhooks).`
    return `/copilot?q=${encodeURIComponent(base)}`
  }, [incident])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl border border-gray-800 bg-black/30">
          <div className="text-xs text-gray-500 mb-2">Ops Pulse (synthetisch)</div>
          <div className="flex items-end gap-3">
            <div className="text-5xl font-black">{data?.pulse ?? "—"}</div>
            <div className="pb-2 text-sm text-gray-300">aktive “Sessions”</div>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            Updated: {data ? fmtTime(data.updatedAt) : "—"} · Day: {data?.day ?? "—"}
          </div>
          <div className="mt-4 h-2 rounded-full bg-gray-900 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-cyan to-brand-violet"
              style={{ width: `${Math.min(100, Math.max(5, (data?.pulse ?? 5))) }%` }}
            />
          </div>
        </div>

        <div className="p-6 rounded-3xl border border-gray-800 bg-black/30">
          <div className="text-xs text-gray-500 mb-2">Library</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-3xl font-black">{data?.counts.runbooks ?? "—"}</div>
              <div className="text-sm text-gray-300">Runbooks</div>
            </div>
            <div>
              <div className="text-3xl font-black">{data?.counts.tags ?? "—"}</div>
              <div className="text-sm text-gray-300">Tags</div>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            Alles indexierbar. Alles verlinkbar. Alles “problem → fix → verify”.
          </div>
        </div>

        <div className="p-6 rounded-3xl border border-gray-800 bg-black/30">
          <div className="text-xs text-gray-500 mb-2">Fast Actions</div>

          <div className="space-y-3">
            <div>
              <div className="text-sm font-bold mb-2">Runbooks durchsuchen</div>
              <div className="flex gap-2">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="z.B. 502, webhook, nginx map, docker secrets…"
                  className="flex-1 px-4 py-3 rounded-2xl bg-black/40 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
                <a
                  href={`/runbooks?q=${encodeURIComponent(q.trim())}`}
                  className="px-4 py-3 rounded-2xl bg-gray-900 hover:bg-gray-800 border border-gray-700 font-bold"
                >
                  Go
                </a>
              </div>
            </div>

            <div>
              <div className="text-sm font-bold mb-2">Incident starten</div>
              <input
                value={incident}
                onChange={(e) => setIncident(e.target.value)}
                placeholder="Symptom in 1 Satz… (z.B. Stripe webhook signature mismatch)"
                className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                <a
                  href={incidentLink}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 font-bold text-white"
                >
                  Copilot öffnen →
                </a>
                <a
                  href="/check"
                  className="px-4 py-2 rounded-xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200 transition-colors"
                >
                  Score prüfen
                </a>
              </div>
            </div>
          </div>

          {err ? <div className="mt-4 text-sm text-red-200">{err}</div> : null}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-6 rounded-3xl border border-gray-800 bg-black/30">
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-black">Trending Fixes</div>
            <a href="/runbooks" className="text-sm text-cyan-300 hover:text-cyan-200 underline">
              alle Runbooks →
            </a>
          </div>

          <div className="space-y-3">
            {(data?.trending || []).map((t) => (
              <a
                key={t.slug}
                href={`/runbook/${t.slug}`}
                className="block p-4 rounded-2xl border border-gray-800 bg-black/20 hover:bg-black/30 transition-colors"
              >
                <div className="font-bold text-gray-100">{t.title}</div>
                <div className="mt-1 text-sm text-gray-400">{t.summary}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {t.tags.map((x) => (
                    <span key={x} className="px-2 py-1 rounded-lg border border-gray-800 bg-black/30 text-xs text-gray-300">
                      {x}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-6 rounded-3xl border border-gray-800 bg-black/30">
            <div className="text-lg font-black mb-4">Top Tags</div>
            <div className="grid grid-cols-2 gap-2">
              {(data?.topTags || []).slice(0, 12).map((t) => (
                <a
                  key={t.name}
                  href={`/tag/${encodeURIComponent(t.name)}`}
                  className="px-3 py-2 rounded-2xl border border-gray-800 bg-black/20 hover:bg-black/30 transition-colors flex items-center justify-between"
                >
                  <span className="text-sm font-bold">{t.name}</span>
                  <span className="text-xs text-gray-400">{t.count}</span>
                </a>
              ))}
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Diese Tags sind aus der Runbook-Library aggregiert (keine Userdaten).
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-gray-800 bg-black/30">
            <div className="text-lg font-black mb-4">Hot Issues</div>
            <div className="space-y-2">
              {(data?.issueCounts || []).map((x) => (
                <div key={x.name} className="flex items-center gap-3">
                  <div className="w-28 text-sm font-bold text-gray-200">{x.name}</div>
                  <div className="flex-1 h-2 rounded-full bg-gray-900 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-cyan to-brand-violet"
                      style={{ width: `${Math.min(100, Math.max(3, (x.count / (data?.counts.runbooks || 1)) * 220))}%` }}
                    />
                  </div>
                  <div className="w-12 text-right text-xs text-gray-400">{x.count}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-gray-500">
              “Hot” = Häufigkeit in Titles/Summaries der Library, nicht aus deinen Logs.
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-3xl border border-gray-800 bg-gradient-to-br from-cyan-950/20 to-blue-950/10">
        <div className="text-2xl font-black mb-2">Make it a conversation.</div>
        <p className="text-gray-300">
          Das Ziel ist nicht “Content”. Das Ziel ist Rückkehr: Score → Runbook → Fix → Re-Check → Share → Team-Workflow.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="/check" className="px-5 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-700 font-bold text-white">
            Security-Check
          </a>
          <a href="/copilot" className="px-5 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200">
            Copilot
          </a>
          <a href="/pricing" className="px-5 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200">
            Pro / Team
          </a>
        </div>
      </div>
    </div>
  )
}
