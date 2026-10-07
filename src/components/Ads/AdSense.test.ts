import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { AdSense, AdSenseScript } from "./AdSense";

const CLIENT_ID = "ca-pub-1234567890123456";

function setConsent(value: string | null): void {
  (globalThis as Record<string, unknown>).window = {
    localStorage: {
      getItem: () => value,
      setItem: () => undefined,
    },
  };
}

beforeEach(() => {
  delete process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
});

afterEach(() => {
  delete (globalThis as Record<string, unknown>).window;
  delete process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
});

describe("AdSense", () => {
  it("renders nothing without NEXT_PUBLIC_ADSENSE_CLIENT_ID", () => {
    setConsent("accepted");
    const html = renderToString(createElement(AdSense, { slot: "s1" }));
    expect(html).toBe("");
  });

  it("renders the placeholder when env is set and consent is accepted", () => {
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID = CLIENT_ID;
    setConsent("accepted");
    const html = renderToString(
      createElement(AdSense, { slot: "s1", format: "rectangle" })
    );
    expect(html).toContain("adsbygoogle");
    expect(html).toContain(`data-ad-client="${CLIENT_ID}"`);
    expect(html).toContain('data-ad-slot="s1"');
    expect(html).toContain('data-ad-format="rectangle"');
  });

  it("renders nothing when consent is declined", () => {
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID = CLIENT_ID;
    setConsent("declined");
    const html = renderToString(createElement(AdSense, { slot: "s1" }));
    expect(html).toBe("");
  });

  it("renders nothing while consent is unknown", () => {
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID = CLIENT_ID;
    setConsent(null);
    const html = renderToString(createElement(AdSense, { slot: "s1" }));
    expect(html).toBe("");
  });
});

describe("AdSenseScript", () => {
  it("loads the AdSense script only with env set and consent accepted", () => {
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID = CLIENT_ID;
    setConsent("accepted");
    const html = renderToString(createElement(AdSenseScript));
    expect(html).toContain("pagead2.googlesyndication.com");
    expect(html).toContain(`client=${CLIENT_ID}`);
  });

  it("renders nothing without the env var even if consent is accepted", () => {
    setConsent("accepted");
    expect(renderToString(createElement(AdSenseScript))).toBe("");
  });

  it("renders nothing when consent is declined", () => {
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID = CLIENT_ID;
    setConsent("declined");
    expect(renderToString(createElement(AdSenseScript))).toBe("");
  });
});
