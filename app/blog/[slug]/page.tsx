import Link from "next/link";
import { blogPosts, articleContent } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.href.split("/").pop(),
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.href === `/blog/${params.slug}`);
  return {
    title: post ? `${post.title} | Brentiq` : "Article | Brentiq",
    description: post?.summary || "Read Brentiq's latest insights on digital strategy.",
  };
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={`h2-${i}`} className="mt-12 mb-4 text-3xl font-semibold text-theme">
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={`h3-${i}`} className="mt-8 mb-3 text-2xl font-semibold text-theme">
          {line.replace("### ", "")}
        </h3>
      );
    } else if (line === "---") {
      elements.push(<hr key={`hr-${i}`} className="my-12 border-theme" />);
    } else if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].replace("- ", ""));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="mb-6 ml-6 space-y-2 text-muted">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-lg leading-7 list-disc">
              {item}
            </li>
          ))}
        </ul>
      );
      i--;
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={`quote-${i}`} className="my-6 border-l-4 border-cyan-500 py-3 pl-6 italic text-muted">
          {line.replace("> ", "")}
        </blockquote>
      );
    } else if (line.trim()) {
      elements.push(
        <p key={`p-${i}`} className="mb-4 text-lg leading-8 text-muted">
          {line}
        </p>
      );
    }
    i++;
  }

  return elements;
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.href === `/blog/${params.slug}`);
  const article = articleContent[params.slug];

  if (!post || !article) {
    return (
      <main className="flex-1 bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8 lg:px-10">
          <h1 className="text-4xl font-semibold text-theme">Article not found</h1>
          <p className="mt-4 text-muted">Sorry, we couldn't find the article you're looking for.</p>
          <Link href="/blog" className="mt-8 inline-block text-cyan-500 hover:text-cyan-400 font-semibold">
            ← Back to Insights
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-surface">
      <article className="mx-auto max-w-3xl px-6 py-16 sm:px-8 lg:px-10">
        {/* Meta */}
        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm uppercase tracking-wider text-cyan-500">
          <span>{post.category}</span>
          <span>{post.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="mb-6 text-4xl sm:text-5xl font-bold leading-tight text-theme">{article.title}</h1>

        {/* Summary */}
        <p className="mb-12 text-xl text-muted leading-relaxed">{post.summary}</p>

        {/* Insight box */}
        <div className="mb-12 border-l-4 border-cyan-500 bg-surface-soft py-4 pl-6">
          <p className="text-lg text-muted italic">{post.insight}</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-16 space-y-6">
          {renderContent(article.content)}
        </div>

        {/* Consultant Recommendation */}
        <div className="my-12 rounded-lg border border-cyan-500/30 bg-surface-soft p-8">
          <p className="mb-4 text-sm uppercase tracking-wider text-cyan-500 font-semibold">
            Consultant's Recommendation
          </p>
          <p className="text-lg leading-8 text-muted">{post.consultant}</p>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-12 flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <span key={tag} className="inline-block rounded-full border border-theme px-4 py-2 text-sm text-theme">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center text-cyan-500 hover:text-cyan-400 font-semibold transition">
          ← Back to Insights
        </Link>
      </article>
    </main>
  );
}
