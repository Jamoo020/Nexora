import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/content";

export const metadata = {
  title: "Solutions - Nexora Kenya | Software & Web Services",
  description: "Custom software development, web design, AI automation, and cloud solutions for Kenyan businesses. Premium digital products built to scale.",
};

export default function SolutionsPage() {
  return (
    <main className="flex-1 bg-slate-950">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_45%)] py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Solutions" title="Premium digital systems engineered for Kenya's most ambitious companies." description="From polished websites to enterprise platforms and AI automation, every solution is built to perform, scale, and drive measurable business growth." />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="rounded-[28px] border border-white/10 bg-slate-900/80 p-8">
                <h2 className="text-2xl font-semibold text-white">{service.title}</h2>
                <p className="mt-4 text-slate-300">{service.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-400">
                  {service.points.map((point) => (<li key={point} className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />{point}</li>))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="rounded-[32px] border border-cyan-400/20 bg-slate-900/80 p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Ready to scale</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Bring your next product, platform, or campaign to life with Nexora.</h2>
            <p className="mt-4 max-w-2xl text-slate-300">We help companies move from fragmented tools to premium digital experiences that create real business value.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950">Start your project</Link>
              <Link href="/projects" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white">See case studies</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
