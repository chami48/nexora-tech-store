"use client";

import { GitCompareArrows } from "lucide-react";
import { useCompare } from "./compare-provider";

export function CompareButton({ productId, name, className = "" }: { productId: string; name: string; className?: string }) {
  const { ids, full, add, remove } = useCompare();
  const selected = ids.includes(productId);
  const disabled = full && !selected;
  const label = disabled ? "Compare is full (3 products). Remove a product to add another." : `${selected ? "Remove" : "Add"} ${name} ${selected ? "from" : "to"} comparison`;
  return <span title={label} className={`inline-flex ${className}`}>
    <button type="button" aria-label={label} aria-pressed={selected} disabled={disabled} onClick={() => selected ? remove(productId) : add(productId)} className={`flex h-7 w-[76px] items-center justify-center gap-1 rounded-full border border-black/10 text-[10px] font-medium shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40 ${selected ? "bg-[#1D1D1F] text-white" : "bg-white/90 text-[#1D1D1F] hover:bg-[#F5F5F7]"}`}>
      <GitCompareArrows size={12} strokeWidth={1.6} />
      <span>{selected ? "Added" : "Compare"}</span>
    </button>
  </span>;
}
