import { NextRequest, NextResponse } from "next/server";
import { buildKnowledgePrompt, estimateCost, normalizeProjectType } from "@/lib/ai-knowledge";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const HUGGING_FACE_MODEL = process.env.HUGGING_FACE_MODEL ?? "google/flan-t5-small";
const GPT4ALL_API_URL = process.env.GPT4ALL_API_URL;
const GPT4ALL_API_KEY = process.env.GPT4ALL_API_KEY;

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
  const lastUser = userMessages.slice().reverse().find((message: { role: string; content: string }) => message.role === "user");
  const userContent = lastUser?.content ?? "";

  const promptMessages = [
    { role: "system", content: buildSystemPrompt() + "\n\n" + buildKnowledgePrompt() },
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
    let answer: string | null = null;
    let shouldFallback = !OPENAI_API_KEY;

    if (OPENAI_API_KEY) {
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

      const text = await response.text();
      if (response.ok) {
        const data = JSON.parse(text);
        answer = data?.choices?.[0]?.message?.content ?? null;
      } else {
        shouldFallback = true;
      }
    }

    if (!answer && GPT4ALL_API_URL) {
      const promptText = `${buildSystemPrompt()}\n\n${buildKnowledgePrompt()}\n\nUser: ${userContent}`;
      const gpt4allResponse = await fetch(GPT4ALL_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(GPT4ALL_API_KEY ? { Authorization: `Bearer ${GPT4ALL_API_KEY}` } : {}),
        },
        body: JSON.stringify({ prompt: promptText, max_tokens: 200, temperature: 0.7 }),
      });

      if (gpt4allResponse.ok) {
        const data = await gpt4allResponse.json();
        answer = data?.text ?? data?.generated_text ?? null;
      }
    }

    if (!answer && HUGGING_FACE_API_KEY) {
      const hfPrompt = [
        { role: "system", content: buildSystemPrompt() + "\n\n" + buildKnowledgePrompt() },
        { role: "user", content: userContent },
      ];

      const hfResponse = await fetch(`https://api-inference.huggingface.co/v1/pipeline/text2text-generation/${HUGGING_FACE_MODEL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        },
        body: JSON.stringify({ inputs: `${hfPrompt.map((item) => item.content).join("\n")}`, parameters: { max_new_tokens: 200, temperature: 0.7 } }),
      });

      if (hfResponse.ok) {
        const data = await hfResponse.json();
        answer = Array.isArray(data) ? data[0]?.generated_text ?? null : null;
      }
    }

    return NextResponse.json({ answer: answer ?? createLocalResponse(userContent) });
  } catch (error) {
    return NextResponse.json({ answer: createLocalResponse(userContent) });
  }
}
