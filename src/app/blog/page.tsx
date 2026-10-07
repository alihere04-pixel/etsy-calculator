import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { blogSlugs } from "@/content/blog/slugs";

const TITLE = "Etsy Seller Blog — Fees, Profit & Pricing Guides (2026)";
const DESCRIPTION =
  "Guides on Etsy fees, profit margins, pricing, Offsite Ads, and more. Learn how to maximize your Etsy shop profit.";
const URL = "https://fynza.store/etsy/blog";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function getFrontmatter(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const frontmatter: Record<string, string> = {};
  match[1].split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx > -1) {
      frontmatter[line.slice(0, idx).trim()] = line.slice(idx + 1).trim().replace(/^"|"$/g, "");
    }
  });
  return frontmatter;
}

export default function BlogIndex() {
  const posts = blogSlugs
    .map((slug) => {
      const fm = getFrontmatter(slug);
      if (!fm) return null;
      return { slug, title: fm.title, description: fm.description, date: fm.date };
    })
    .filter((post): post is { slug: string; title: string; description: string; date: string } => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Etsy Seller Blog",
            url: URL,
            description: DESCRIPTION,
          }),
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <time
              dateTime={post.date}
              className="text-xs text-zinc-500 dark:text-zinc-400"
            >
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-2 block hover:underline"
            >
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                {post.title}
              </h2>
            </Link>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {post.description}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
