import type { Metadata } from "next";
import MarketPage from "@/components/MarketPage";

export const metadata: Metadata = {
  title: "Etsy Fee Calculator for CA Sellers (2026)",
  description: "Calculate Etsy fees, net profit and break-even price for Canadian sellers in 2026.",
  alternates: { canonical: "https://fynza.store/etsy/ca" },
  openGraph: {
    title: "Etsy Fee Calculator for CA Sellers (2026)",
    description: "Calculate Etsy fees, net profit and break-even price for Canadian sellers in 2026.",
    url: "https://fynza.store/etsy/ca",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Etsy Fee Calculator for CA Sellers (2026)",
    description: "Calculate Etsy fees, net profit and break-even price for Canadian sellers in 2026.",
  },
};

export default function CAPage() {
  return <MarketPage market="CA" />;
}

