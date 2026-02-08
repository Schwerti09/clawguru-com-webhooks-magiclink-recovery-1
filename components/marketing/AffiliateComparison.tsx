import { HOSTING_PROVIDERS, SERVICE } from "@/lib/constants"

export default function AffiliateComparison() {
  return (
    <div className="overflow-x-auto border border-gray-800 rounded-2xl bg-black/20">
      <table className="min-w-[840px] w-full text-sm">
        <thead className="bg-gray-900/60">
          <tr>
            <th className="text-left p-4">Anbieter</th>
            <th className="text-left p-4">Preis</th>
            <th className="text-left p-4">Specs</th>
            <th className="text-left p-4">Best for</th>
            <th className="text-left p-4">Deal</th>
          </tr>
        </thead>
        <tbody>
          {HOSTING_PROVIDERS.map((p) => (
            <tr key={p.name} className="border-t border-gray-800">
              <td className="p-4">
                <div className="font-black">{p.name}</div>
                <div className="text-xs text-gray-400 inline-flex items-center gap-2">
                  <span className="px-2 py-1 rounded-full border border-gray-700 bg-black/30">{p.badge}</span>
                  <span>{p.commission}</span>
                </div>
              </td>
              <td className="p-4">{p.price}</td>
              <td className="p-4 text-gray-300">{p.specs}</td>
              <td className="p-4 text-gray-300">{p.bestFor}</td>
              <td className="p-4">
                <a className="px-3 py-2 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 hover:bg-brand-cyan/25" href={p.url} rel="nofollow">
                  Zum Anbieter
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

<div className="p-6 border-t border-gray-800 bg-gradient-to-r from-black/40 to-blue-950/20">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div>
      <div className="text-xs uppercase tracking-widest text-cyan-300/80 font-bold">Kein Bock auf Ops?</div>
      <div className="text-2xl font-black mt-1">Managed statt selber basteln.</div>
      <p className="text-gray-300 mt-2">
        Überwacht, gepatcht, gewartet: <span className="font-semibold">{SERVICE.managedName}</span> ab{" "}
        <span className="font-bold">{SERVICE.managedFromPrice}</span>. In 10 Minuten startklar.
      </p>
    </div>
    <a
      className="px-6 py-3 rounded-2xl font-black bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg"
      href={SERVICE.managedHref}
      rel="nofollow"
    >
      Jetzt loslegen →
    </a>
  </div>
</div>
    </div>
  )
}
