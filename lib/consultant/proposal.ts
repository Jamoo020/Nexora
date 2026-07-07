export function buildProposal(summary: {
  title: string;
  solution: string;
  features: string[];
  timeline: string;
  costRange: string;
  nextSteps: string;
}) {
  return `PROJECT SUMMARY\n
Recommended Solution: ${summary.solution}\n
Features Included:\n- ${summary.features.join("\n- ")}\n
Estimated Timeline: ${summary.timeline}\n
Estimated Cost: ${summary.costRange}\n
Optional Upgrades:\n- Proposal review\n- Ongoing maintenance\n- AI assistant\n
Next Steps:\n${summary.nextSteps}`;
}
