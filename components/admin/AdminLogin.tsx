"use client"

import { useMemo, useState } from "react"

export default function AdminLogin() {
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const can = useMemo(() => user.trim().length > 0 && pass.length > 0 && !busy, [user, pass, busy])

  async function login() {
    if (!can) return
    setBusy(true)
    setErr(null)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ user, pass })
      })
      if (!res.ok) {
        const j = await res.json().catch(() => null)
        setErr(j?.error || "Login fehlgeschlagen")
        return
      }
      window.location.href = "/admin/center"
    } catch {
      setErr("Netzwerkfehler")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-3xl border border-gray-800 bg-black/35 p-6">
      <div className="text-xs uppercase tracking-widest text-gray-400">Admin</div>
      <div className="mt-2 text-2xl font-black">Control Center</div>
      <p className="mt-2 text-gray-400 text-sm">
        Login läuft über ENV-Credentials. Nichts wird ins Repo geschrieben.
      </p>

      <div className="mt-6 grid gap-3">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Username</label>
          <input
            className="w-full px-4 py-3 rounded-2xl bg-gray-950/60 border border-gray-800 focus:border-brand-cyan outline-none"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="admin"
            autoComplete="username"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Password</label>
          <input
            className="w-full px-4 py-3 rounded-2xl bg-gray-950/60 border border-gray-800 focus:border-brand-cyan outline-none"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="••••••••••"
            autoComplete="current-password"
            onKeyDown={(e) => e.key === "Enter" && login()}
          />
        </div>

        {err && <div className="text-sm text-red-300 bg-red-950/30 border border-red-900/40 rounded-2xl p-3">{err}</div>}

        <button
          onClick={login}
          disabled={!can}
          className="px-5 py-3 rounded-2xl font-black bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90 disabled:opacity-50"
        >
          {busy ? "Login…" : "Einloggen"}
        </button>

        <a className="text-sm text-gray-400 underline hover:text-gray-300" href="/">
          Zurück zur Seite
        </a>
      </div>
    </div>
  )
}
