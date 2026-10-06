"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useRef } from "react";
import { useOverlay } from "@/components/layout/use-overlay";
import type { Product } from "@/types/product";
import { ProductGallery } from "./product-gallery";
import { ProductInfo } from "./product-info";

export function ProductQuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useOverlay(dialogRef, true, onClose);

  return (
    <dialog ref={dialogRef} aria-label={`${product.name} quick view`} onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} className="fixed inset-0 m-auto h-[90dvh] max-h-[900px] w-[calc(100%-24px)] max-w-[1200px] overflow-hidden rounded-lg bg-white p-0 text-[#1D1D1F] shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm">
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex shrink-0 items-center justify-between border-b border-black/[0.06] px-5 py-3">
          <p className="text-sm font-medium">{product.name}</p>
          <button type="button" autoFocus aria-label="Close quick view" onClick={onClose} className="flex size-10 items-center justify-center rounded-full border border-black/10 hover:bg-[#F5F5F7]"><X size={20} /></button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-8 md:overflow-hidden">
          <div className="grid gap-8 md:h-full md:min-h-0 md:grid-cols-2">
            <ProductGallery product={product} contained />
            <div tabIndex={0} aria-label="Product details" className="min-w-0 md:min-h-0 md:overflow-y-auto md:overscroll-contain md:pr-4">
              <ProductInfo product={product} onPurchase={onClose} />
            </div>
          </div>
        </div>
        <Link href={`/product/${product.slug}`} onClick={onClose} className="flex shrink-0 items-center justify-between border-t border-black/10 bg-white px-6 py-5 font-medium hover:bg-[#F5F5F7]">View details<ArrowRight size={20} /></Link>
      </div>
    </dialog>
  );
}
