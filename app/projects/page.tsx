import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/content";

export const metadata = {
  title: "Projects - Nexora Kenya | Portfolio of Digital Solutions",
  description: "Explore Nexora's portfolio of premium web design, software development, and digital transformation projects for Kenyan businesses.",
};

export default function ProjectsPage() {
  return (
    <main className="flex-1 bg-slate-950">
      <section className="border-b border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Our Work" title="Premium digital solutions built for Kenya's most ambitious companies." description="Every project demonstrates our commitment to world-class design, performance, and measurable business impact." />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {projects.map((project) => (
              <article key={project.slug} className="rounded-[28px] border border-white/10 bg-slate-900/80 p-8">
                <div className="h-40 rounded-[24px] bg-gradient-to-br from-cyan-500/20 via-slate-900 to-slate-950" />
                <p className="mt-6 text-sm uppercase tracking-[0.3em] text-cyan-300">{project.type}</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">{project.name}</h2>
                <p className="mt-4 text-slate-300">{project.summary}</p>
                <div className="mt-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Challenge</p>
                  <p className="mt-2 text-slate-300">{project.challenge}</p>
                </div>
                <div className="mt-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Solution</p>
                  <p className="mt-2 text-slate-300">{project.solution}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">{project.stack.map((item) => (<span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-400">{item}</span>))}</div>
                <div className="mt-8"><Link href="/contact" className="text-sm font-semibold text-cyan-300">Discuss a similar project →</Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
