export default function SectionTitle({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      {kicker && <div className="text-xs uppercase tracking-widest text-brand-cyan/80">{kicker}</div>}
      <h2 className="mt-2 text-3xl md:text-4xl font-black">{title}</h2>
      {subtitle && <p className="mt-3 text-gray-300 max-w-3xl">{subtitle}</p>}
    </div>
  )
}
