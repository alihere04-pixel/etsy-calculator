import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use — Fynza Etsy Fee Calculator",
  description: "Terms of use for the Fynza Etsy Fee Calculator.",
  alternates: { canonical: "https://fynza.store/etsy/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="October 7, 2026">
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
  );
}
