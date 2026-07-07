import { knowledge } from "./knowledge";

export const aiKnowledge = {
  ...knowledge,
  pricing: {
    "landing-page": { min: 25000, max: 50000, label: "Landing Page", package: "Starter" },
    "business-website": { min: 60000, max: 120000, label: "Business Website", package: "Growth" },
    "corporate-website": { min: 120000, max: 300000, label: "Corporate Website", package: "Premium" },
    "e-commerce": { min: 180000, max: 500000, label: "E-commerce", package: "Commerce" },
    "web-application": { min: 250000, max: 450000, label: "Web Application", package: "Platform" },
    "enterprise-software": { min: 500000, max: 999999, label: "Enterprise Software", package: "Enterprise" },
    "ai-solution": { min: 100000, max: 250000, label: "AI Solution", package: "AI" },
  },
};

export function buildKnowledgePrompt() {
  return [`Company Identity:`,
    aiKnowledge.company.identity,
    aiKnowledge.company.mission,
    aiKnowledge.company.positioning,
    aiKnowledge.company.philosophy,
    "",
    `Industries Brentiq serves: ${aiKnowledge.industries.join(", ")}`,
    "",
    `Primary business goals Brentiq solves: ${aiKnowledge.businessGoals.join(", ")}`,
    "",
    `Services offered: ${aiKnowledge.services.join(", ")}`,
    "",
    `Feature capabilities: ${aiKnowledge.features.join(", ")}`,
    "",
    `Technologies and platforms: ${aiKnowledge.technologies.join(", ")}`,
    "",
    `Pricing philosophy: ${aiKnowledge.pricingPrinciples.join("; ")}`,
    "",
    `Consultation rules: ${aiKnowledge.consultationRules.join("; ")}`,
    "",
    `Frequently asked questions: ${aiKnowledge.faqs.join("; ")}`,
    "",
    `Case studies summary: ${aiKnowledge.caseStudies.map((item) => `${item.industry} problem: ${item.problem} solution: ${item.solution} outcome: ${item.outcome}`).join(" | ")}`,
  ].join("\n");
}

export function normalizeProjectType(value: string) {
  const normalized = value.toLowerCase();
  if (normalized.includes("landing")) return "landing-page";
  if (normalized.includes("business")) return "business-website";
  if (normalized.includes("corporate")) return "corporate-website";
  if (normalized.includes("e-commerce") || normalized.includes("commerce") || normalized.includes("shop")) return "e-commerce";
  if (normalized.includes("web app") || normalized.includes("application") || normalized.includes("platform")) return "web-application";
  if (normalized.includes("enterprise") || normalized.includes("custom software")) return "enterprise-software";
  if (normalized.includes("ai")) return "ai-solution";
  return "business-website";
}

export function estimateCost(options: { projectType: string; hasAI?: boolean; hasSEO?: boolean; hasMaintenance?: boolean }) {
  const projectType = normalizeProjectType(options.projectType);
  const rule = aiKnowledge.pricing[projectType] ?? aiKnowledge.pricing["business-website"];
  const extraMin = (options.hasAI ? 15000 : 0) + (options.hasSEO ? 8000 : 0) + (options.hasMaintenance ? 5000 : 0);
  const extraMax = (options.hasAI ? 25000 : 0) + (options.hasSEO ? 15000 : 0) + (options.hasMaintenance ? 10000 : 0);
  return {
    projectType: rule.label,
    estimatedRange: { min: rule.min + extraMin, max: rule.max + extraMax },
    package: rule.package,
    recommendedTechnologies: ["Next.js", "React", "Tailwind CSS", "Cloud Hosting"],
    timeline: "4-12 weeks depending on scope and approvals",
  };
}

export function recommendForIndustry(industry: string) {
  const match = aiKnowledge.industryRecommendations.find((item) => industry.toLowerCase().includes(item.slug) || industry.toLowerCase().includes(item.label.toLowerCase()));
  return match?.recommendation ?? ["Business Website", "SEO", "Automation", "Hosting"];
}
