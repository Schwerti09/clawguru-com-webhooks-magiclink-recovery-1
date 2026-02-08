import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import AdminDashboard from "@/components/admin/AdminDashboard"
import { cookies } from "next/headers"
import { adminCookieName, verifyAdminToken } from "@/lib/admin-auth"
import { redirect } from "next/navigation"

export const runtime = "nodejs"

export const metadata = {
  title: "Admin Center | ClawGuru",
  description: "Admin Metrics & Control Center."
}

export default function AdminCenterPage() {
  const token = cookies().get(adminCookieName())?.value || ""
  const session = token ? verifyAdminToken(token) : null
  if (!session) redirect("/admin")

  return (
    <Container>
      <div className="py-16 max-w-6xl mx-auto">
        <SectionTitle
          kicker="Admin"
          title="Control Center"
          subtitle="Stripe, Health, Loop – in einem Blick."
        />
        <div className="mt-10">
          <AdminDashboard />
        </div>
      </div>
    </Container>
  )
}
