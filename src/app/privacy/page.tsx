import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Fynza Etsy Fee Calculator",
  description: "How the Fynza Etsy Fee Calculator handles visitor data.",
  alternates: { canonical: "https://fynza.store/etsy/privacy" },
};

export default function PrivacyPage() {
  return (
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
  );
}
