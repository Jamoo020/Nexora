export const aiKnowledge = {
  company: {
    name: "Nexora",
    mission: "Help Kenyan companies grow with premium digital experiences, intelligent automation, and reliable technology systems.",
    vision: "To be the trusted technology partner for ambitious businesses across Kenya and East Africa.",
    values: ["Professionalism", "Transparency", "Performance", "Customer focus", "Practical innovation"],
    contact: {
      email: "info@nexora.co.ke",
      phone: "0115568737",
      address: "Mombasa, Kenya",
      officeHours: "Monday to Friday, 9 AM – 6 PM EAT",
    },
  },
  services: [
    {
      key: "landing-page",
      title: "Landing Page",
      summary: "A focused, high-converting page that presents one service or offer and captures leads quickly.",
      details: ["Fast launch", "Clear call to action", "Lead capture forms"],
    },
    {
      key: "business-website",
      title: "Business Website",
      summary: "A polished website for service brands, consultancies, and professional companies in Kenya.",
      details: ["Multiple pages", "SEO foundation", "Responsive design"],
    },
    {
      key: "corporate-website",
      title: "Corporate Website",
      summary: "A premium corporate website designed to build trust, showcase work, and support enterprise sales.",
      details: ["Brand storytelling", "Case studies", "Content strategy"],
    },
    {
      key: "e-commerce",
      title: "E-commerce",
      summary: "A modern online store built for conversions, mobile buyers, and secure payments.",
      details: ["Product catalog", "Checkout flow", "Payment gateway"],
    },
    {
      key: "web-application",
      title: "Web Application",
      summary: "A custom platform for workflows, dashboards, customer portals, and business operations.",
      details: ["User roles", "Secure APIs", "Scalable architecture"],
    },
    {
      key: "enterprise-software",
      title: "Enterprise Software",
      summary: "A tailored software system for complex organizations and large-scale operations.",
      details: ["Custom integrations", "Advanced security", "Dedicated support"],
    },
    {
      key: "ai-solution",
      title: "AI Solution",
      summary: "AI features that help automate decisions, support users, and enhance digital products.",
      details: ["Chat assistants", "Content automation", "Data-driven workflows"],
    },
    {
      key: "automation",
      title: "Automation",
      summary: "Automate repetitive tasks to save time, reduce error, and improve service delivery.",
      details: ["Workflow automation", "Notifications", "System integrations"],
    },
    {
      key: "seo",
      title: "SEO",
      summary: "Improve search visibility, organic traffic, and lead capture for local Kenyan audiences.",
      details: ["Technical SEO", "Keywords", "Performance"],
    },
    {
      key: "ui-ux-design",
      title: "UI/UX Design",
      summary: "Design systems and interfaces that feel premium, intuitive, and conversion-focused.",
      details: ["User journeys", "Brand consistency", "Interaction polish"],
    },
  ],
  industries: [
    { slug: "construction", label: "Construction", recommendation: ["Corporate Website", "Project Gallery", "Quote System", "SEO", "CRM"] },
    { slug: "real-estate", label: "Real Estate", recommendation: ["Property Listings", "CRM", "Booking System", "Payment Integration"] },
    { slug: "healthcare", label: "Healthcare", recommendation: ["Patient Portal", "Booking System", "Secure Forms", "Analytics"] },
    { slug: "education", label: "Education", recommendation: ["Student Portal", "Admission System", "CMS", "Parent Dashboard"] },
    { slug: "hospitality", label: "Hospitality", recommendation: ["Online Ordering", "Booking", "Delivery Integration", "Menu CMS"] },
    { slug: "fintech", label: "Fintech", recommendation: ["Secure Platform", "Payment Integration", "Mobile Support", "Analytics"] },
  ],
  pricing: {
    "landing-page": { min: 25000, max: 50000, label: "Landing Page", package: "Starter" },
    "business-website": { min: 60000, max: 120000, label: "Business Website", package: "Growth" },
    "corporate-website": { min: 120000, max: 300000, label: "Corporate Website", package: "Premium" },
    "e-commerce": { min: 180000, max: 500000, label: "E-commerce", package: "Commerce" },
    "web-application": { min: 250000, max: 450000, label: "Web Application", package: "Platform" },
    "enterprise-software": { min: 500000, max: 999999, label: "Enterprise Software", package: "Enterprise" },
    "ai-solution": { min: 100000, max: 250000, label: "AI Solution", package: "AI" },
  },
  faqs: [
    { question: "How much does a website cost?", answer: "Most website projects start from KES 60,000 and depend on pages, features, and integrations." },
    { question: "How long does development take?", answer: "Typical timelines range from 4 to 12 weeks depending on scope, complexity, and approvals." },
    { question: "Do you build mobile apps?", answer: "Yes. We build native-like mobile experiences, progressive web apps, and companion apps for web platforms." },
    { question: "Can you redesign my website?", answer: "Yes. We can redesign your existing site to improve conversion, speed, and brand presence." },
    { question: "Do you offer hosting?", answer: "Yes. We offer hosting, maintenance, backups, and performance monitoring as part of ongoing support." },
    { question: "Can you build AI systems?", answer: "Yes. We can add AI chat assistants, automation workflows, smart dashboards, and custom intelligence to your product." },
    { question: "How does payment work?", answer: "We typically start with a scoped proposal, then agree a phased payment plan tied to delivery milestones." },
    { question: "How do revisions work?", answer: "We include a planned revision cycle, then handle further changes with clear change-control pricing." },
    { question: "Can I update my website myself?", answer: "Yes. We can deliver your site with an editor-friendly CMS so your team can update content independently." },
    { question: "How does SEO work?", answer: "SEO is a combination of technical setup, content strategy, and performance optimization to help your site rank better." },
    { question: "Do you provide maintenance?", answer: "Yes. Maintenance, support, and security updates are available as ongoing packages." },
  ],
};

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
  const match = aiKnowledge.industries.find((item) => industry.toLowerCase().includes(item.slug) || industry.toLowerCase().includes(item.label.toLowerCase()));
  return match?.recommendation ?? ["Business Website", "SEO", "Automation", "Hosting"];
}
