import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

const TITLE = "Terms of Service — Etsy Fee Calculator";
const DESCRIPTION = "Terms of service for Fynza Etsy Fee Calculator.";
const URL = "https://fynza.store/etsy/terms";

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
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function TermsPage() {
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
      <LegalPage title="Terms of Service" updated="October 7, 2026">
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">The tool is an estimate</h2>
        <p>The calculator estimates Etsy fees using published rate data. Actual fees on your account may differ due to promotions, category changes, VAT handling, or policy updates. Verify with the official Etsy Fees &amp; Payments Policy before making business decisions.</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">No affiliation</h2>
        <p>Fynza is an independent tool and is not affiliated with, endorsed by, or sponsored by Etsy, Inc.</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">Use at your own risk</h2>
        <p>The tool is provided &quot;as is&quot; without warranties of any kind. Fynza is not liable for losses arising from reliance on its estimates.</p>
      </section>
      </LegalPage>
    </>
  );
}
