"use client";

import Link from "next/link";

export function AiShowcase() {
  const openConsultant = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("nexora-ai-consultant-open"));
    }
  };

  return (
    <section className="bg-[var(--surface)] py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Nexora AI Consultant</p>
          <h2 className="mt-4 text-4xl font-semibold text-[var(--foreground)] sm:text-5xl">Smart AI guidance for modern digital projects.</h2>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">Use the AI consultant to qualify your project, explore service options, estimate costs, and receive practical guidance for building a stronger online business.</p>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          <div className="rounded-[32px] border border-[var(--border)] bg-[var(--surface-soft)] p-8 shadow-sm shadow-slate-900/5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Consultant</p>
            <h3 className="mt-4 text-2xl font-semibold text-[var(--foreground)]">Lead qualification</h3>
            <p className="mt-4 text-[var(--muted)]">Get intelligent questions that reveal budgets, timelines, and business goals, without overwhelming your visitor.</p>
          </div>
          <div className="rounded-[32px] border border-[var(--border)] bg-[var(--surface-soft)] p-8 shadow-sm shadow-slate-900/5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Estimator</p>
            <h3 className="mt-4 text-2xl font-semibold text-[var(--foreground)]">Rough pricing guidance</h3>
            <p className="mt-4 text-[var(--muted)]">Offer visitors a realistic range based on project type, AI, SEO, hosting, and support needs.</p>
          </div>
          <div className="rounded-[32px] border border-[var(--border)] bg-[var(--surface-soft)] p-8 shadow-sm shadow-slate-900/5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Advisor</p>
            <h3 className="mt-4 text-2xl font-semibold text-[var(--foreground)]">Service recommendations</h3>
            <p className="mt-4 text-[var(--muted)]">Recommend tailored digital solutions for websites, automation, AI, CRM, mobile apps, and more.</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--muted)]">Ready to show visitors a smarter way to engage with Nexora?</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">Book a consultation</Link>
            <button
              type="button"
              onClick={openConsultant}
              className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface)]"
            >
              Open AI consultant
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
