"use client"

import { useEffect, useMemo, useState } from "react"

type Overview = {
  now: string
  siteUrl: string
  env: { hasStripe: boolean; hasOpenAI: boolean; hasAdmin: boolean; hasWebhook: boolean; hasEmail: boolean }
  stripe?: {
    currency: string
    charges7d: number
    charges24h: number
    chargeCount7d: number
    activeSubs: number
    trialingSubs: number
    lastPayments: Array<{ created: number; amount: number; currency: string; description?: string | null }>
  }
}

function money(v: number, currency = "eur") {
  const amt = v / 100
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: currency.toUpperCase() }).format(amt)
}

export default function AdminDashboard() {
  const [data, setData] = useState<Overview | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [busy, setBusy] = useState(true)

  async function load() {
    setBusy(true)
    setErr(null)
    try {
      const res = await fetch("/api/admin/overview", { cache: "no-store" })
      if (res.status === 401) {
        window.location.href = "/admin"
        return
      }
      if (!res.ok) {
        setErr("Fehler beim Laden")
        return
      }
      const j = (await res.json()) as Overview
      setData(j)
    } catch {
      setErr("Netzwerkfehler")
    } finally {
      setBusy(false)
    }
  }

  useEffect(() => {
    load()
    const id = setInterval(load, 30_000)
    return () => clearInterval(id)
  }, [])

  const stripe = data?.stripe
  const last = useMemo(() => stripe?.lastPayments || [], [stripe])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-gray-400">
          Live · auto-refresh 30s · {data?.now || "—"}
        </div>
        <div className="flex gap-3">
          <a
            href="/api/admin/logout"
            className="px-4 py-2 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200"
          >
            Logout
          </a>
          <button
            onClick={load}
            className="px-4 py-2 rounded-2xl font-black bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90"
          >
            Refresh
          </button>
        </div>
      </div>

      {busy && (
        <div className="p-6 rounded-3xl border border-gray-800 bg-black/30 text-gray-300">
          Lädt Control Center…
        </div>
      )}
      {err && (
        <div className="p-6 rounded-3xl border border-red-900/50 bg-red-950/30 text-red-200">
          {err}
        </div>
      )}

      {data && (
        <>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl border border-gray-800 bg-black/30">
              <div className="text-xs uppercase tracking-widest text-gray-400">Health</div>
              <div className="mt-2 text-2xl font-black">OK</div>
              <div className="mt-3 text-sm text-gray-300 space-y-1">
                <div>
                  Site: <span className="text-gray-100 font-bold">{data.siteUrl}</span>
                </div>
                <div>
                  Stripe: <span className={data.env.hasStripe ? "text-green-300 font-bold" : "text-red-300 font-bold"}>{data.env.hasStripe ? "ON" : "OFF"}</span>
                </div>
                <div>
                  OpenAI: <span className={data.env.hasOpenAI ? "text-green-300 font-bold" : "text-orange-300 font-bold"}>{data.env.hasOpenAI ? "ON" : "OFF"}</span>
                </div>
                <div>
                  Admin ENV: <span className={data.env.hasAdmin ? "text-green-300 font-bold" : "text-red-300 font-bold"}>{data.env.hasAdmin ? "OK" : "MISSING"}</span>
                </div>
                <div>
                  Webhooks: <span className={data.env.hasWebhook ? "text-green-300 font-bold" : "text-orange-300 font-bold"}>{data.env.hasWebhook ? "ON" : "OFF"}</span>
                </div>
                <div>
                  Email: <span className={data.env.hasEmail ? "text-green-300 font-bold" : "text-orange-300 font-bold"}>{data.env.hasEmail ? "ON" : "OFF"}</span>
                </div>
              </div>
              <a href="/live" className="mt-4 inline-flex text-cyan-300 underline hover:text-cyan-200">Ops Wall öffnen →</a>
            </div>

            <div className="p-6 rounded-3xl border border-gray-800 bg-black/30 lg:col-span-2">
              <div className="text-xs uppercase tracking-widest text-gray-400">Stripe</div>
              <div className="mt-2 text-2xl font-black">Revenue Snapshot</div>
              {stripe ? (
                <div className="mt-4 grid md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl border border-gray-800 bg-black/35">
                    <div className="text-xs text-gray-400">24h</div>
                    <div className="mt-1 text-xl font-black">{money(stripe.charges24h, stripe.currency)}</div>
                  </div>
                  <div className="p-4 rounded-2xl border border-gray-800 bg-black/35">
                    <div className="text-xs text-gray-400">7d</div>
                    <div className="mt-1 text-xl font-black">{money(stripe.charges7d, stripe.currency)}</div>
                  </div>
                  <div className="p-4 rounded-2xl border border-gray-800 bg-black/35">
                    <div className="text-xs text-gray-400">Charges (7d)</div>
                    <div className="mt-1 text-xl font-black">{stripe.chargeCount7d}</div>
                  </div>
                  <div className="p-4 rounded-2xl border border-gray-800 bg-black/35">
                    <div className="text-xs text-gray-400">Active Subs</div>
                    <div className="mt-1 text-xl font-black">{stripe.activeSubs}</div>
                    <div className="text-xs text-gray-500">Trialing: {stripe.trialingSubs}</div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 text-sm text-gray-400">Stripe nicht konfiguriert.</div>
              )}

              {stripe && (
                <div className="mt-6">
                  <div className="text-sm font-bold text-gray-200 mb-2">Last Payments</div>
                  <div className="grid gap-2">
                    {last.slice(0, 8).map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-gray-800 bg-black/35">
                        <div className="text-sm text-gray-300">
                          {new Date(p.created * 1000).toLocaleString("de-DE")}
                          <span className="text-gray-500"> · </span>
                          <span className="text-gray-400">{p.description || "—"}</span>
                        </div>
                        <div className="font-black">{money(p.amount, p.currency)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl border border-gray-800 bg-black/30">
              <div className="text-xs uppercase tracking-widest text-gray-400">Growth</div>
              <div className="mt-2 text-2xl font-black">Loop Controls</div>
              <div className="mt-4 flex flex-col gap-3">
                <a className="px-4 py-3 rounded-2xl font-black bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 text-center" href="/check">
                  Score → Badge → Share
                </a>
                <a className="px-4 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200 text-center" href="/copilot">
                  Copilot Runbooks
                </a>
                <a className="px-4 py-3 rounded-2xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200 text-center" href="/runbooks">
                  1000 Runbooks
                </a>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Tipp: UTM-Links überall. Share-Badges erzeugen „free distribution“.
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-gray-800 bg-black/30 lg:col-span-2">
              <div className="text-xs uppercase tracking-widest text-gray-400">Quick Checks</div>
              <div className="mt-2 text-2xl font-black">Website Health</div>
              <div className="mt-4 grid md:grid-cols-3 gap-4">
                {[
                  ["Health Endpoint", "/api/health", "Schnell-OK"],
                  ["Ops Feed", "/api/live-wall", "Live Data"],
                  ["Sitemaps", "/sitemaps/main.xml", "Indexing"]
                ].map(([t, href, d]) => (
                  <a key={href} href={href} className="p-4 rounded-2xl border border-gray-800 bg-black/35 hover:bg-black/45 transition-colors">
                    <div className="font-black">{t}</div>
                    <div className="text-xs text-gray-500 mt-1">{d}</div>
                    <div className="text-sm text-cyan-300 mt-2 underline">{href}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
