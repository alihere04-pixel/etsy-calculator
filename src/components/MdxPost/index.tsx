"use client";

import { blogPosts } from "@/content/blog";

export default function MdxPost({ slug }: { slug: string }) {
  const Post = blogPosts[slug];
  if (!Post) return null;
  return <Post />;
}

