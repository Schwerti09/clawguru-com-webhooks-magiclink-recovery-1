'use client'
import Container from "@/components/shared/Container"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container>
      <div className="py-24 text-center">
        <div className="text-3xl font-black">Fehler</div>
        <p className="mt-3 text-gray-300">Etwas ist schiefgelaufen. (Passiert. Auch Institutionen haben Tage.)</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={reset} className="px-5 py-3 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 hover:bg-brand-cyan/25 font-bold">
            Nochmal
          </button>
          <a className="px-5 py-3 rounded-xl bg-black/30 border border-gray-700 hover:bg-black/40 font-bold" href="/copilot">
            Copilot
          </a>
        </div>
        <div className="mt-6 text-xs text-gray-500">{error?.message}</div>
      </div>
    </Container>
  )
}
