import Container from "@/components/shared/Container"

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    className="px-3 py-2 rounded-xl hover:bg-gray-900/60 transition-colors text-sm"
  >
    {label}
  </a>
)

export default function Header() {
  return (
    <div className="fixed top-10 left-0 right-0 z-40">
      <Container>
        <div className="flex items-center justify-between border border-gray-800 bg-gray-950/70 backdrop-blur rounded-2xl px-4 py-3 shadow-glow">
          <a href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-brand-cyan to-brand-violet shadow-glow2" />
            <div className="leading-tight">
              <div className="font-black">ClawGuru</div>
              <div className="text-xs text-gray-400">Institutional Ops Intelligence</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            <NavLink href="/live" label="Live" />
            <NavLink href="/check" label="Security-Check" />
            <NavLink href="/copilot" label="Copilot" />
            <NavLink href="/runbooks" label="Runbooks" />
            <NavLink href="/tags" label="Tags" />
            <NavLink href="/intel" label="Intel Feed" />
            <NavLink href="/academy" label="Academy" />
            <NavLink href="/openclaw-security-2026" label="Lagebericht" />
            <NavLink href="/vault" label="Vault" />
            <NavLink href="/hosting-kosten" label="Kosten" />
            <NavLink href="/pricing" label="Pricing" />
            <NavLink href="/downloads" label="Downloads" />
            <NavLink href="/case-studies" label="Cases" />
            <NavLink href="/ueber-uns" label="Über uns" />
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/security/notfall-leitfaden"
              className="px-3 py-2 rounded-xl bg-brand-red/90 hover:bg-brand-red font-black text-sm"
            >
              Notfall
            </a>
            <a
              href="/pricing"
              className="px-3 py-2 rounded-xl bg-brand-cyan/15 hover:bg-brand-cyan/25 border border-brand-cyan/30 font-bold text-sm"
            >
              Pro Kits
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}
