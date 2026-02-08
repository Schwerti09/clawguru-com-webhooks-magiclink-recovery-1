export const BRAND = {
  name: "ClawGuru",
  domain: "clawguru.com",
  twitter: "@clawguru"
}

export const SECURITY_STATS = {
  exposedInstances: 21639,
  bypassRate: 93.4,
  checksTotal: 128457,
  checksToday: 912,
  lastUpdated: "Feb 2026"
}

export const AFFILIATE_LINKS = {
  HETZNER: "https://hetzner.cloud/?ref=clawguru_pro",
  DIGITALOCEAN: "https://m.do.co/c/clawguru_vip",
  AWS: "https://aws.amazon.com/campaigns/startups/?ref=clawguru_aws",
  CLOUDFLARE: "https://cloudflare.com?ref=clawguru_cdn",
  ONEPASSWORD: "https://1password.com?ref=clawguru_pass",
  TAILSCALE: "https://tailscale.com?ref=clawguru_vpn",
  CLAWSYNDICATE: "https://clawsyndicate.com?ref=clawguru_main"
}

export const HOSTING_PROVIDERS = [
  {
    name: "Hetzner Cloud",
    badge: "BESTSELLER",
    price: "€4.51/Monat",
    specs: "2 vCPU · 4 GB RAM · 40 GB SSD",
    bestFor: "EU-Daten & Preis/Leistung",
    commission: "Bis zu €100 pro Kunde",
    url: AFFILIATE_LINKS.HETZNER
  },
  {
    name: "DigitalOcean",
    badge: "EINFACH",
    price: "€6.00/Monat",
    specs: "1 vCPU · 1 GB RAM · 25 GB SSD",
    bestFor: "Einsteiger & Docs",
    commission: "$25 pro Qualified Signup",
    url: AFFILIATE_LINKS.DIGITALOCEAN
  },
  {
    name: "AWS Lightsail",
    badge: "ENTERPRISE",
    price: "€3.50/Monat",
    specs: "512 MB RAM · 20 GB SSD",
    bestFor: "AWS-Teams",
    commission: "Bis zu $1000 Credits",
    url: AFFILIATE_LINKS.AWS
  }
]

export const LEGAL_INFO = {
  company: "Wissens-Bank",
  owner: "Rolf Schwertfechter",
  address: "Karklandsweg 1",
  city: "26553 Dornum",
  email: "rps-vertrieb@t-online.de",
  taxNote: "Steuerangaben auf Anfrage"
}
export const COMMUNITY = {
  discordInvite: "https://discord.gg/your-invite",
  newsletterSignup: "/copilot" // placeholder: route for now
}

export const SERVICE = {
  managedName: "ClawSyndicate Managed OpenClaw",
  managedFromPrice: "149€/Monat",
  managedHref: "https://clawsyndicate.com/checkout?plan=managed&ref=clawguru"
}


export const AFFILIATE_REDIRECTS: Record<string, string> = {
  hetzner: AFFILIATE_LINKS.HETZNER,
  do: AFFILIATE_LINKS.DIGITALOCEAN,
  aws: AFFILIATE_LINKS.AWS,
  cloudflare: AFFILIATE_LINKS.CLOUDFLARE,
  password: AFFILIATE_LINKS.ONEPASSWORD,
  tailscale: AFFILIATE_LINKS.TAILSCALE
}

const SPRINT_URL = process.env.NEXT_PUBLIC_PRODUCT_CHECKOUT_URL_SPRINT || "/downloads"
const INCIDENT_URL = process.env.NEXT_PUBLIC_PRODUCT_CHECKOUT_URL_INCIDENT || "/downloads"

export const PRODUCTS = {
  launchPack: {
    title: "ClawGuru Launch Pack (PDF)",
    description:
      "Die komplette Einkaufsliste + Templates: Affiliate, Payment/Delivery, Tracking & Trust – damit ClawGuru 'scharf' ist.",
    downloadUrl: "/downloads/clawguru-launch-pack.pdf",
    bullets: [
      "Setup-Einkaufsliste (Accounts, Keys, Tools)",
      "Monetarisierungs-Stack (Affiliate + Downloads + Managed)",
      "Tracking/Event-Schema für Funnels & Optimierung",
      "Affiliate Redirect Map (/go/*) + UTM-Standard",
      "Copy/CTA Snippets + Legal/Trust Bausteine",
      "Environment Variables: was wohin kommt"
    ]
  },
  sprintPack: {
    title: "Hardening Sprint Pack",
    price: "€19",
    description:
      "30–60 Minuten Hardening, Copy/Paste Templates, Checkliste, Baselines. Outcome statt Theorie.",
    checkoutUrl: SPRINT_URL
  },
  incidentKit: {
    title: "Incident Kit Pro",
    price: "€79",
    description:
      "Wenn es brennt: Key-Rotation, Firewall-Baselines, Cloudflare-WAF, Monitoring – als ZIP mit Runbook.",
    checkoutUrl: INCIDENT_URL
  },
  quickLinks: [
    { title: "Security-Check", desc: "Score ziehen, Risiko sehen, nächste Schritte.", href: "/check" },
    { title: "Notfall-Leitfaden", desc: "Wenn Keys geleakt sind: Schritt-für-Schritt.", href: "/security/notfall-leitfaden" },
    { title: "Hosting-Kosten", desc: "Provider-Vergleich + Empfehlungen.", href: "/hosting-kosten" },
    { title: "Vault", desc: "Runbooks & Ops Blueprints.", href: "/vault" },
    { title: "Copilot", desc: "Ask Copilot für konkrete Runbooks.", href: "/copilot" },
    { title: "Mission Control", desc: "Die operative Sicht auf das System.", href: "/mission-control" }
  ]
} as const
