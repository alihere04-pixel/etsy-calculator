import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";

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

export default function BlogIndex() {
  const files = fs
    .readdirSync(path.join(process.cwd(), "src", "content", "blog"))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));

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
