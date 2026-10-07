import type { Metadata } from "next";
import Link from "next/link";
import { AdSense } from "@/components/Ads/AdSense";

export const metadata: Metadata = {
  title: "Etsy Fees FAQ (2026)",
  description: "Common questions about Etsy fees, transaction fees, payment processing, regulatory fees and Offsite Ads.",
  alternates: { canonical: "https://fynza.store/etsy/faq" },
  openGraph: {
    title: "Etsy Fees FAQ (2026)",
    description: "Common questions about Etsy fees, transaction fees, payment processing, regulatory fees and Offsite Ads.",
    url: "https://fynza.store/etsy/faq",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Etsy Fees FAQ (2026)",
    description: "Common questions about Etsy fees, transaction fees, payment processing, regulatory fees and Offsite Ads.",
  },
};

const faqs = [
  { q: "How much does Etsy charge per listing?", a: "Etsy charges a $0.20 USD listing fee per item, renewed every 4 months or on each sale." },
  { q: "What is the Etsy transaction fee?", a: "The transaction fee is 6.5% of the sale total, including shipping and gift wrap charged to the buyer." },
  { q: "How much is the payment processing fee in the US?", a: "US sellers pay 3% + $0.25 USD per order." },
  { q: "How much is the payment processing fee in the UK?", a: "UK sellers pay 4% + £0.20 per order." },
  { q: "How much is the payment processing fee in the EU?", a: "EU sellers pay 4% + €0.30 per order." },
  { q: "How much is the payment processing fee in Canada?", a: "Canadian sellers pay 3% + $0.25 CAD per order." },
  { q: "How much is the payment processing fee in Australia?", a: "Australian sellers pay 3% + $0.25 AUD per order." },
  { q: "How much is the payment processing fee in India?", a: "Indian sellers pay 5% + ₹25 per order." },
  { q: "What is the regulatory operating fee?", a: "A country-specific fee charged in several markets, e.g. UK 0.32%, Canada 0.50%, Spain 0.88%." },
  { q: "What are Offsite Ads fees?", a: "Offsite Ads charge 15% (under $10K/yr) or 12% (over $10K/yr), capped at $100 per order." },
  { q: "Is there a currency conversion fee?", a: "Yes, 2.5% applies when your listing currency differs from your payout currency." },
  { q: "Does Etsy charge tax on fees?", a: "Tax treatment varies; the transaction fee in the US excludes sales tax, but payment processing includes it." },
];

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Etsy Fees FAQ</h1>
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i}>
            <p className="font-semibold text-gray-900">{f.q}</p>
            <p className="text-gray-600">{f.a}</p>
          </div>
        ))}
      </div>
      <Link href="/calculator" className="inline-block rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700">
        Open Calculator
      </Link>
      <AdSense slot="etsy-faq-bottom" format="horizontal" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
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

