import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import Link from "next/link";
import MdxPost from "@/components/MdxPost";

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

export function generateStaticParams() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const fm = getFrontmatter(slug);
  if (!fm) return {};
  return {
    title: fm.title,
    description: fm.description,
    alternates: { canonical: `https://fynza.store/etsy/blog/${slug}` },
    openGraph: {
      title: fm.title,
      description: fm.description,
      url: `https://fynza.store/etsy/blog/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.description,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fm = getFrontmatter(slug);
  if (!fm) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{fm.title}</h1>
      <p className="text-sm text-gray-500">{fm.date} · {fm.author}</p>
      <article className="max-w-none text-gray-700 space-y-4">
        <MdxPost slug={slug} />
      </article>
      <Link href="/calculator" className="inline-block rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700">
        Open Calculator
      </Link>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: fm.title,
            description: fm.description,
            datePublished: fm.date,
            author: { "@type": "Organization", name: fm.author },
          }),
        }}
      />
    </main>
  );
}

