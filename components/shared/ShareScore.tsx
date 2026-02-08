"use client"

import { useMemo, useState } from "react"

async function fetchSvg(url: string): Promise<string> {
  const res = await fetch(url, { cache: "no-store" })
  if (!res.ok) throw new Error("Badge konnte nicht geladen werden")
  return await res.text()
}

async function svgToPngBlob(svg: string, width = 1200, height = 630): Promise<Blob> {
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" })
  const url = URL.createObjectURL(svgBlob)

  try {
    const img = new Image()
    img.decoding = "async"
    img.crossOrigin = "anonymous"

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = () => reject(new Error("Badge konnte nicht gerendert werden"))
      img.src = url
    })

    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Canvas nicht verfügbar")
    // Solid background (falls SVG transparent gerendert wird)
    ctx.fillStyle = "#030712"
    ctx.fillRect(0, 0, width, height)
    ctx.drawImage(img, 0, 0, width, height)

    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/png", 0.92))
    if (!blob) throw new Error("PNG konnte nicht erzeugt werden")
    return blob
  } finally {
    URL.revokeObjectURL(url)
  }
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export default function ShareScore({ target, score, vulnerable }: { target: string; score: number; vulnerable: boolean }) {
  const [busy, setBusy] = useState(false)
  const [hint, setHint] = useState<string | null>(null)

  const shareUrl = useMemo(() => {
    const params = new URLSearchParams({ target, score: String(score), vulnerable: vulnerable ? "1" : "0" })
    return `/score?${params.toString()}`
  }, [target, score, vulnerable])

  const badgeUrl = useMemo(() => {
    const params = new URLSearchParams({ target, score: String(score), vulnerable: vulnerable ? "1" : "0" })
    return `/api/score-badge?${params.toString()}`
  }, [target, score, vulnerable])

  const shareText = useMemo(() => {
    const base = `Mein Claw Security Score: ${score}/100`
    return vulnerable ? `${base} — Risiko erhöht. Fixen via ClawGuru.` : `${base} — Baseline ok. Härtung via ClawGuru.`
  }, [score, vulnerable])

  const tweet = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://clawguru.com"
    const full = `${origin}${shareUrl}`
    const txt = `${shareText} @clawguru`
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(txt)}&url=${encodeURIComponent(full)}`
  }, [shareUrl, shareText])

  async function copyLink() {
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : ""
      await navigator.clipboard.writeText(`${origin}${shareUrl}`)
      setHint("Link kopiert ✅")
      setTimeout(() => setHint(null), 1400)
    } catch {
      setHint("Kopieren nicht möglich (Browser).")
      setTimeout(() => setHint(null), 1600)
    }
  }

  async function copyText() {
    try {
      await navigator.clipboard.writeText(shareText)
      setHint("Text kopiert ✅")
      setTimeout(() => setHint(null), 1400)
    } catch {
      setHint("Kopieren nicht möglich (Browser).")
      setTimeout(() => setHint(null), 1600)
    }
  }

  async function nativeShare() {
    const origin = typeof window !== "undefined" ? window.location.origin : ""
    const url = `${origin}${shareUrl}`
    // @ts-ignore
    if (navigator.share) {
      try {
        // @ts-ignore
        await navigator.share({ title: "Claw Security Score", text: shareText, url })
      } catch {}
    } else {
      await copyLink()
    }
  }

  async function downloadPng() {
    setBusy(true)
    setHint(null)
    try {
      const svg = await fetchSvg(badgeUrl)
      const blob = await svgToPngBlob(svg)
      const safe = target.replace(/[^a-z0-9\-_.]+/gi, "-").slice(0, 40) || "target"
      downloadBlob(blob, `clawguru-score-${score}-${safe}.png`)
      setHint("PNG gespeichert ✅")
      setTimeout(() => setHint(null), 1400)
    } catch (e: any) {
      setHint(e?.message || "PNG Export fehlgeschlagen.")
      setTimeout(() => setHint(null), 2000)
    } finally {
      setBusy(false)
    }
  }

  async function sharePng() {
    setBusy(true)
    setHint(null)
    try {
      const svg = await fetchSvg(badgeUrl)
      const blob = await svgToPngBlob(svg)
      const file = new File([blob], `clawguru-score-${score}.png`, { type: "image/png" })
      const origin = typeof window !== "undefined" ? window.location.origin : ""
      const url = `${origin}${shareUrl}`

      // @ts-ignore
      if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
        // @ts-ignore
        await navigator.share({ title: "Claw Security Score", text: shareText, url, files: [file] })
      } else {
        downloadBlob(blob, `clawguru-score-${score}.png`)
        await copyLink()
      }
    } catch (e: any) {
      setHint(e?.message || "Badge Share fehlgeschlagen.")
      setTimeout(() => setHint(null), 2000)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={nativeShare}
          className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 font-bold text-white transition-colors"
        >
          Teilen
        </button>

        <button
          onClick={sharePng}
          disabled={busy}
          className="px-4 py-2 rounded-xl bg-brand-violet/70 hover:bg-brand-violet disabled:opacity-60 font-bold text-white transition-colors"
        >
          {busy ? "Badge…" : "Badge teilen"}
        </button>

        <button
          onClick={downloadPng}
          disabled={busy}
          className="px-4 py-2 rounded-xl border border-gray-700 hover:border-gray-500 disabled:opacity-60 font-bold text-gray-200 transition-colors"
        >
          PNG downloaden
        </button>

        <button
          onClick={copyLink}
          className="px-4 py-2 rounded-xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200 transition-colors"
        >
          Link kopieren
        </button>

        <button
          onClick={copyText}
          className="px-4 py-2 rounded-xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200 transition-colors"
        >
          Text kopieren
        </button>

        <a
          href={tweet}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-xl border border-gray-700 hover:border-gray-500 font-bold text-gray-200 transition-colors"
        >
          Tweet
        </a>
      </div>

      {hint ? <div className="text-xs text-gray-400">{hint}</div> : null}

      <div className="text-xs text-gray-500">
        Tipp: PNG ist das “Share-Futter” für Discord/Telegram/Slides.
      </div>
    </div>
  )
}
