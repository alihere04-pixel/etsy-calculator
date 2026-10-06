import type { Metadata } from "next";
import MarketPage from "@/components/MarketPage";

export const metadata: Metadata = {
  title: "Etsy Fee Calculator for AU Sellers (2026)",
  description: "Calculate Etsy fees, net profit and break-even price for Australian sellers in 2026.",
  alternates: { canonical: "https://fynza.store/etsy/au" },
  openGraph: {
    title: "Etsy Fee Calculator for AU Sellers (2026)",
    description: "Calculate Etsy fees, net profit and break-even price for Australian sellers in 2026.",
    url: "https://fynza.store/etsy/au",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Etsy Fee Calculator for AU Sellers (2026)",
    description: "Calculate Etsy fees, net profit and break-even price for Australian sellers in 2026.",
  },
};

export default function AUPage() {
  return <MarketPage market="AU" />;
}

