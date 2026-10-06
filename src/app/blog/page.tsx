import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Etsy Fee Calculator Blog",
  description: "Guides on Etsy fees, profit and pricing.",
  alternates: { canonical: "https://fynza.store/etsy/blog" },
};

export default function BlogIndex() {
  const files = fs
    .readdirSync(path.join(process.cwd(), "src", "content", "blog"))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
      <ul className="list-disc pl-5 space-y-2">
        {files.map((slug) => (
          <li key={slug}>
            <Link href={`/blog/${slug}`} className="text-orange-600 hover:underline">
              {slug}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
