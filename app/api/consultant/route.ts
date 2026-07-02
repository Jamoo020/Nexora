import { NextRequest, NextResponse } from "next/server";
import { aiKnowledge, estimateCost, normalizeProjectType, recommendForIndustry } from "@/lib/ai-knowledge";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

function buildSystemPrompt() {
  return `You are Nexora's AI Digital Consultant. You must answer as an experienced Kenyan technology consultant working for Nexora. Use a professional, friendly, knowledgeable, patient, and consultative tone. Never answer like a generic AI. Focus on Nexora's services, pricing rules, packages, and practical recommendations. If the user asks for pricing, always provide a rough range with disclaimers. If the user asks for timelines or complex scope, recommend a consultation. Use company knowledge only from the Nexora knowledge base.`;
}

function buildKnowledgeSummary() {
  return `Nexora is a Kenya-based digital consultancy focused on premium websites, web applications, AI solutions, automation, SEO, cloud infrastructure, and ongoing maintenance. Key services include landing pages, business websites, corporate websites, e-commerce, web applications, enterprise software, AI chatbots, automation, CRM, ERP, dashboards, mobile apps, cloud infrastructure, hosting, maintenance, SEO, UI/UX design, and digital consulting. Pricing ranges include: Landing Page KES 25,000-50,000; Business Website KES 60,000-120,000; Corporate Website KES 120,000-300,000; E-commerce KES 180,000-500,000; Web Application starts from KES 250,000; Enterprise Software is custom. Always qualify leads, collect contact info naturally, and hand off complex or enterprise-level requests to the Nexora team.`;
}

function createLocalResponse(userText: string) {
  const text = userText.toLowerCase();
  if (text.includes("cost") || text.includes("price") || text.includes("estimate")) {
    return "I can help with a very rough price range based on your project type, industry, AI needs, SEO, and maintenance. Please tell me more about the service you need and any key features.";
  }
  if (text.includes("website") || text.includes("site")) {
    return "Nexora builds premium websites, corporate websites, e-commerce stores, and business sites for Kenyan companies. We focus on performance, SEO, mobile-first design, and strong conversion.";
  }
  if (text.includes("ai") || text.includes("chatbot") || text.includes("automation")) {
    return "We can add AI chat assistants, intelligent workflows, and automation features that capture leads and improve customer experience. Tell me what business process you want to improve.";
  }
  if (text.includes("timeline") || text.includes("launch")) {
    return "Most website projects take 4-8 weeks. Custom platforms and integrations usually need 8-14 weeks depending on scope and approvals.";
  }
  return "Please share more about your project, business goals, and required features. I can recommend the best services and estimate a rough range.";
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || !body.messages) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const userMessages = body.messages.map((message: any) => ({ role: message.role, content: message.text }));
  const leadInfo = body.leadInfo;

  if (!OPENAI_API_KEY) {
    const lastUser = userMessages.reverse().find((message: { role: string; content: string }) => message.role === "user");
    return NextResponse.json({ answer: createLocalResponse(lastUser?.content ?? "") });
  }

  const promptMessages = [
    { role: "system", content: buildSystemPrompt() + " " + buildKnowledgeSummary() },
    ...userMessages,
  ];

  if (leadInfo && leadInfo.projectType) {
    const estimate = estimateCost({ projectType: leadInfo.projectType, hasAI: leadInfo.projectType.toLowerCase().includes("ai"), hasSEO: true, hasMaintenance: true });
    promptMessages.push({
      role: "system",
      content: `Lead details: ${JSON.stringify(leadInfo)}. Use this to refine recommendations and cost guidance. Estimated package: ${estimate.package}, price range: KES ${estimate.estimatedRange.min} to KES ${estimate.estimatedRange.max}, timeline: ${estimate.timeline}.`,
    });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: promptMessages,
        temperature: 0.6,
        max_tokens: 450,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return NextResponse.json({ error: `OpenAI request failed: ${errorBody}` }, { status: 500 });
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content ?? "I’m sorry, I couldn’t generate a response right now.";
    return NextResponse.json({ answer });
  } catch (error) {
    return NextResponse.json({ error: "Unable to reach AI service." }, { status: 500 });
  }
}
