export function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ")
}

export function formatNumber(n: number) {
  return n.toLocaleString("de-DE")
}

export function safeJsonParse<T>(input: string): T | null {
  try { return JSON.parse(input) as T } catch { return null }
}

export function hash10(s: string) {
  // Browser + Node safe small hash (not crypto)
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0).toString(16).slice(0, 10)
}
