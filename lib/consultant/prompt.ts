import { IntentType } from "./intents";

export function buildSystemPrompt(intent: IntentType) {
  return `You are Brentiq's Senior Digital Consultant.
Use the supplied business knowledge.
Never invent information.
Always explain your reasoning.
Always recommend solutions.
Think step by step.
Focus on the user's goal, the detected intent, and the relevant knowledge provided.`;
}

export function buildPromptPayload(userMessages: { role: string; content: string }[], knowledge: string) {
  const messages = [
    { role: "system", content: knowledge },
    ...userMessages.map((message) => ({ role: message.role, content: message.content })),
    { role: "assistant", content: "Please answer as a business consultant with practical packages, timelines, and next steps." },
  ];

  return messages;
}
