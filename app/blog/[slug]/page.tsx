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
            <li key={idx} className="text-lg leading-7">
              {item}
            </li>
          ))}
        </ul>
      );
      i--;
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
          <p className="mt-4 text-muted">
            Sorry, we couldn't find the article you're looking for.
          </p>
          <div className="mt-8">
            <Link href="/blog" className="text-cyan-300 font-semibold">
              Back to Insights →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-surface">
      <article className="mx-auto max-w-3xl px-6 py-24 sm:px-8 lg:px-10">
        <div className="mb-8">
          <div className="flex items-center gap-4 text-sm text-muted mb-6">
            <span className="rounded-full bg-cyan-400/10 px-3 py-1 font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {post.category}
            </span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold text-theme mb-6">
            {article.title}
          </h1>
          <p className="text-lg text-muted">{post.summary}</p>
        </div>

        <div className="prose prose-invert max-w-none">
          {renderContent(article.content)}
        </div>

        <div className="mt-16 rounded-[20px] border border-theme bg-surface-soft p-8">
          <h3 className="text-xl font-semibold text-theme">Consultant's Recommendation</h3>
          <p className="mt-4 text-lg leading-8 text-muted">{post.consultant}</p>
        </div>

        <div className="mt-12">
          <Link href="/blog" className="text-cyan-300 font-semibold text-lg">
            ← Back to all insights
          </Link>
        </div>
      </article>
    </main>
  );
}
