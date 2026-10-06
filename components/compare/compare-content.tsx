"use client";

import Image from "next/image";
import Link from "next/link";
import { GitCompareArrows, Trash2, X } from "lucide-react";
import { useState } from "react";
import { products } from "@/data/products";
import { formatCartPrice } from "@/components/cart/cart-provider";
import { hasDifferentValues } from "@/lib/compare";
import { useCompare } from "./compare-provider";

const missing = "\u2014";

export function CompareContent() {
  const { ids, remove, clear } = useCompare();
  const [differencesOnly, setDifferencesOnly] = useState(false);
  const selected = ids.map((id) => products.find((product) => product.id === id)!);
  const specKeys = [...new Set(selected.flatMap((product) => Object.keys(product.specifications)))];
  const rows = [
    { label: "Price", values: selected.map((product) => formatCartPrice(product.price)) },
    { label: "Rating", values: selected.map((product) => product.reviewCount ? `${product.rating.toFixed(1)} (${product.reviewCount} reviews)` : "Not yet rated") },
    { label: "Availability", values: selected.map((product) => product.inStock ? "In stock" : "Out of stock") },
    { label: "Category", values: selected.map((product) => product.category === "phones" ? "Smartphones" : product.category) },
    { label: "Brand", values: selected.map((product) => product.brand) },
    { label: "Features", values: selected.map((product) => [...product.features].sort().join("\n") || missing) },
    ...specKeys.map((key) => ({ label: key, values: selected.map((product) => product.specifications[key]?.trim() || missing) })),
  ];
  const visibleRows = differencesOnly && selected.length > 1 ? rows.filter((row) => hasDifferentValues(row.values)) : rows;

  return <main className="min-h-screen bg-[#F7F7F8] pb-12 pt-28 text-[#1D1D1F]">
    <div className="nexora-container">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <h1 className="text-3xl font-semibold">Compare products</h1>
        {selected.length > 0 && <div className="flex flex-wrap items-center gap-5">
          <label className="flex cursor-pointer items-center gap-2 text-sm"><input type="checkbox" checked={differencesOnly && selected.length > 1} disabled={selected.length < 2} onChange={(event) => setDifferencesOnly(event.target.checked)} className="size-4 accent-black" />Show differences only</label>
          <button type="button" onClick={clear} className="flex items-center gap-2 text-sm text-[#6E6E73]"><Trash2 size={16} />Clear all</button>
        </div>}
      </div>
      {!selected.length ? <div className="py-20 text-center"><GitCompareArrows size={36} strokeWidth={1.4} className="mx-auto text-[#86868B]" /><h2 className="mt-5 text-xl font-semibold">No products selected</h2><Link href="/shop" className="mt-6 inline-flex rounded-full bg-[#1D1D1F] px-6 py-3 text-sm text-white">Browse products</Link></div> : <>
        <p role="status" className="mb-6 mt-4 text-sm text-[#6E6E73]">{selected.length < 2 ? "Select another product to compare." : `${selected.length} products / Base prices and listed specifications`}</p>
        <div role="region" aria-label="Product comparison table" tabIndex={0} className="overflow-x-auto overscroll-x-contain rounded-lg border border-black/10 bg-white focus-visible:outline-2 focus-visible:outline-offset-4">
          <table className="w-full table-fixed border-collapse text-left text-sm" style={{ minWidth: 144 + selected.length * 240 }}>
            <caption className="sr-only">NEXORA product comparison</caption>
            <colgroup><col style={{ width: 144 }} />{selected.map((product) => <col key={product.id} />)}</colgroup>
            <thead><tr><th scope="col" className="sticky left-0 z-20 border-b border-black/10 bg-[#F5F5F7] p-4 align-bottom font-medium">Product</th>
              {selected.map((product) => <th key={product.id} scope="col" className="relative border-b border-l border-black/10 p-5 align-top font-normal">
                <button type="button" aria-label={`Remove ${product.name} from comparison`} title="Remove product" onClick={() => remove(product.id)} className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full border border-black/10 bg-white hover:bg-[#F5F5F7]"><X size={16} /></button>
                <div className="relative mx-auto mb-4 h-40 w-full"><Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 200px, 300px" className="object-contain p-4" /></div>
                <Link href={`/product/${product.slug}`} className="font-semibold hover:text-[#0066CC]">{product.name}</Link>
              </th>)}
            </tr></thead>
            <tbody>{visibleRows.map((row, index) => <tr key={`${row.label}-${index}`}>
              <th scope="row" className="sticky left-0 z-10 border-b border-black/10 bg-[#F5F5F7] p-4 align-top font-medium">{row.label}</th>
              {row.values.map((value, index) => <td key={selected[index].id} className="whitespace-pre-line break-words border-b border-l border-black/10 p-5 align-top capitalize text-[#6E6E73]">{value}</td>)}
            </tr>)}</tbody>
          </table>
          {!visibleRows.length && <p role="status" className="p-6 text-sm text-[#6E6E73]">No differences in the listed details.</p>}
        </div>
        <Link href="/shop" className="mt-6 inline-block text-sm text-[#0066CC]">Add more products</Link>
      </>}
    </div>
  </main>;
}
