"use client"

import { useState } from "react"

export default function BuyButton({
  product,
  label,
  className
}: {
  product: "pro" | "team" | "daypass"
  label: string
  className?: string
}) {
  const [loading, setLoading] = useState(false)

  async function go() {
    setLoading(true)
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product })
      })
      const data = await res.json()
      if (data?.url) window.location.href = data.url
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={go}
      disabled={loading}
      className={
        className ||
        "px-6 py-3 rounded-2xl font-black bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90 disabled:opacity-60"
      }
    >
      {loading ? "Weiter…" : label}
    </button>
  )
}
