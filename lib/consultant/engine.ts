import { detectIntent } from "./intents";
import { selectKnowledgeFiles, getKnowledgeContent } from "./retrieval";
import { buildSystemPrompt, buildPromptPayload } from "./prompt";
import { estimateProject } from "./business";
import { buildProposal } from "./proposal";
import { searchWeb, shouldSearch } from "./internet";
import { generateGroqResponse, GroqMessage } from "@/lib/groq";

export async function runConsultation(userMessages: { role: string; content: string }[]) {
  const lastUser = userMessages.slice().reverse().find((message) => message.role === "user");
  const userText = lastUser?.content ?? "";
  const intent = detectIntent(userText);
  const knowledgeFiles = selectKnowledgeFiles(userText);
  const knowledge = await getKnowledgeContent(knowledgeFiles);

  let searchSection = "";
  if (shouldSearch(userText)) {
    const searchData = await searchWeb(userText);
    searchSection = `Market research:\n${searchData}`;
  }

  const systemPrompt = buildSystemPrompt(intent);
  const promptMessages = buildPromptPayload(userMessages, `${systemPrompt}\n\n${knowledge}\n\n${searchSection}`);

  const answer = await generateGroqResponse(promptMessages as GroqMessage[]);
  const estimate = estimateProject({ projectType: userText, hasAI: userText.includes("ai"), hasSEO: true, pageCount: 5 });
  const proposal = buildProposal({
    title: "Brentiq Project Summary",
    solution: answer ? `Consulting response for intent ${intent}` : "Business website and digital consulting package",
    features: ["Responsive design", "SEO optimization", "Lead capture", "Maintenance"],
    timeline: estimate.timeline,
    costRange: `KES ${estimate.estimatedRange.min} - KES ${estimate.estimatedRange.max}`,
    nextSteps: "Review the proposal, confirm the scope, and schedule a discovery call.",
  });

  return {
    intent,
    knowledgeFiles,
    search: searchSection,
    answer: answer ?? "I could not generate a Groq response at this time.",
    proposal,
  };
}
