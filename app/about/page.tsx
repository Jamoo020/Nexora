import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export const metadata = {
  title: "About Brentiq - Kenya's Premium Software Development Studio",
  description: "Brentiq is a leading digital agency in Mombasa, Kenya. We build premium websites, enterprise software, and digital solutions for ambitious Kenyan companies across all industries.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 bg-surface">
      <section className="border-b border-theme py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:px-10">
          <div>
            <SectionHeading eyebrow="About Brentiq" title="Kenya's premium digital studio building the future of business technology." description="Based in Mombasa, serving ambitious companies across Kenya. We combine strategy, design, and engineering to turn complex goals into powerful digital experiences that drive growth." />
            <p className="mt-8 text-lg leading-8 text-muted">We believe that the best digital products feel effortless, look remarkable, and create measurable value. Every website, app, portal, or automation system we build for Kenyan businesses is designed to earn trust and deliver real growth.</p>
          </div>
          <div className="rounded-[32px] border border-theme bg-surface-soft p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Core values</p>
            <ul className="mt-6 space-y-4 text-muted">
              <li>• Innovation with discipline.</li>
              <li>• Integrity in every decision.</li>
              <li>• Performance with clarity and purpose.</li>
              <li>• Transparency throughout the journey.</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="rounded-[32px] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-slate-900 p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Why choose Brentiq</p>
            <h2 className="mt-4 text-3xl font-semibold text-theme">High-end design combined with enterprise-grade engineering.</h2>
            <p className="mt-4 max-w-2xl text-muted">If your company needs a premium digital presence that performs, scales, and converts, we are ready to build it with you.</p>
            <div className="mt-8"><Link href="/contact" className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950">Talk to the team</Link></div>
          </div>
        </div>
      </section>
    </main>
  );
}
