import type { Metadata } from "next";
import CalculatorSection from "@/components/CalculatorSection";

const TITLE = "Etsy Fee Calculator — Calculate Fees & Profit (2026)";
const DESCRIPTION =
  "Free Etsy fee calculator. See listing, transaction, processing, regulatory, and Offsite Ads fees. Get net profit, margin, and break-even price.";
const URL = "https://fynza.store/etsy/calculator";

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

export default function CalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Etsy Fee Calculator",
            url: URL,
            description: DESCRIPTION,
            applicationCategory: "FinanceApplication",
          }),
        }}
      />
      <CalculatorSection />
    </>
  );
}
