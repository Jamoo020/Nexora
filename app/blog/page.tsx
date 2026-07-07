import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { blogPosts } from "@/lib/content";

export const metadata = {
  title: "Insights | Brentiq",
  description: "Read Brentiq's insights on premium web design, digital transformation, AI automation, and technical SEO.",
};

export default function BlogPage() {
  const pillars = ["SEO strategy", "Conversion design", "AI automation", "Digital growth"];

  return (
    <main className="flex-1 bg-surface">
      <section className="border-b border-theme py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Insights"
            title="Practical thinking for leaders building smarter digital growth."
            description="We write about the strategy, systems, and customer experience choices that help ambitious businesses move faster and convert better."
          />

          <div className="mt-12 rounded-[32px] border border-theme bg-surface-soft p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Brentiq perspective</p>
                <h2 className="mt-4 text-3xl font-semibold text-theme sm:text-4xl">
                  We connect beautiful digital experiences with measurable business outcomes.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
                  Our insights focus on the things that matter most to modern teams: clarity in positioning, speed in delivery, confidence in automation, and growth that feels sustainable.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {pillars.map((pillar) => (
                    <span key={pillar} className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
                      {pillar}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-theme bg-surface p-8">
                <h3 className="text-xl font-semibold text-theme">What you will find here</h3>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-muted">
                  <li>• Practical breakdowns of how premium websites create more trust and stronger conversion.</li>
                  <li>• Clear guidance on using AI automation to reduce operational drag without losing the human touch.</li>
                  <li>• Strategic ideas for SEO, analytics, and digital systems that support long-term growth.</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {blogPosts.map((post) => (
                <article key={post.title} className="rounded-[28px] border border-theme bg-surface p-8">
                  <div className="flex items-center justify-between gap-4 text-sm text-muted">
                    <span className="rounded-full bg-cyan-400/10 px-3 py-1 font-semibold uppercase tracking-[0.2em] text-cyan-300">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-theme">{post.title}</h3>
                  <p className="mt-4 text-muted">{post.summary}</p>
                  <p className="mt-4 text-sm leading-7 text-muted">{post.insight}</p>
                  <div className="mt-6 rounded-[16px] border border-theme/50 bg-surface-soft p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Consultant's Recommendation</p>
                    <p className="mt-2 text-sm leading-6 text-muted">{post.consultant}</p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-theme px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Link href={post.href} className="text-sm font-semibold text-cyan-300">
                      Read this article →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
