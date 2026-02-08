"use client"

import { useEffect, useState } from "react"

/**
 * Pure CSS-ish animated backdrop with a "neural grid" vibe.
 * No canvas, no deps: safe for Netlify/Vercel builds.
 */
export default function NeuralGrid({ intensity = 0.65 }: { intensity?: number }) {
  const [seed, setSeed] = useState(0)
  useEffect(() => {
    // deterministic-ish per session (just for subtle variation)
    setSeed(Math.floor(Math.random() * 10_000))
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity: intensity }}
    >
      {/* soft radial glows */}
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl bg-cyan-500/15 animate-pulse" />
      <div className="absolute -bottom-52 -right-52 h-[620px] w-[620px] rounded-full blur-3xl bg-violet-500/15 animate-pulse" />

      {/* animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(circle_at_center,black,transparent_70%)] animate-[gridMove_12s_linear_infinite]" />

      {/* drifting noise dots */}
      <div
        className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(circle_at_center,black,transparent_65%)] animate-[dotsDrift_18s_linear_infinite]"
        style={{ transform: `translate3d(${seed % 7}px, ${(seed % 13) - 6}px, 0)` }}
      />

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-44px,-44px,0); }
        }
        @keyframes dotsDrift {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(40px,-60px,0); }
        }
      `}</style>
    </div>
  )
}
