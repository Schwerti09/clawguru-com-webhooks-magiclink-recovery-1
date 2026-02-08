"use client"

export default function ActionDock() {
  return (
    <div className="fixed bottom-3 left-0 right-0 z-40 lg:hidden px-3">
      <div className="mx-auto max-w-2xl rounded-2xl border border-gray-800 bg-gray-950/80 backdrop-blur shadow-glow flex items-center justify-between px-2 py-2">
        <a href="/check" className="flex-1 text-center px-3 py-2 rounded-xl hover:bg-black/30 text-sm font-bold">
          Check
        </a>
        <a href="/copilot" className="flex-1 text-center px-3 py-2 rounded-xl hover:bg-black/30 text-sm font-bold">
          Copilot
        </a>
        <a href="/pricing" className="flex-1 text-center px-3 py-2 rounded-xl hover:bg-black/30 text-sm font-bold">
          Pro Kits
        </a>
        <a href="/vault" className="flex-1 text-center px-3 py-2 rounded-xl hover:bg-black/30 text-sm font-bold">
          Vault
        </a>
      </div>
    </div>
  )
}
