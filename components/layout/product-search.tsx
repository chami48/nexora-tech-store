"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { products } from "@/data/products";
import { formatCartPrice } from "@/components/cart/cart-provider";
import { useOverlay } from "./use-overlay";

export function ProductSearch() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k" && !document.querySelector("dialog[open], [aria-modal='true']")) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, []);
  return <>
    <button type="button" aria-label="Search products" aria-haspopup="dialog" title="Search products (Ctrl/Cmd+K)" onClick={() => setOpen(true)} className="flex size-10 items-center justify-center rounded-full text-[#1D1D1F] transition-all duration-300 hover:bg-black/[0.04] active:scale-95"><Search size={18} strokeWidth={1.8} /></button>
    {open && <SearchDialog onClose={() => setOpen(false)} />}
  </>;
}

function SearchDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const normalized = query.trim().toLowerCase();
  const results = products.filter((product) =>
    `${product.name} ${product.brand} ${product.category === "phones" ? "phones smartphones" : product.category}`.toLowerCase().includes(normalized),
  );
  useOverlay(dialogRef, true, onClose);
  useEffect(() => {
    dialogRef.current?.querySelector(`#search-result-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active]);
  function navigate(index: number) {
    const product = results[index];
    if (!product) return;
    onClose();
    router.push(`/product/${product.slug}`);
  }
  return <dialog ref={dialogRef} aria-label="Search products" onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} className="fixed inset-0 m-auto w-[calc(100%-32px)] max-w-xl overflow-hidden rounded-lg border border-black/10 bg-white p-0 text-[#1D1D1F] shadow-2xl backdrop:bg-black/30 backdrop:backdrop-blur-sm">
    <div className="flex items-center gap-3 border-b border-black/10 px-5 py-4">
      <Search size={19} className="shrink-0 text-[#86868B]" />
      <input autoFocus aria-label="Search products" role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls="product-search-results" aria-activedescendant={results.length ? `search-result-${active}` : undefined} value={query} onChange={(event) => { setQuery(event.target.value); setActive(0); }} onKeyDown={(event) => {
        if (["ArrowDown", "ArrowUp", "Enter"].includes(event.key)) event.preventDefault();
        if (!results.length) return;
        if (event.key === "ArrowDown") setActive((active + 1) % results.length);
        if (event.key === "ArrowUp") setActive((active + results.length - 1) % results.length);
        if (event.key === "Enter") navigate(active);
      }} placeholder="Search products, brands or categories..." className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none" />
      <button type="button" aria-label="Close search" onClick={onClose} className="flex size-9 shrink-0 items-center justify-center rounded-full hover:bg-[#F5F5F7]"><X size={18} /></button>
    </div>
    <ul id="product-search-results" role="listbox" aria-label="Products" className="max-h-[60dvh] overflow-y-auto overscroll-contain p-2">
      {results.map((product, index) => <li id={`search-result-${index}`} key={product.id} role="option" aria-selected={active === index} onMouseMove={() => setActive(index)} onClick={() => navigate(index)} className={`flex cursor-pointer items-center gap-3 rounded px-3 py-3 ${active === index ? "bg-[#F5F5F7]" : ""}`}>
        <div className="relative size-14 shrink-0"><Image src={product.image} alt="" fill sizes="56px" className="object-contain" /></div>
        <div className="min-w-0 flex-1"><p className="text-sm font-medium">{product.name}</p><p className="mt-1 text-xs capitalize text-[#86868B]">{product.brand} / {product.category}</p></div>
        <span className="shrink-0 text-xs font-medium">{formatCartPrice(product.price)}</span>
      </li>)}
    </ul>
    {!results.length && <p role="status" className="p-6 text-center text-sm text-[#6E6E73]">No products found.</p>}
  </dialog>;
}
