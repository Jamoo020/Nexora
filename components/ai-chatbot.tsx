"use client";

import { useEffect, useMemo, useState } from "react";

const cannedResponses = [
  {
    match: /pricing|cost|quote/i,
    response: "AI-powered proposals can help estimate your project faster, while we work with you on the exact scope and pricing.",
  },
  {
    match: /website|web|site/i,
    response: "We can build a modern website with AI-driven content suggestions, smart lead capture, and automation workflows.",
  },
  {
    match: /automation|process|workflow/i,
    response: "AI automation can streamline repetitive tasks, improve customer response times, and connect your systems with minimal manual work.",
  },
  {
    match: /chatbot|assistant|ai/i,
    response: "This chatbot is a quick way to explore AI ideas. We can build a custom assistant for your site that helps visitors, captures leads, and answers common questions.",
  },
];

function getBotResponse(message: string) {
  const match = cannedResponses.find((item) => item.match.test(message));
  return match
    ? match.response
    : "Great question! We can help you add AI features like chat assistants, content helpers, or automation systems to your website.";
}

export function AiChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    { role: "assistant", text: "Hi there! Ask me how AI can improve your website or your business." },
  ]);

  const reversedMessages = useMemo(() => [...messages].reverse(), [messages]);

  useEffect(() => {
    if (!open) return;
    const scrollable = document.getElementById("ai-chat-scroll");
    if (scrollable) {
      scrollable.scrollTop = scrollable.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");

    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", text: getBotResponse(userText) }]);
    }, 450);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-sm sm:right-6 sm:w-auto">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] shadow-lg shadow-slate-900/10 transition hover:bg-[var(--surface-soft)]"
        >
          {open ? "Close AI helper" : "Chat with AI"}
        </button>
      </div>

      {open && (
        <div className="mt-3 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-2xl shadow-slate-900/10">
          <div id="ai-chat-scroll" className="max-h-80 space-y-3 overflow-y-auto pr-1">
            {messages.map((message, index) => (
              <div key={index} className={`rounded-3xl px-4 py-3 ${message.role === "assistant" ? "bg-slate-100 text-slate-900" : "bg-cyan-400/10 text-[var(--foreground)]"}`}>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{message.role === "assistant" ? "AI" : "You"}</p>
                <p className="mt-1 text-sm leading-6">{message.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && handleSend()}
              placeholder="Ask about AI features..."
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
        </div>
      )}
    </div>
  );
}
