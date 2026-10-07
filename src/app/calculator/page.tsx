import type { Metadata } from "next";
import CalculatorSection from "@/components/CalculatorSection";

export const metadata: Metadata = {
  title: "Etsy Fee & Profit Calculator — Fynza",
  description:
    "Free Etsy fee and profit calculator: listing, transaction, processing, regulatory and Offsite Ads fees, net profit, margin and break-even price.",
  alternates: { canonical: "https://fynza.store/etsy/calculator" },
  openGraph: {
    title: "Etsy Fee & Profit Calculator — Fynza",
    description:
      "Free Etsy fee and profit calculator: listing, transaction, processing, regulatory and Offsite Ads fees, net profit, margin and break-even price.",
    url: "https://fynza.store/etsy/calculator",
    type: "website",
  },
};

export default function CalculatorPage() {
  return <CalculatorSection />;
}
