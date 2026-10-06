import type { Metadata } from "next";
import EtsyLanding from "@/components/EtsyLanding";

export const metadata: Metadata = {
  title: "Etsy Fee & Profit Calculator",
  description: "Free Etsy fee and profit calculator for sellers in the US, UK, EU, CA, AU and IN.",
  alternates: { canonical: "https://fynza.store/etsy" },
  openGraph: {
    title: "Etsy Fee & Profit Calculator",
    description: "Free Etsy fee and profit calculator for sellers in the US, UK, EU, CA, AU and IN.",
    url: "https://fynza.store/etsy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Etsy Fee & Profit Calculator",
    description: "Free Etsy fee and profit calculator for sellers in the US, UK, EU, CA, AU and IN.",
  },
};

export default function EtsyPage() {
  return <EtsyLanding />;
}

