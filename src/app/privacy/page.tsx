import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

const TITLE = "Privacy Policy — Etsy Fee Calculator";
const DESCRIPTION = "Privacy policy for Fynza Etsy Fee Calculator. Learn how we handle your data.";
const URL = "https://fynza.store/etsy/privacy";

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
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: TITLE,
            url: URL,
            description: DESCRIPTION,
          }),
        }}
      />
      <LegalPage title="Privacy Policy" updated="October 7, 2026">
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">What this calculator does</h2>
        <p>The Etsy Fee Calculator runs entirely in your browser. The numbers you enter — price, costs, shipping, country — are not sent to any server, are not stored, and are not shared with anyone.</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">Analytics and tracking</h2>
        <p>This tool does not load any analytics, advertising, or tracking scripts. No cookies are set by this site.</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">Contact</h2>
        <p>Questions about this notice? Email hello@fynza.store.</p>
      </section>
      </LegalPage>
    </>
  );
}
