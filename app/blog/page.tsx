import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { blogPosts } from "@/lib/content";

export const metadata = {
  title: "Insights | Nexora",
  description: "Read Nexora's insights on premium web design, digital transformation, AI automation, and technical SEO.",
};

export default function BlogPage() {
  return (
    <main className="flex-1 bg-surface">
      <section className="border-b border-theme py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Insights" title="Practical thinking for leaders building digital growth." description="We share thoughtful perspectives on design, development, SEO, AI, and the future of digital products." />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {blogPosts.map((post) => (
              <article key={post.title} className="rounded-[28px] border border-theme bg-surface-soft p-8">
                <h2 className="text-2xl font-semibold text-theme">{post.title}</h2>
                <p className="mt-4 text-muted">{post.summary}</p>
                <div className="mt-8"><Link href={post.href} className="text-sm font-semibold text-cyan-300">Read article →</Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
