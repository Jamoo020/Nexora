import { NextRequest, NextResponse } from "next/server";
import { runConsultation } from "@/lib/consultant/engine";

function createLocalResponse(userText: string) {
  const normalized = userText.trim().toLowerCase();
  if (normalized.includes("cost") || normalized.includes("price")) {
    return "🚨 LOCAL FALLBACK ACTIVATED - A standard business website package starts from KES 60,000 and can go up to KES 120,000 depending on scope. For e-commerce or AI, expect a higher range with an estimate based on features.";
  }
  if (normalized.includes("website") || normalized.includes("site")) {
    return "🚨 LOCAL FALLBACK ACTIVATED - Brentiq builds premium websites, e-commerce stores, and digital platforms. A basic business website typically takes 3 to 5 weeks.";
  }
  if (normalized.includes("automation") || normalized.includes("chatbot") || normalized.includes("ai")) {
    return "🚨 LOCAL FALLBACK ACTIVATED - AI and automation solutions help capture leads, manage WhatsApp workflows, and improve customer response times. Tell me the business process you want to improve.";
  }
  return "🚨 LOCAL FALLBACK ACTIVATED - Please share more about your business goals, project type, and required features so I can recommend the right package and timeline.";
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || !body.messages) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const userMessages = body.messages.map((message: any) => ({ role: message.role, content: message.text }));
  const lastUser = userMessages.slice().reverse().find((message: { role: string; content: string }) => message.role === "user");
  const userContent = lastUser?.content ?? "";

  try {
    const result = await runConsultation(userMessages);
    return NextResponse.json({ answer: result.answer, proposal: result.proposal, intent: result.intent, knowledgeFiles: result.knowledgeFiles, search: result.search });
  } catch (error) {
    console.error("Consultant route error", error);
    return NextResponse.json({ answer: createLocalResponse(userContent) });
  }
}
