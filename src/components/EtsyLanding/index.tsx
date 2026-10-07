"use client";

import { useState } from "react";
import Link from "next/link";
import Calculator from "@/components/Calculator";
import ResultCard from "@/components/ResultCard";
import FeeBreakdown from "@/components/FeeBreakdown";
import { AdSense } from "@/components/Ads/AdSense";
import type { Result } from "@/lib/calculation/engine";

export default function EtsyLanding() {
  const [result, setResult] = useState<Result | null>(null);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Etsy Fee &amp; Profit Calculator</h1>
      <p className="text-gray-600">
        Free, client-side Etsy fee and profit calculator. Pick your country to
        see accurate listing, transaction, processing, regulatory and Offsite Ads
        fees, plus net profit and break-even price.
      </p>

      <AdSense slot="etsy-home-top" format="auto" />

      <Calculator onResult={setResult} />
      <ResultCard result={result} />
      <FeeBreakdown result={result} />

      <AdSense slot="etsy-home-sidebar" format="rectangle" />

      <nav>
        <h2 className="text-xl font-semibold text-gray-900">Calculate by Country</h2>
        <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
          {["us", "uk", "eu", "ca", "au", "in"].map((c) => (
            <li key={c}>
              <Link href={`/${c}`} className="text-orange-600 hover:underline uppercase">
                {c}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav>
        <h2 className="text-xl font-semibold text-gray-900">Blog</h2>
        <ul className="mt-3 list-disc pl-5 text-sm">
          <li><Link href="/blog/etsy-fees-explained-2026" className="text-orange-600 hover:underline">Etsy Fees Explained 2026</Link></li>
          <li><Link href="/blog/how-much-does-etsy-take" className="text-orange-600 hover:underline">How Much Does Etsy Take?</Link></li>
          <li><Link href="/blog/etsy-profit-calculator-guide" className="text-orange-600 hover:underline">Etsy Profit Calculator Guide</Link></li>
        </ul>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Etsy Fee & Profit Calculator",
            applicationCategory: "BusinessApplication",
            operatingSystem: "All",
          }),
        }}
      />
    </main>
  );
}

