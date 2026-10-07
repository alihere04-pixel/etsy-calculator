import type { Metadata } from "next";
import MarketPage from "@/components/MarketPage";

export const metadata: Metadata = {
  title: "Etsy Fee Calculator for Australia Sellers (2026)",
  description: "Calculate your Etsy fees, net profit, and break-even price as an Australian seller in 2026.",
  alternates: { canonical: "https://fynza.store/etsy/au" },
  openGraph: {
    title: "Etsy Fee Calculator for Australia Sellers (2026)",
    description: "Calculate your Etsy fees, net profit, and break-even price as an Australian seller in 2026.",
    url: "https://fynza.store/etsy/au",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Etsy Fee Calculator for Australia Sellers (2026)",
    description: "Calculate your Etsy fees, net profit, and break-even price as an Australian seller in 2026.",
  },
};

export default function AUPage() {
  return <MarketPage market="AU" />;
}

