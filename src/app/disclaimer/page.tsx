import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

const TITLE = "Disclaimer — Etsy Fee Calculator";
const DESCRIPTION = "Disclaimer for Fynza Etsy Fee Calculator.";
const URL = "https://fynza.store/etsy/disclaimer";

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

export default function DisclaimerPage() {
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
      <LegalPage title="Disclaimer" updated="October 7, 2026">
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">Rates can change</h2>
        <p>Etsy may update its fee structure, processing rates, or regional fees at any time. The figures shown here reflect our best reading of official documentation at the &quot;last verified&quot; date, but they are estimates, not quotes.</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">Not financial or tax advice</h2>
        <p>Nothing on this site is financial, tax, or legal advice. Consult a qualified professional for advice specific to your business.</p>
      </section>
      </LegalPage>
    </>
  );
}
