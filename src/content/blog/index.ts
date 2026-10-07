import type { ComponentType } from "react";
import EtsyFeesExplained from "./etsy-fees-explained-2026.mdx";
import HowMuchDoesEtsyTake from "./how-much-does-etsy-take.mdx";
import EtsyProfitCalculatorGuide from "./etsy-profit-calculator-guide.mdx";

export { blogSlugs } from "./slugs";
export const blogPosts: Record<string, ComponentType> = {
  "etsy-fees-explained-2026": EtsyFeesExplained,
  "how-much-does-etsy-take": HowMuchDoesEtsyTake,
  "etsy-profit-calculator-guide": EtsyProfitCalculatorGuide,
};
