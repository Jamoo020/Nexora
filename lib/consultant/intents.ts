export type IntentType =
  | "website-quote"
  | "automation"
  | "consultation"
  | "industry-advice"
  | "pricing"
  | "proposal"
  | "general";

const intentMap: Record<string, IntentType> = {
  website: "website-quote",
  quote: "website-quote",
  estimate: "pricing",
  pricing: "pricing",
  cost: "pricing",
  automate: "automation",
  automation: "automation",
  whatsapp: "automation",
  chatbot: "automation",
  compare: "consultation",
  vs: "consultation",
  advice: "industry-advice",
  "what should": "industry-advice",
  "how to": "consultation",
};

export function detectIntent(text: string): IntentType {
  const normalized = text.trim().toLowerCase();
  for (const key of Object.keys(intentMap)) {
    if (normalized.includes(key)) {
      return intentMap[key];
    }
  }
  return "general";
}
