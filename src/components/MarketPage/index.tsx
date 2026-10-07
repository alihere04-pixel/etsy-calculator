"use client";

import Link from "next/link";
import { useState } from "react";
import rates from "@/data/rates/etsy.json";
import Calculator from "@/components/Calculator";
import ResultCard from "@/components/ResultCard";
import FeeBreakdown from "@/components/FeeBreakdown";
import { currencySymbol, type Result } from "@/lib/calculation/engine";

const marketMeta: Record<
  string,
  { country: string; name: string; seller: string; faq: { q: string; a: string }[] }
> = {
  US: {
    country: "US",
    name: "US",
    seller: "a US seller",
    faq: [
      { q: "What payment processing fee do US sellers pay?", a: "US sellers pay 3% + $0.25 per order." },
      { q: "Is there a regulatory operating fee in the US?", a: "No. The regulatory operating fee does not apply to US sellers." },
      { q: "Does Etsy charge US sellers sales tax on fees?", a: "The transaction fee excludes sales tax; payment processing includes it." },
    ],
  },
  UK: {
    country: "UK",
    name: "UK",
    seller: "a UK seller",
    faq: [
      { q: "What payment processing fee do UK sellers pay?", a: "UK sellers pay 4% + £0.20 per order." },
      { q: "What is the UK regulatory operating fee?", a: "It is 0.32% of the sale total." },
      { q: "Does the UK price include VAT?", a: "Yes, use the tax-inclusive toggle for UK listings." },
    ],
  },
  EU: {
    country: "EU",
    name: "EU",
    seller: "a EU seller",
    faq: [
      { q: "What payment processing fee do EU sellers pay?", a: "EU sellers pay 4% + €0.30 per order." },
      { q: "Why is the EU regulatory fee marked UNVERIFIED?", a: "Because it varies by country. Verify your country's rate." },
      { q: "Does the EU price include VAT?", a: "Yes, use the tax-inclusive toggle for EU listings." },
    ],
  },
  CA: {
    country: "CA",
    name: "Canada",
    seller: "a Canadian seller",
    faq: [
      { q: "What payment processing fee do Canadian sellers pay?", a: "Canadian sellers pay 3% + $0.25 CAD per order." },
      { q: "What is the Canada regulatory operating fee?", a: "It is 0.50% of the sale total." },
      { q: "Does the Canada price include tax?", a: "Tax handling depends on your province; contact Etsy for specifics." },
    ],
  },
  AU: {
    country: "AU",
    name: "Australia",
    seller: "an Australian seller",
    faq: [
      { q: "What payment processing fee do Australian sellers pay?", a: "Australian sellers pay 3% + $0.25 AUD per order." },
      { q: "Is there a regulatory operating fee in Australia?", a: "No. The regulatory operating fee does not apply to AU sellers." },
      { q: "Does the Australia price include GST?", a: "Use the tax-inclusive toggle for GST-inclusive listings." },
    ],
  },
  IN: {
    country: "IN",
    name: "India",
    seller: "an Indian seller",
    faq: [
      { q: "What payment processing fee do Indian sellers pay?", a: "Indian sellers pay 5% + ₹25 per order." },
      { q: "What is the India regulatory operating fee?", a: "It is 0.05% of the sale total." },
      { q: "Does the India price include GST?", a: "Use the tax-inclusive toggle for GST-inclusive listings." },
    ],
  },
};

export default function MarketPage({
  market,
}: {
  market: "US" | "UK" | "EU" | "CA" | "AU" | "IN";
}) {
  const meta = marketMeta[market];
  const [result, setResult] = useState<Result | null>(null);
  const r = rates[market as keyof typeof rates] as (typeof rates)["US"];
  const regulatoryDisplay =
    typeof r.regulatory_fee_percent === "number"
      ? `${r.regulatory_fee_percent}%`
      : "UNVERIFIED";

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Etsy Fee Calculator for {meta.name} Sellers (2026)
      </h1>
      <p className="text-gray-600">
        Calculate your Etsy fees, net profit, and break-even price as{" "}
        {meta.seller}. Rates below match the official Etsy Fees &amp; Payments
        Policy.
      </p>
      <p className="text-xs text-gray-500">
        Rates last updated: {r.last_updated}. Source: {r.source_name}.
      </p>

      <section>
        <Calculator onResult={setResult} country={market} />
        <ResultCard result={result} />
        <FeeBreakdown result={result} />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">Fee Table</h2>
        <table className="mt-4 w-full text-sm">
          <tbody>
            <tr className="border-b"><td className="py-2">Listing fee</td><td className="text-right">${r.listing_fee}</td></tr>
            <tr className="border-b"><td className="py-2">Transaction fee</td><td className="text-right">{r.transaction_fee_percent}%</td></tr>
            <tr className="border-b"><td className="py-2">Payment processing</td><td className="text-right">{r.payment_processing_percent}% + {currencySymbol(r.currency)}{r.payment_processing_fixed}</td></tr>
            <tr className="border-b"><td className="py-2">Regulatory operating fee</td><td className="text-right">{regulatoryDisplay}</td></tr>
            <tr className="border-b"><td className="py-2">Offsite Ads</td><td className="text-right">{r.offsite_ads_percent}%</td></tr>
          </tbody>
        </table>
        {typeof r.regulatory_fee_percent !== "number" && "regulatory_fee_note" in r && r.regulatory_fee_note ? (
          <p className="mt-2 text-xs text-gray-500">{r.regulatory_fee_note as string}</p>
        ) : null}
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">FAQ</h2>
        <div className="mt-4 space-y-4">
          {meta.faq.map((f, i) => (
            <div key={i}>
              <p className="font-medium text-gray-900">{f.q}</p>
              <p className="text-gray-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="text-xs text-gray-500">
        Source: Etsy Fees &amp; Payments Policy; Etsy Help Center.
      </p>

      <Link
        href="/calculator"
        className="inline-block rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
      >
        Open Full Calculator
      </Link>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: meta.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </main>
  );
}

