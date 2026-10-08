import type { Metadata } from "next";
import MarketPage from "@/components/MarketPage";

export const metadata: Metadata = {
  title: "Etsy Fee Calculator for EU Sellers (2026)",
  description: "Calculate Etsy fees, net profit and break-even price for EU sellers in 2026.",
  alternates: { canonical: "https://fynza.store/etsy/eu" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Etsy Fee Calculator for EU Sellers (2026)",
    description: "Calculate Etsy fees, net profit and break-even price for EU sellers in 2026.",
    url: "https://fynza.store/etsy/eu",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Etsy Fee Calculator for EU Sellers (2026)",
    description: "Calculate Etsy fees, net profit and break-even price for EU sellers in 2026.",
  },
};

export default function EUPage() {
  return <MarketPage market="EU" />;
}

