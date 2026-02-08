import { SECURITY_STATS } from "@/lib/constants"
import { formatNumber } from "@/lib/utils"

export default function TrustBadge() {
  return (
    <div className="sticky top-0 z-50 border-b border-gray-800 bg-black/50 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap items-center gap-3 text-xs text-gray-300">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulseSoft" />
          <strong className="text-gray-100">LIVE</strong> Intel Feed
        </span>
        <span className="text-gray-500">•</span>
        <span>{formatNumber(SECURITY_STATS.exposedInstances)} exponierte Instanzen</span>
        <span className="text-gray-500">•</span>
        <span>{formatNumber(SECURITY_STATS.checksTotal)} Checks</span>
        <span className="text-gray-500">•</span>
        <span>{SECURITY_STATS.bypassRate}% Auth-Bypass Risiko</span>
        <span className="text-gray-500">•</span>
        <span className="text-gray-400">Update: {SECURITY_STATS.lastUpdated}</span>
        <span className="ml-auto text-gray-400">Keine Speicherung deiner Eingaben</span>
      </div>
    </div>
  )
}
