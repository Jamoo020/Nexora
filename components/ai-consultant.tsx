"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { estimateCost } from "@/lib/ai-knowledge";

const suggestedQuestions = [
  "Can you review my project idea?",
  "How much does a company website cost?",
  "I need an AI assistant for my business.",
  "What service fits a construction company?",
  "How long does a website take?",
];

type ChatMessage = { role: "assistant" | "user"; text: string };

type LeadInfo = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  industry: string;
  budget: string;
  timeline: string;
  notes: string;
};

const defaultLeadInfo: LeadInfo = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  industry: "",
  budget: "",
  timeline: "",
  notes: "",
};

function getResponse(message: string) {
  const text = message.toLowerCase();

  if (text.includes("cost") || text.includes("price")) {
    return "I can estimate your project cost based on your chosen service, industry, AI features, SEO, and support needs. Tell me what you want to build, and I’ll give you a rough range.";
  }

  if (text.includes("ai assistant") || text.includes("chatbot") || text.includes("automation")) {
    return "We can build an AI consultant, chatbot, or automation system that captures leads, answers customer questions, and supports your business workflows. Let me know which business process you want to improve.";
  }

  if (text.includes("website") || text.includes("site")) {
    return "Brentiq builds premium websites, corporate sites, and landing pages tailored to your business. We focus on performance, SEO, and conversion for the Kenyan market.";
  }

  if (text.includes("timeline") || text.includes("launch")) {
    return "Project timelines depend on scope and approvals. Most websites launch in 4-8 weeks, while custom platforms take 8-14 weeks with proper planning.";
  }

  return "Tell me more about your goals, industry, and what you need. I can recommend the right solution, estimate a range, and help you prepare a clear proposal.";
}

export function AiConsultant() {
  const [open, setOpen] = useState(false);
  const [leadInfo, setLeadInfo] = useState<LeadInfo>(defaultLeadInfo);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", text: "Hello, I’m Brentiq’s AI Digital Consultant. Tell me about your project or ask how we can help your business." },
  ]);
  const [input, setInput] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchSummary, setSearchSummary] = useState("");
  const [proposalSummary, setProposalSummary] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const openConsultant = () => setOpen(true);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("brentiq-ai-consultant-open", handleOpen);
    return () => window.removeEventListener("brentiq-ai-consultant-open", handleOpen);
  }, []);

  const sendMessage = async (text: string) => {
    const newMessage = { role: "user" as const, text };
    setMessages((prev) => {
      const next = [...prev, newMessage];
      return next;
    });

    setIsLoading(true);
    const messageHistory = [...messages, newMessage];
    setMessages((prev) => [...prev, newMessage]);

    try {
      const response = await fetch("/api/consultant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messageHistory, leadInfo }),
      });

      const data = await response.json();
      const assistantText = data.answer ?? data.error ?? "I’m sorry, I couldn’t process your request right now.";
      setMessages((prev) => [...prev, { role: "assistant", text: assistantText }]);
      setSearchSummary(data.search ?? "");
      setProposalSummary(data.proposal ?? "");
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", text: "I’m unable to reach the AI service right now. Please try again later." }]);
      setSearchSummary("");
      setProposalSummary("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    sendMessage(text);
  };

  const handleQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => handleSend(), 50);
  };

  useEffect(() => {
    if (!open) return;
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const leadSummary = useMemo(() => {
    if (!leadInfo.projectType) return "No project details yet.";
    const estimate = estimateCost({ projectType: leadInfo.projectType, hasAI: leadInfo.projectType.includes("AI"), hasSEO: true, hasMaintenance: true });
    return `Estimated package: ${estimate.package}. Price range: KES ${estimate.estimatedRange.min.toLocaleString()} – KES ${estimate.estimatedRange.max.toLocaleString()}. Timeline: ${estimate.timeline}.`;
  }, [leadInfo]);

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[calc(100%-1.5rem)] max-w-md sm:right-6 sm:w-auto">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] shadow-lg shadow-slate-900/10 transition hover:bg-[var(--surface-soft)]"
        >
          {open ? "Close Brentiq Consultant" : "Open Brentiq Consultant"}
        </button>
      </div>

      {open && (
        <div className="mt-3 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-2xl shadow-slate-900/10">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Consultant</p>
              <p className="text-sm font-semibold text-[var(--foreground)]">Brentiq AI Digital Consultant</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--foreground)] transition hover:bg-[var(--surface)]"
              aria-label="Close consultant"
            >
              ✕
            </button>
          </div>
          <div id="ai-chat-scroll" ref={scrollRef} className="max-h-96 space-y-3 overflow-y-auto pr-1">
            {messages.map((message, index) => (
              <div key={index} className={message.role === "assistant" ? "rounded-3xl bg-slate-100 p-4 text-sm text-slate-900" : "rounded-3xl bg-cyan-400/10 p-4 text-sm text-[var(--foreground)]"}>
                <p className="font-semibold uppercase tracking-[0.2em] text-xs text-slate-500">{message.role === "assistant" ? "Consultant" : "You"}</p>
                <p className="mt-2">{message.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-2">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => handleQuestion(question)}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-left text-sm text-[var(--foreground)] transition hover:bg-[var(--surface)]"
              >
                {question}
              </button>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && handleSend()}
              placeholder="Ask about your project, cost, or AI..."
              className="flex-1 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
            />
            <button
              type="button"
              onClick={handleSend}
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-cyan-400 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Send
            </button>
          </div>

          <div className="mt-4 rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
            <p className="text-sm font-semibold text-[var(--foreground)]">Project estimator</p>
            <p className="mt-2 text-sm text-muted">{leadSummary}</p>
          </div>

          {searchSummary && (
            <div className="mt-4 rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
              <p className="text-sm font-semibold text-[var(--foreground)]">Live market research</p>
              <pre className="mt-2 whitespace-pre-wrap text-sm text-muted">{searchSummary}</pre>
            </div>
          )}

          {proposalSummary && (
            <div className="mt-4 rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
              <p className="text-sm font-semibold text-[var(--foreground)]">Latest proposal</p>
              <pre className="mt-2 whitespace-pre-wrap text-sm text-muted">{proposalSummary}</pre>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowLeadForm((value) => !value)}
            className="mt-4 w-full rounded-2xl bg-[var(--surface-soft)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface)]"
          >
            {showLeadForm ? "Hide lead form" : "Capture lead details"}
          </button>

          {showLeadForm && (
            <div className="mt-4 space-y-3">
              {Object.keys(defaultLeadInfo).map((key) => (
                <div key={key}>
                  <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{key.replace(/([A-Z])/g, " $1")}</label>
                  <input
                    value={leadInfo[key as keyof LeadInfo]}
                    onChange={(event) => setLeadInfo((prev) => ({ ...prev, [key]: event.target.value }))}
                    className="mt-1 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => setShowLeadForm(false)}
                className="w-full rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Save lead details
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
