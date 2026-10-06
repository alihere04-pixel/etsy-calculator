"use client";

import type { ComponentType } from "react";
import EtsyFeesExplained from "@/content/blog/etsy-fees-explained-2026.mdx";
import HowMuchDoesEtsyTake from "@/content/blog/how-much-does-etsy-take.mdx";
import EtsyProfitCalculatorGuide from "@/content/blog/etsy-profit-calculator-guide.mdx";

const posts: Record<string, ComponentType> = {
  "etsy-fees-explained-2026": EtsyFeesExplained,
  "how-much-does-etsy-take": HowMuchDoesEtsyTake,
  "etsy-profit-calculator-guide": EtsyProfitCalculatorGuide,
};

export default function MdxPost({ slug }: { slug: string }) {
  const Post = posts[slug];
  if (!Post) return null;
  return <Post />;
}

