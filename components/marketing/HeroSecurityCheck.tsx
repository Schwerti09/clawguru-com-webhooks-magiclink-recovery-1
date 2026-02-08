"use client"

import { useMemo, useState } from "react"
import { performSecurityCheck, type SecurityCheckResult } from "@/lib/security-check"
import CTAButton from "@/components/marketing/CTAButton"
import BuyButton from "@/components/commerce/BuyButton"
import { SERVICE } from "@/lib/constants"

function scoreLabel(score: number) {
  if (score >= 90) return "EXZELLENT"
  if (score >= 75) return "SOLIDE"
  if (score >= 60) return "ANGREIFBAR"
  return "KRITISCH"
}

function scoreHint(score: number) {
  if (score >= 90) return "Gute Baseline. Jetzt Monitoring & Rotation automatisieren."
  if (score >= 75) return "Nicht schlecht. Ein paar Defaults können dich trotzdem grillen."
  if (score >= 60) return "Hier reicht ein dummer Zufall. Hardening jetzt."
  return "Stop. Rotieren. Schließen. Stabilisieren."
}

export default function HeroSecurityCheck() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SecurityCheckResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const shareUrl = useMemo(() => {
    if (!result) return ""
    const params = new URLSearchParams({
      target: result.target,
      score: String(result.score),
      vulnerable: result.vulnerable ? "1" : "0"
    })
    return `/score?${params.toString()}`
  }, [result])

  const badgeUrl = useMemo(() => {
    if (!result) return ""
    const params = new URLSearchParams({
      target: result.target,
      score: String(result.score),
      vulnerable: result.vulnerable ? "1" : "0"
    })
    return `/api/score-badge?${params.toString()}`
  }, [result])

  async function handleCheck() {
    if (!input.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await performSecurityCheck(input.trim())
      setResult(res)
    } catch (e: any) {
      setError(e?.message || "Prüfung fehlgeschlagen. Bitte versuche es erneut.")
    } finally {
      setLoading(false)
    }
  }

  async function copyLink() {
    if (!shareUrl) return
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${shareUrl}`)
    } catch {}
  }

  async function nativeShare() {
    if (!shareUrl) return
    const url = `${window.location.origin}${shareUrl}`
    const text = `Mein Claw Security Score: ${result?.score}/100 — geprüft via ClawGuru`
    // @ts-ignore
    if (navigator.share) {
      try {
        // @ts-ignore
        await navigator.share({ title: "Claw Security Score", text, url })
      } catch {}
    } else {
      await copyLink()
    }
  }

  const copilotPrefill = useMemo(() => {
    if (!result) return ""
    const base = result.vulnerable
      ? `Ich glaube meine Instanz ist exposed. Target: ${result.target}. Score: ${result.score}/100. Was sind die nächsten 5 Schritte?`
      : `Ich will meine Baseline härten. Target: ${result.target}. Score: ${result.score}/100. Gib mir ein Runbook.`
    return `/copilot?q=${encodeURIComponent(base)}`
  }, [result])

  return (
    <div className="bg-gradient-to-br from-gray-900/60 to-blue-950/30 border border-gray-800 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div className="flex-grow">
          <h2 className="text-2xl md:text-3xl font-black mb-2">
            LIVE Security-Check (Heuristik) — 30 Sekunden
          </h2>
          <p className="text-gray-300 mb-4">
            Gib IP/Domain/Bot-URL ein. Du bekommst einen <span className="font-semibold">Claw Security Score</span> + klare nächste Schritte.
          </p>

          <label htmlFor="security-target" className="block text-sm font-medium mb-2 text-gray-200">
            Ziel (öffentlich sichtbar): IP, Domain oder URL
          </label>
          <input
            id="security-target"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            placeholder="z.B. 203.0.113.10 oder deinbot.example.com"
            className="w-full p-4 rounded-2xl bg-black/40 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
          />
        </div>

        <button
          onClick={handleCheck}
          disabled={loading || !input.trim()}
          className="w-full md:w-auto px-8 py-4 rounded-2xl font-black text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:shadow-red-900/30"
        >
          {loading ? "Prüfe..." : "KOSTENLOS PRÜFEN"}
        </button>
      </div>

      {error ? (
        <div className="mt-6 p-4 rounded-2xl border border-red-800 bg-red-950/30 text-red-200">
          {error}
        </div>
      ) : null}

      {result ? (
        <div className={`mt-6 p-6 rounded-3xl border ${result.vulnerable ? "border-red-800 bg-red-950/30" : "border-green-800 bg-green-950/20"}`}>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-3">
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${result.vulnerable ? "bg-red-900/60 text-red-200" : "bg-green-900/60 text-green-200"}`}>
                  {result.vulnerable ? "RISIKO ERHÖHT" : "BASIC OK"}
                </div>
                <div className="text-sm text-gray-300">
                  Target: <span className="font-mono text-gray-100">{result.target}</span>
                </div>
              </div>

              <div className="text-xl font-bold mb-2">{result.message}</div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-gray-800 bg-black/30">
                  <div className="text-sm text-gray-400 mb-1">Claw Security Score</div>
                  <div className="flex items-end gap-3">
                    <div className="text-5xl font-black">{result.score}</div>
                    <div className="pb-2 text-sm font-bold text-cyan-300">{scoreLabel(result.score)}</div>
                  </div>
                  <div className="mt-2 text-sm text-gray-300">{scoreHint(result.score)}</div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button onClick={nativeShare} className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 font-bold text-white transition-colors">
                      Badge teilen
                    </button>
                    <button onClick={copyLink} className="px-4 py-2 rounded-xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200 transition-colors">
                      Link kopieren
                    </button>
                    <a href={copilotPrefill} className="px-4 py-2 rounded-xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200 transition-colors">
                      Copilot fragen →
                    </a>
                  </div>

                  <div className="mt-4 text-xs text-gray-500">
                    {result.disclaimer}
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-gray-800 bg-black/30">
                  <div className="text-sm text-gray-400 mb-2">Deine Top-Nächsten Schritte</div>
                  <ul className="space-y-2 text-sm">
                    {result.recommendations.slice(0, 4).map((x) => (
                      <li key={x} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span className="text-gray-200">{x}</span>
                      </li>
                    ))}
                  </ul>

                  {result.vulnerable ? (
                    <div className="mt-5 p-4 rounded-2xl border border-cyan-900 bg-gradient-to-br from-cyan-950/30 to-blue-950/20">
                      <div className="text-sm text-cyan-200 font-bold mb-2">Sofort raus aus dem Risiko?</div>
                      <div className="text-gray-200 mb-3">
                        Überwacht, gepatcht, gewartet: <span className="font-semibold">{SERVICE.managedName}</span> ab{" "}
                        <span className="font-bold">{SERVICE.managedFromPrice}</span>.
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <CTAButton href={SERVICE.managedHref} label="Managed Service starten" variant="primary" size="md" />
                        <BuyButton product="daypass" label="Day Pass (24h Zugriff)" className="px-5 py-3 rounded-2xl font-black bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90" />
                        <CTAButton href="/pricing" label="Pro/Team ansehen" variant="outline" size="md" />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-5 p-4 rounded-2xl border border-gray-800 bg-black/20">
                      <div className="text-sm font-bold text-gray-100 mb-2">Upgrade auf „solide“ in 30 Minuten</div>
                      <div className="text-gray-300 mb-3">Nimm den Academy-Sprint und bring deine Defaults auf „safe by default“.</div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <CTAButton href="/dashboard" label="Dashboard öffnen" variant="primary" size="md" />
                        <BuyButton product="pro" label="Pro Abo starten" className="px-5 py-3 rounded-2xl font-black bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:w-[240px]">
              <div className="text-sm text-gray-400 mb-2">Share-Badge Preview</div>
              <div className="rounded-2xl overflow-hidden border border-gray-800 bg-black/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={badgeUrl} alt="Claw Security Score Badge" className="w-full h-auto" />
              </div>
              <a
                className="mt-3 inline-flex text-sm text-cyan-300 hover:text-cyan-200 underline"
                href={badgeUrl}
                download
              >
                SVG herunterladen
              </a>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
          keine Speicherung von Targets
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
          Score ist heuristisch
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-purple-500" />
          Für echte Aussagen: Config/Logs checken
        </div>
      </div>
    </div>
  )
}
