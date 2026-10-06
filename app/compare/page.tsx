import type { Metadata } from "next";
import { CompareContent } from "@/components/compare/compare-content";

export const metadata: Metadata = {
  title: "Compare Products",
  description: "Compare NEXORA product prices, features and specifications side by side.",
};

export default function ComparePage() {
  return <CompareContent />;
}
