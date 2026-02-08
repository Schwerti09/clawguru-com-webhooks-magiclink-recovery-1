"use client"

import { useState } from "react"

export default function PortalButton() {
  const [loading, setLoading] = useState(false)

  async function openPortal() {
    setLoading(true)
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" })
      const data = await res.json()
      if (data?.url) window.location.href = data.url
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={openPortal}
      disabled={loading}
      className="px-5 py-3 rounded-2xl font-black bg-gradient-to-r from-gray-900 to-gray-800 hover:opacity-90 disabled:opacity-60"
    >
      {loading ? "Portal…" : "Billing Portal"}
    </button>
  )
}
