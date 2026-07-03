import { NextRequest, NextResponse } from "next/server";
import { buildKnowledgePrompt, estimateCost, normalizeProjectType } from "@/lib/ai-knowledge";
import { generateGroqResponse, GroqMessage } from "@/lib/groq";

function buildSystemPrompt() {
  return `You are Nexora's AI Digital Consultant. You must answer as an experienced Kenyan technology consultant working for Nexora. Use a professional, friendly, knowledgeable, patient, and consultative tone. Never answer like a generic AI. Focus on Nexora's services, pricing rules, packages, and practical recommendations. If the user asks for pricing, always provide a rough range with disclaimers. If the user asks for timelines or complex scope, recommend a consultation. Use company knowledge only from the Nexora knowledge base.`;
}

function createLocalResponse(userText: string) {
  const normalized = userText.trim().toLowerCase();
  const projectType = inferProjectType(normalized);
  const industry = inferIndustry(normalized);
  const pageCount = inferPageCount(normalized);
  const features = inferFeatures(normalized);
  const timeline = inferTimeline(pageCount, features);
  const priceRange = inferPriceRange(projectType, features);

  const featureList = features.length > 0 ? `Features include: ${features.join(", ")}.` : "";
  const industryText = industry ? `${industry} sector` : "a professional services or business sector";

  return `🚨 LOCAL FALLBACK ACTIVATED - Based on your request, I recommend a ${projectType} for the ${industryText}. ${featureList} Estimated timeline: ${timeline}. Estimated cost range: ${priceRange}. A senior consultant would also recommend responsive design, SEO, lead capture, and future-ready automation where appropriate.`;
}

function inferProjectType(text: string) {
  if (text.includes("construction") || text.includes("building") || text.includes("contractor") || text.includes("developer")) {
    return "Construction Website";
  }
  if (text.includes("e-commerce") || text.includes("shop") || text.includes("store") || text.includes("catalog")) {
    return "E-commerce Website";
  }
  if (text.includes("portal") || text.includes("dashboard") || text.includes("crm") || text.includes("system")) {
    return "Business Platform";
  }
  return text.includes("landing") ? "Landing Page" : "Business Website";
}

function inferIndustry(text: string) {
  const industries = [
    { keyword: "construction", label: "construction" },
    { keyword: "real estate", label: "real estate" },
    { keyword: "health", label: "healthcare" },
    { keyword: "school", label: "education" },
    { keyword: "hotel", label: "hospitality" },
    { keyword: "finance", label: "fintech" },
  ];
  return industries.find((item) => text.includes(item.keyword))?.label ?? "general business";
}

function inferPageCount(text: string) {
  const match = text.match(/(\d+)\s*(page|pages|screen|screens)/);
  return match ? Number(match[1]) : 1;
}

function inferFeatures(text: string) {
  const features: string[] = [];
  if (text.includes("contact")) features.push("Contact Form");
  if (text.includes("gallery") || text.includes("portfolio")) features.push("Project Gallery");
  if (text.includes("seo") || text.includes("search engine")) features.push("SEO Optimization");
  if (text.includes("whatsapp")) features.push("WhatsApp Integration");
  if (text.includes("booking") || text.includes("appointment")) features.push("Booking System");
  if (text.includes("login") || text.includes("user") || text.includes("dashboard")) features.push("User Portal");
  if (text.includes("payment") || text.includes("checkout") || text.includes("shop")) features.push("Online Payments");
  if (text.includes("analytics") || text.includes("tracking")) features.push("Analytics");
  if (features.length === 0) features.push("Responsive Design", "Lead Capture", "Performance Optimization");
  return features;
}

function inferTimeline(pageCount: number, features: string[]) {
  const baseWeeks = pageCount <= 3 ? 4 : pageCount <= 7 ? 6 : 8;
  const extra = features.includes("Online Payments") || features.includes("User Portal") ? 2 : 0;
  return `${baseWeeks + extra} to ${baseWeeks + extra + 2} weeks`;
}

function inferPriceRange(projectType: string, features: string[]) {
  const base = projectType.includes("E-commerce") ? 200000 : projectType.includes("Landing") ? 35000 : projectType.includes("Business") ? 80000 : 120000;
  const extra = features.includes("Online Payments") || features.includes("User Portal") ? 40000 : 15000;
  return `KES ${base + extra} - KES ${base + extra + 60000}`;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || !body.messages) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const userMessages = body.messages.map((message: any) => ({ role: message.role, content: message.text }));
  const leadInfo = body.leadInfo;
  const lastUser = userMessages.slice().reverse().find((message: { role: string; content: string }) => message.role === "user");
  const userContent = lastUser?.content ?? "";

  if (leadInfo && leadInfo.projectType) {
    const estimate = estimateCost({ projectType: leadInfo.projectType, hasAI: leadInfo.projectType.toLowerCase().includes("ai"), hasSEO: true, hasMaintenance: true });
    userMessages.push({
      role: "system",
      content: `Lead details: ${JSON.stringify(leadInfo)}. Use this to refine recommendations and cost guidance. Estimated package: ${estimate.package}, price range: KES ${estimate.estimatedRange.min} to KES ${estimate.estimatedRange.max}, timeline: ${estimate.timeline}.`,
    });
  }

  try {
    const groqMessages: GroqMessage[] = [
      { role: "system", content: buildSystemPrompt() + "\n\n" + buildKnowledgePrompt() },
      ...userMessages,
    ];

    const answer = await generateGroqResponse(groqMessages);
    return NextResponse.json({ answer: answer ?? createLocalResponse(userContent) });
  } catch (error) {
    console.error("Consultant route error", error);
    return NextResponse.json({ answer: createLocalResponse(userContent) });
  }
}
