export type SecurityCheckResult = {
  timestamp: string
  target: string
  vulnerable: boolean
  score: number // 0-100 (heuristic)
  message: string
  details: string[]
  recommendations: string[]
  disclaimer: string
}

export async function performSecurityCheck(target: string): Promise<SecurityCheckResult> {
  const res = await fetch("/api/security-check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ target })
  })
  if (!res.ok) {
    const msg = await res.text().catch(() => "")
    throw new Error(msg || "Security check failed")
  }
  return (await res.json()) as SecurityCheckResult
}
