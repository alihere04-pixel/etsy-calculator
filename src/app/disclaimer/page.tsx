import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer — Fynza Etsy Fee Calculator",
  description: "Disclaimer for the Fynza Etsy Fee Calculator.",
  alternates: { canonical: "https://fynza.store/etsy/disclaimer" },
};

export default function DisclaimerPage() {
  return (
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
  );
}
