"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types/product";

export function ProductGallery({ product, contained = false }: { product: Product; contained?: boolean }) {
  const images = Array.from(new Set([product.image, ...product.gallery]));
  const [selected, setSelected] = useState(0);

  return (
    <div className={`min-w-0 ${contained ? "md:flex md:h-full md:min-h-0 md:flex-col" : ""}`}>
      <div className={`relative aspect-square rounded-lg bg-[#F5F5F7] ${contained ? "md:min-h-0 md:flex-1 md:aspect-auto" : ""}`}>
        <Image src={images[selected]} alt={product.name} fill sizes="(max-width: 768px) 90vw, 50vw" className="object-contain p-6 sm:p-10" />
        {images.length > 1 && (
          <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between">
            <button type="button" aria-label="Previous image" onClick={() => setSelected((selected + images.length - 1) % images.length)} className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm"><ChevronLeft size={20} /></button>
            <button type="button" aria-label="Next image" onClick={() => setSelected((selected + 1) % images.length)} className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm"><ChevronRight size={20} /></button>
          </div>
        )}
      </div>
      <div className="mt-4 flex shrink-0 gap-3 overflow-x-auto pb-2">
        {images.map((src, index) => (
          <button key={src} type="button" aria-label={`View image ${index + 1} of ${product.name}`} aria-pressed={selected === index} onClick={() => setSelected(index)} className={`relative size-20 shrink-0 rounded-lg border bg-white ${selected === index ? "border-[#1D1D1F]" : "border-black/10"}`}>
            <Image src={src} alt="" fill sizes="80px" className="object-contain p-2" />
          </button>
        ))}
      </div>
    </div>
  );
}
