import { NextRequest, NextResponse } from "next/server"
import { ruleBasedCopilot } from "@/lib/copilot"

type OpenAIChatResp = {
  choices?: Array<{ message?: { content?: string } }>
}

async function maybeLLM(prompt: string) {
  const key = process.env.OPENAI_API_KEY
  const base = process.env.OPENAI_BASE_URL || "https://api.openai.com"
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini"

  if (!key) return null

  // NOTE: optional / best-effort. If provider differs, set OPENAI_BASE_URL to an OpenAI-compatible endpoint.
  const res = await fetch(base.replace(/\/$/, "") + "/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: "Du bist ein präziser, sicherheitsfokussierter Ops-Copilot. Gib klare Schritte, keine Spekulationen." },
        { role: "user", content: prompt }
      ],
      temperature: 0.2
    })
  })

  if (!res.ok) return null
  const data = (await res.json()) as OpenAIChatResp
  const text = data.choices?.[0]?.message?.content?.trim()
  return text || null
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    const m = typeof message === "string" ? message : ""
    const rb = ruleBasedCopilot(m)

    // If LLM available, enrich response (still keep actions/followups from rule engine)
    const llm = await maybeLLM(
      `User message: ${m}\n\nAntwort als Runbook mit Prioritäten (kurz, klare bullets).`
    )

    return NextResponse.json({
      ...rb,
      reply: llm ? rb.reply + "\n\n---\n**LLM Ergänzung:**\n" + llm : rb.reply
    })
  } catch {
    return NextResponse.json(
      {
        reply: "Fehler im Copilot. Nutze Runbook/Tools.",
        followups: ["Ich glaube ich bin exposed", "Ich will WebSocket härten"],
        actions: [{ label: "Notfall-Runbook", href: "/security/notfall-leitfaden" }],
        confidence: "low"
      },
      { status: 200 }
    )
  }
}
