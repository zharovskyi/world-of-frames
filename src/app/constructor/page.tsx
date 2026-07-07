import { ConstructorApp } from "@/components/constructor/ConstructorApp";
import { labels } from "@/data/labels";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${labels.pageTitle} | ${labels.siteName}`,
  description: labels.pageDescription,
};

export default function ConstructorPage() {
  return <ConstructorApp />;
}
