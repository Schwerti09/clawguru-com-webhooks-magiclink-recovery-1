'use client'

import { useEffect, useMemo, useState } from "react"

type Step = { id: string; title: string; desc: string; minutes: number; links: Array<{ label: string; href: string }> }

const STEPS: Step[] = [
  {
    id: "rotate",
    title: "Keys rotieren (alles)",
    desc: "OpenAI/Anthropic/Telegram/DB – rotiere & invalide alte Tokens. Ohne Drama, aber konsequent.",
    minutes: 6,
    links: [{ label: "Notfall-Runbook", href: "/security/notfall-leitfaden" }]
  },
  {
    id: "close",
    title: "Exposition schließen",
    desc: "Private subnet + VPN/Tunnel. Keine offenen Admin-Ports. Firewall-Default: deny.",
    minutes: 8,
    links: [{ label: "Setup Guide", href: "/einrichtung" }, { label: "Validator", href: "/tools" }]
  },
  {
    id: "ws",
    title: "WebSocket Hardening",
    desc: "Origin-Validation, CSRF, Token-Binding, Rate Limits. WebSockets sind die unterschätzte Frontdoor.",
    minutes: 8,
    links: [{ label: "Vault: WS Origin", href: "/vault/ws-origin" }]
  },
  {
    id: "monitor",
    title: "Monitoring & Alerts",
    desc: "Uptime + Auth-Fails + ungewöhnliche Requests. Du willst wissen, dass es brennt, bevor Twitter es weiß.",
    minutes: 6,
    links: [{ label: "Intel Feed", href: "/intel" }]
  },
  {
    id: "backup",
    title: "Backups & Restore-Test",
    desc: "Backups ohne Restore-Test sind Fanfiction. Prüfe es einmal, dann schläfst du besser.",
    minutes: 4,
    links: [{ label: "Lagebericht", href: "/openclaw-security-2026" }]
  }
]

function storageKey() { return "clawguru_sprint_v1" }

export default function HardeningSprint() {
  const [done, setDone] = useState<Record<string, boolean>>({})
  const [note, setNote] = useState("")

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey())
      if (raw) {
        const parsed = JSON.parse(raw)
        setDone(parsed.done || {})
        setNote(parsed.note || "")
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(storageKey(), JSON.stringify({ done, note }))
    } catch {}
  }, [done, note])

  const total = useMemo(() => STEPS.reduce((a, s) => a + s.minutes, 0), [])
  const completed = useMemo(() => STEPS.filter((s) => done[s.id]).reduce((a, s) => a + s.minutes, 0), [done])
  const pct = Math.round((completed / total) * 100)

  return (
    <div className="space-y-4">
      <div className="p-6 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/60 to-black shadow-glow2">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-brand-cyan/80">Academy</div>
            <div className="text-3xl font-black">30-Min Hardening Sprint</div>
            <div className="text-gray-300 mt-2">
              Keine Magie. Nur Prioritäten. Du willst am Ende „langweilig sicher“ sein.
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black">{pct}%</div>
            <div className="text-sm text-gray-400">{completed}/{total} Minuten erledigt</div>
          </div>
        </div>

        <div className="mt-5 h-3 rounded-full bg-black/40 border border-gray-800 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-brand-cyan to-brand-violet" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {STEPS.map((s) => (
          <div key={s.id} className="p-6 rounded-2xl border border-gray-800 bg-black/30">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-black text-xl">{s.title}</div>
                <div className="text-sm text-gray-400 mt-1">{s.minutes} Minuten</div>
              </div>
              <button
                onClick={() => setDone((d) => ({ ...d, [s.id]: !d[s.id] }))}
                className={
                  "px-4 py-2 rounded-xl font-bold border " +
                  (done[s.id]
                    ? "bg-brand-green/15 border-brand-green/30 text-brand-green"
                    : "bg-black/30 border-gray-700 hover:bg-black/40")
                }
              >
                {done[s.id] ? "Erledigt" : "Markieren"}
              </button>
            </div>
            <p className="mt-3 text-gray-300">{s.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {s.links.map((l) => (
                <a key={l.href} href={l.href} className="px-4 py-2 rounded-xl bg-black/30 border border-gray-700 hover:bg-black/40 text-sm">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl border border-gray-800 bg-black/30">
        <div className="font-black text-lg mb-2">Notizen (für dein Runbook)</div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="z.B. 'Keys rotiert, VPN steht, WS origin whitelist: ...'"
          className="w-full h-28 rounded-xl bg-black/40 border border-gray-700 p-4"
        />
        <div className="mt-3 text-xs text-gray-500">
          Wird lokal im Browser gespeichert (localStorage).
        </div>
      </div>
    </div>
  )
}
