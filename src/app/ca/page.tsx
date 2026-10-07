import type { Metadata } from "next";
import MarketPage from "@/components/MarketPage";

export const metadata: Metadata = {
  title: "Etsy Fee Calculator for Canada Sellers (2026)",
  description: "Calculate your Etsy fees, net profit, and break-even price as a Canadian seller in 2026.",
  alternates: { canonical: "https://fynza.store/etsy/ca" },
  openGraph: {
    title: "Etsy Fee Calculator for Canada Sellers (2026)",
    description: "Calculate your Etsy fees, net profit, and break-even price as a Canadian seller in 2026.",
    url: "https://fynza.store/etsy/ca",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Etsy Fee Calculator for Canada Sellers (2026)",
    description: "Calculate your Etsy fees, net profit, and break-even price as a Canadian seller in 2026.",
  },
};

export default function CAPage() {
  return <MarketPage market="CA" />;
}

