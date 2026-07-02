import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { AiShowcase } from "@/components/ai-showcase";
import { faqs, industries, processSteps, projects, services, stats, testimonials } from "@/lib/content";

export const metadata = {
  title: "Nexora - Software Development Kenya | Web Design & Digital Solutions",
  description: "Premium software development, web design, and digital transformation solutions for Kenyan companies. Nexora delivers high-performance digital products across Kenya - from Mombasa to Nairobi.",
  keywords: "software development Kenya, web design Kenya, digital agency Kenya, web development Mombasa, software company Kenya, digital solutions Kenya",
  openGraph: {
    title: "Nexora - Software Development in Kenya",
    description: "Digital products and enterprise solutions for ambitious Kenyan businesses",
    url: "https://nexora.co.ke",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden border-b border-white/10 bg-hero">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Kenyan software development leader</p>
            <h1 className="mt-6 text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">Premium digital products for ambitious Kenyan businesses.</h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-300">Nexora creates world-class websites, enterprise platforms, and AI-powered automation that help Kenyan companies grow with confidence. Based in Mombasa, serving businesses across Kenya.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">Book a consultation</Link>
              <Link href="/projects" className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Explore our work</Link>
            </div>
          </div>
          <div className="rounded-[32px] border border-cyan-400/20 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
            <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-slate-800 to-slate-950 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Digital headquarters</p>
                  <p className="mt-2 text-2xl font-semibold text-white">Nexora Studio</p>
                </div>
                <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">Live</div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {services.slice(0, 4).map((service) => (
                  <div key={service.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">{service.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AiShowcase />

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Why Nexora" title="A premium partner for companies that refuse to settle for ordinary technology." description="We blend strategy, product design, elegant engineering, and SEO intelligence into one high-performing digital experience." />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="rounded-[24px] border border-theme bg-surface-soft p-8 backdrop-blur">
                <h3 className="text-xl font-semibold text-theme">{service.title}</h3>
                <p className="mt-4 text-muted">{service.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-muted-strong">
                  {service.points.map((point) => (<li key={point}>• {point}</li>))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-theme bg-surface-soft py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Industries served" title="Built for sectors that need trust, precision, and momentum." description="From construction to finance, we craft digital products that move faster and feel more premium than the average market offering." />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {industries.map((industry) => (
              <div key={industry.slug} className="rounded-[24px] border border-theme bg-surface p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">{industry.title}</p>
                <p className="mt-4 text-muted">{industry.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Featured work" title="Selected projects that showcase how we create measurable impact." description="Each engagement is designed to strengthen trust, improve performance, and raise the quality of the digital experience." />
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.slug} className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/80">
                <div className="h-40 bg-gradient-to-br from-cyan-500/20 via-slate-900 to-slate-950" />
                <div className="p-8">
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{project.type}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{project.name}</h3>
                  <p className="mt-4 text-slate-300">{project.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/80 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Process" title="A clear path from strategy to launch." description="We keep the experience guided, transparent, and focused on business outcomes from day one." />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.title} className="rounded-[24px] border border-white/10 bg-slate-950/80 p-8">
                <p className="text-sm font-semibold text-cyan-300">0{index + 1}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading eyebrow="Trusted by growing companies" title="Performance that feels as strong as the experience itself." description="Nexora combines sharp design with technical discipline to create products that stand out and scale." />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-[20px] border border-white/10 bg-white/5 p-6">
                    <p className="text-3xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              {testimonials.map((testimonial) => (
                <blockquote key={testimonial.author} className="rounded-[24px] border border-white/10 bg-slate-900/80 p-8">
                  <p className="text-lg leading-8 text-slate-200">“{testimonial.quote}”</p>
                  <footer className="mt-6 text-sm text-slate-400"><span className="font-semibold text-white">{testimonial.author}</span> • {testimonial.role}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/80 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Frequently asked questions" title="Clarity on scope, timelines, and outcomes." description="We make the process straightforward so you can focus on the bigger picture." />
          <div className="mt-12 grid gap-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-[20px] border border-white/10 bg-slate-950/80 p-6">
                <summary className="cursor-pointer text-lg font-semibold text-white">{faq.question}</summary>
                <p className="mt-4 text-slate-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-slate-900 px-6 py-16 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Start your project</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Let’s create something exceptional together.</h2>
              <p className="mt-4 text-lg text-slate-300">Whether you need a premium website, a powerful platform, or AI automation, Nexora can help you launch with confidence.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">Request a proposal</Link>
              <Link href="/about" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Meet the studio</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
