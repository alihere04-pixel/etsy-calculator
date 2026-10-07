"use client";

import { useEffect } from "react";
import { useAnalyticsConsent } from "@/components/analytics/useAnalyticsConsent";

export type AdFormat = "auto" | "rectangle" | "horizontal";

export interface AdSenseProps {
  slot: string;
  format?: AdFormat;
}

function adsenseClientId(): string {
  return process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "";
}

function adsEnabled(consentStatus: string): boolean {
  return adsenseClientId() !== "" && consentStatus === "accepted";
}

export function AdSense({ slot, format = "auto" }: AdSenseProps) {
  const { consent } = useAnalyticsConsent();
  const enabled = adsEnabled(consent.status);

  useEffect(() => {
    if (!enabled) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      return;
    }
  }, [enabled, slot]);

  if (!enabled) return null;

  return (
    <div className="my-6 flex justify-center">
      <ins
        className="adsbygoogle"
        data-ad-client={adsenseClientId()}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        style={{ display: "block" }}
      />
    </div>
  );
}

export function AdSenseScript() {
  const { consent } = useAnalyticsConsent();
  if (!adsEnabled(consent.status)) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId()}`}
      crossOrigin="anonymous"
    />
  );
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}
