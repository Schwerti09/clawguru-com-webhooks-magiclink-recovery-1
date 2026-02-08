import type { Metadata } from "next"
import "./globals.css"
import TrustBadge from "@/components/layout/TrustBadge"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ActionDock from "@/components/layout/ActionDock"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://clawguru.com'),
  title: "ClawGuru | Institutional OpenClaw Security & Ops 2026",
  description:
    "ClawGuru: Copilot, Intel Feed, Academy, Vault und ein lebender Lagebericht für OpenClaw/Moltbot Security & Betrieb.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://clawguru.com",
    title: "ClawGuru | Institutional Ops Intelligence",
    description: "Konversation → Runbooks. Tools, Intel, Academy, Vault.",
    images: ["/og-image.png"]
  },
  twitter: { card: "summary_large_image", creator: "@clawguru" }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen">
        <TrustBadge />
        <Header />
        <main className="pt-28">{children}</main>
        <Footer />
        <ActionDock />
      </body>
    </html>
  )
}
