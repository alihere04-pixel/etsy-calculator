import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
        <header className="border-b border-gray-200 bg-white px-4 py-4">
          <a href="/" className="text-xl font-bold text-orange-600">Fynza</a>
          <span className="ml-2 text-gray-600">— Etsy Fee Calculator</span>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-gray-200 bg-white px-4 py-6 text-sm text-gray-600">
          <nav className="flex gap-4">
            <a href="/calculator" className="hover:underline">Calculator</a>
            <a href="/faq" className="hover:underline">FAQ</a>
            <a href="/blog/etsy-fees-explained-2026" className="hover:underline">Blog</a>
          </nav>
          <p className="mt-2">Contact: hello@fynza.store</p>
          <p className="mt-1">© 2026 Fynza. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}

