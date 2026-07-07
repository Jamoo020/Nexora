import fs from "fs";
import path from "path";

const dataRoot = path.join(process.cwd(), "data");

export async function getKnowledgeContent(keys: string[]) {
  const contents: string[] = [];

  for (const key of keys) {
    const filename = key.endsWith(".md") ? key : `${key}.md`;
    const filePath = path.join(dataRoot, filename);
    if (fs.existsSync(filePath)) {
      contents.push(await fs.promises.readFile(filePath, "utf-8"));
    }
  }

  return contents.join("\n\n");
}

export function selectKnowledgeFiles(intent: string) {
  const normalized = intent.toLowerCase();

  if (normalized.includes("construction")) {
    return ["company", "industries/construction", "pricing", "websites", "services", "case-studies/construction"];
  }
  if (normalized.includes("health") || normalized.includes("hospital")) {
    return ["company", "industries/healthcare", "pricing", "ai", "automation", "case-studies/hospital"];
  }
  if (normalized.includes("education") || normalized.includes("school")) {
    return ["company", "industries/education", "pricing", "websites", "services", "case-studies/school"];
  }
  if (normalized.includes("logistics") || normalized.includes("warehouse")) {
    return ["company", "industries/logistics", "pricing", "automation", "services", "case-studies/logistics"];
  }
  if (normalized.includes("hotel") || normalized.includes("hospitality")) {
    return ["company", "industries/hotels", "pricing", "websites", "services", "case-studies/hotel"];
  }
  if (normalized.includes("ai") || normalized.includes("automation")) {
    return ["company", "ai", "automation", "services", "pricing", "faqs"];
  }
  if (normalized.includes("seo")) {
    return ["company", "seo", "services", "pricing", "faqs"];
  }
  if (normalized.includes("website") || normalized.includes("web")) {
    return ["company", "websites", "pricing", "services", "faqs", "case-studies/construction"];
  }
  if (normalized.includes("proposal") || normalized.includes("summary")) {
    return ["company", "pricing", "services", "faqs", "case-studies/construction"];
  }

  return ["company", "pricing", "services", "industries/general", "faqs", "case-studies/construction"];
}
