export type EstimateOptions = {
  projectType: string;
  hasAI?: boolean;
  hasSEO?: boolean;
  hasMaintenance?: boolean;
  pageCount?: number;
};

export function estimateProject(options: EstimateOptions) {
  const estimate = estimateWebsite(options);
  return {
    ...estimate,
    targetAudience: "Small and medium businesses in Kenya",
    recommendedUpgrades: getRecommendedUpgrades(options.projectType, options.hasAI, options.hasSEO),
  };
}

export function estimateWebsite(options: EstimateOptions) {
  const pageCount = options.pageCount ?? 1;
  const base = options.projectType.toLowerCase().includes("e-commerce") ? 180000 : options.projectType.toLowerCase().includes("landing") ? 25000 : 60000;
  const pageCost = pageCount <= 3 ? 15000 : pageCount <= 7 ? 12000 : 10000;
  const min = base + pageCost * pageCount;
  const max = min + 60000;
  const timeline = `${pageCount <= 3 ? 3 : pageCount <= 7 ? 5 : 7} to ${pageCount <= 3 ? 5 : pageCount <= 7 ? 7 : 10} weeks`;
  return {
    package: options.projectType,
    estimatedRange: { min, max },
    timeline,
  };
}

function getRecommendedUpgrades(projectType: string, hasAI?: boolean, hasSEO?: boolean) {
  const upgrades = ["Responsive Design", "SEO Optimization", "Maintenance"];
  if (projectType.toLowerCase().includes("e-commerce")) upgrades.push("Payment Gateway", "Product Management");
  if (hasAI) upgrades.push("AI Assistant");
  if (hasSEO) upgrades.push("SEO Growth Plan");
  return upgrades;
}
