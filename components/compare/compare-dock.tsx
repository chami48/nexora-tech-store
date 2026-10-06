"use client";

import Image from "next/image";
import Link from "next/link";
import { GitCompareArrows, Trash2, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { products } from "@/data/products";
import { useCompare } from "./compare-provider";

export function CompareDock() {
  const { ids, remove, clear, full } = useCompare();
  const reduceMotion = useReducedMotion();
  if (!ids.length) return null;
  const selected = ids.map((id) => products.find((product) => product.id === id)!);
  return <>
    <div aria-hidden="true" className="h-44 lg:h-32" />
    <motion.aside initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} aria-label="Selected products to compare" className="fixed inset-x-3 bottom-4 z-[35] mx-auto max-w-[1080px] rounded-lg border border-black/10 bg-white/95 p-3 text-[#1D1D1F] shadow-2xl backdrop-blur-xl sm:inset-x-6 sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-5">
        <ul className="grid min-w-0 flex-1 grid-cols-3 gap-2">
          {selected.map((product) => <li key={product.id} className="relative flex min-w-0 flex-col items-start gap-2 pr-6 sm:flex-row sm:items-center">
            <div className="relative size-10 shrink-0 sm:size-12"><Image src={product.image} alt="" fill sizes="48px" className="object-contain" /></div>
            <p title={product.name} className="w-full truncate text-xs font-medium sm:text-sm">{product.name}</p>
            <button type="button" title={`Remove ${product.name}`} aria-label={`Remove ${product.name} from comparison`} onClick={() => remove(product.id)} className="absolute right-0 top-0 flex size-6 items-center justify-center rounded-full text-[#6E6E73] hover:bg-[#F5F5F7] focus-visible:outline-2"><X size={14} /></button>
          </li>)}
        </ul>
        <div className="flex shrink-0 items-center justify-between gap-3">
          <p role="status" className="text-xs text-[#6E6E73]">{full ? "3/3 selected. Remove one to add another." : `${ids.length}/3 selected`}</p>
          <button type="button" aria-label="Clear all compared products" title="Clear all" onClick={clear} className="flex size-9 shrink-0 items-center justify-center rounded-full border border-black/10 hover:bg-[#F5F5F7]"><Trash2 size={16} /></button>
          {ids.length >= 2 ? <Link href="/compare" className="flex h-10 shrink-0 items-center gap-2 rounded-full bg-[#1D1D1F] px-4 text-xs font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2"><GitCompareArrows size={16} />Compare</Link> : <button type="button" disabled title="Select at least 2 products" className="flex h-10 shrink-0 items-center gap-2 rounded-full bg-[#1D1D1F] px-4 text-xs font-semibold text-white opacity-40"><GitCompareArrows size={16} />Compare</button>}
        </div>
      </div>
    </motion.aside>
  </>;
}
