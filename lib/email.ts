type SendArgs = {
  to: string
  subject: string
  html: string
  replyTo?: string
}

function requiredEnv(name: string) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing ${name}`)
  return v
}

export async function sendEmail(args: SendArgs) {
  const provider = (process.env.EMAIL_PROVIDER || "resend").toLowerCase()

  if (provider === "resend") {
    const apiKey = requiredEnv("RESEND_API_KEY")
    const from = requiredEnv("EMAIL_FROM")

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: args.to,
        subject: args.subject,
        html: args.html,
        reply_to: args.replyTo || process.env.EMAIL_REPLY_TO || undefined
      })
    })

    if (!res.ok) {
      const t = await res.text().catch(() => "")
      throw new Error(`Email send failed (${res.status}): ${t}`)
    }
    return
  }

  // Default: Resend only (keep deps minimal & deploy-safe)
  throw new Error(`Unsupported EMAIL_PROVIDER: ${provider}`)
}
