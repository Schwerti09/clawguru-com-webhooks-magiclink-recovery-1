import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import AdminLogin from "@/components/admin/AdminLogin"

export const metadata = {
  title: "Admin Login | ClawGuru",
  description: "Admin Control Center Login."
}

export default function AdminPage() {
  return (
    <Container>
      <div className="py-16 max-w-4xl mx-auto">
        <SectionTitle
          kicker="Admin"
          title="Control Center"
          subtitle="Metrics, Stripe, Health, Ops – ohne die Seite anzufassen."
        />
        <div className="mt-10 grid lg:grid-cols-2 gap-6 items-start">
          <AdminLogin />
          <div className="rounded-3xl border border-gray-800 bg-black/25 p-6 text-gray-300">
            <div className="font-black text-lg">Sicherheit</div>
            <ul className="mt-3 text-sm text-gray-300 space-y-2">
              <li>• Setze Admin-Creds nur als ENV (Netlify/Vercel).</li>
              <li>• Kein Passwort im Code, kein Commit, kein Screenshot ins Internet.</li>
              <li>• Admin-Session ist HttpOnly Cookie + HMAC Signatur.</li>
              <li>• Optional: zusätzlich Netlify Site Password / Basic Auth vor Admin setzen.</li>
            </ul>
            <div className="mt-6 text-sm text-gray-400">
              ENV benötigt: <code className="text-gray-200">ADMIN_USERNAME</code>, <code className="text-gray-200">ADMIN_PASSWORD</code>,{" "}
              <code className="text-gray-200">ADMIN_SESSION_SECRET</code>.
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
