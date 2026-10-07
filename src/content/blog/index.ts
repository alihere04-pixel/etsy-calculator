import type { ComponentType } from "react";
import EtsyFeesExplained from "./etsy-fees-explained-2026.mdx";
import HowMuchDoesEtsyTake from "./how-much-does-etsy-take.mdx";
import EtsyProfitCalculatorGuide from "./etsy-profit-calculator-guide.mdx";
import EtsyOffsiteAdsWorthIt from "./etsy-offsite-ads-worth-it.mdx";
import EtsyVsShopifyFees from "./etsy-vs-shopify-fees.mdx";
import EtsyListingFeeExplained from "./etsy-listing-fee-explained.mdx";
import EtsyPaymentProcessingFeesByCountry from "./etsy-payment-processing-fees-by-country.mdx";
import EtsyProfitMarginGuide from "./etsy-profit-margin-guide.mdx";

export { blogSlugs } from "./slugs";
export const blogPosts: Record<string, ComponentType> = {
  "etsy-fees-explained-2026": EtsyFeesExplained,
  "how-much-does-etsy-take": HowMuchDoesEtsyTake,
  "etsy-profit-calculator-guide": EtsyProfitCalculatorGuide,
  "etsy-offsite-ads-worth-it": EtsyOffsiteAdsWorthIt,
  "etsy-vs-shopify-fees": EtsyVsShopifyFees,
  "etsy-listing-fee-explained": EtsyListingFeeExplained,
  "etsy-payment-processing-fees-by-country": EtsyPaymentProcessingFeesByCountry,
  "etsy-profit-margin-guide": EtsyProfitMarginGuide,
};
