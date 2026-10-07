import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/lib/site/config";
import { AnalyticsGate } from "@/components/analytics/AnalyticsGate";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import { AdSenseScript } from "@/components/Ads/AdSense";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.domain}`),
  title: "Fynza — Etsy Fee Calculator",
  description: "Free Etsy fee and profit calculator.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConsentBanner />
        <AdSenseScript />
        <header className="border-b border-gray-200 bg-white px-4 py-4">
          <Link href="https://fynza.store" className="text-xl font-bold text-orange-600">Fynza</Link>
          <span className="ml-2 text-gray-600">&mdash; Etsy Fee Calculator</span>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-gray-200 bg-white px-4 py-6 text-sm text-gray-600">
          <nav className="flex gap-4">
            <Link href="https://fynza.store" className="hover:underline">Fynza</Link>
            <Link href="/calculator" className="hover:underline">Calculator</Link>
            <Link href="/faq" className="hover:underline">FAQ</Link>
            <Link href="/blog/etsy-fees-explained-2026" className="hover:underline">Blog</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/disclaimer" className="hover:underline">Disclaimer</Link>
          </nav>
          <p className="mt-2">Contact: hello@fynza.store</p>
          <p className="mt-1">&copy; 2026 Fynza. All rights reserved.</p>
        </footer>
        <AnalyticsGate />
      </body>
    </html>
  );
}

