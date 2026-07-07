import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { industries } from "@/lib/content";

export const metadata = {
  title: "Industries - Brentiq Kenya | Tailored Solutions for Kenyan Sectors",
  description: "Brentiq builds tailored digital solutions for Kenya's key industries - construction, healthcare, education, finance, and more. Custom software and web design for Kenyan businesses.",
};

export default function IndustriesPage() {
  return (
    <main className="flex-1 bg-slate-950">
      <section className="border-b border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Kenya Industries" title="Tailored digital solutions for key Kenyan sectors." description="From construction and healthcare to fintech and education, we understand the unique digital challenges facing Kenya's growing industries and build solutions that drive real growth." />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {industries.map((industry) => (
              <article key={industry.slug} className="rounded-[28px] border border-white/10 bg-slate-900/80 p-8">
                <h2 className="text-2xl font-semibold text-white">{industry.title}</h2>
                <p className="mt-4 text-slate-300">{industry.summary}</p>
                <div className="mt-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Typical challenges</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-400">{industry.challenges.map((challenge) => (<li key={challenge}>• {challenge}</li>))}</ul>
                </div>
                <div className="mt-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Recommended solutions</p>
                  <div className="mt-3 flex flex-wrap gap-2">{industry.solutions.map((item) => (<span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">{item}</span>))}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Need a tailored approach?</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Tell us what your business needs to achieve and we’ll shape the right digital path.</h2>
            <div className="mt-8"><Link href="/contact" className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950">Book a discovery call</Link></div>
          </div>
        </div>
      </section>
    </main>
  );
}
