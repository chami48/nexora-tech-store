"use client";

import { Star, Check, Heart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types/product";
import { useCart } from "@/components/cart/cart-provider";
import { useWishlist } from "@/components/wishlist/wishlist-provider";
import { getProductPrice, getProductSpecifications } from "@/lib/product-options";
import { CompareButton } from "@/components/compare/compare-button";

export function ProductInfo({ product, onPurchase }: { product: Product; onPurchase?: () => void }) {
  const { addToCart, buyNow } = useCart();
  const [color, setColor] = useState(product.colors?.find((variant) => variant.available !== false)?.value);
  const [storage, setStorage] = useState(product.storage?.find((variant) => variant.available !== false)?.value);
  const { ids, toggle } = useWishlist();
  const price = getProductPrice(product, storage);
  const specifications = getProductSpecifications(product, storage);
  const unavailable = !product.inStock || (Boolean(product.storage?.length) && !storage) || (Boolean(product.colors?.length) && !color);

  return (
    <div className="min-w-0 space-y-6 text-[#1D1D1F]">
      <div>
        <p className="text-sm text-[#6E6E73]">{product.brand}</p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">{product.name}</h1>
        <p aria-live="polite" className="mt-3 text-xl font-semibold">{new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(price)}</p>
        {product.originalPrice && product.originalPrice > price && <p className="mt-1 text-sm text-[#86868B] line-through">LKR {product.originalPrice.toLocaleString("en-LK")}</p>}
        <div className="mt-3 flex items-center gap-3">
          <button type="button" title="Wishlist" aria-label={`${ids.includes(product.id) ? "Remove" : "Add"} ${product.name} ${ids.includes(product.id) ? "from" : "to"} wishlist`} aria-pressed={ids.includes(product.id)} onClick={() => toggle(product.id)} className="flex size-10 items-center justify-center rounded-full border border-black/10"><Heart size={18} className={ids.includes(product.id) ? "fill-[#1D1D1F]" : ""} /></button>
          <CompareButton productId={product.id} name={product.name} />
        </div>
        <p className="mt-3 flex items-center gap-2 text-sm text-[#6E6E73]"><Star size={15} /> {product.rating.toFixed(1)} ({product.reviewCount} reviews)</p>
      </div>
      <p className="leading-7 text-[#6E6E73]">{product.description}</p>
      <p className={`text-sm font-medium ${product.inStock ? "text-emerald-700" : "text-[#86868B]"}`}>{product.inStock ? "In stock" : "Out of stock"}</p>
      {product.colors?.length ? (
        <fieldset>
          <legend className="mb-3 text-sm font-medium">Color: {product.colors.find((variant) => variant.value === color)?.label}</legend>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((variant) => <button key={variant.value} type="button" title={variant.label} aria-label={variant.label} aria-pressed={color === variant.value} disabled={variant.available === false} onClick={() => setColor(variant.value)} className={`flex size-10 items-center justify-center rounded-full border-2 disabled:opacity-40 ${color === variant.value ? "border-black" : "border-black/10"}`}><span className="size-7 rounded-full border border-black/10" style={{ backgroundColor: variant.value }} /></button>)}
          </div>
        </fieldset>
      ) : null}
      {product.storage?.length ? (
        <fieldset>
          <legend className="mb-3 text-sm font-medium">Storage</legend>
          <div className="flex flex-wrap gap-2">
            {product.storage.map((variant) => <label key={variant.value} className={`cursor-pointer rounded-lg border px-4 py-3 text-sm has-[:disabled]:opacity-40 ${storage === variant.value ? "border-black" : "border-black/10"}`}><input type="radio" name={`storage-${product.id}`} value={variant.value} checked={storage === variant.value} disabled={variant.available === false} onChange={() => setStorage(variant.value)} className="sr-only" />{variant.label}</label>)}
          </div>
        </fieldset>
      ) : null}
      <div className="grid gap-3">
        <button type="button" disabled={unavailable} onClick={() => { onPurchase?.(); addToCart(product, { color, storage }); }} className="h-12 rounded-full bg-[#1D1D1F] px-5 text-sm font-semibold text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-40">Add to cart</button>
        <button type="button" disabled={unavailable} onClick={() => { onPurchase?.(); buyNow(product, { color, storage }); }} className="h-12 rounded-full border border-[#1D1D1F] px-5 text-sm font-semibold hover:bg-[#F5F5F7] disabled:cursor-not-allowed disabled:opacity-40">Buy now</button>
      </div>
      {product.longDescription?.length ? (
        <section className="space-y-4 border-t border-black/10 pt-6">
          <h2 className="text-lg font-semibold">About this product</h2>
          {product.longDescription.map((paragraph) => <p key={paragraph} className="text-sm leading-7 text-[#6E6E73]">{paragraph}</p>)}
          {product.manufacturerUrl && <a href={product.manufacturerUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-sm text-[#0066CC] underline underline-offset-4">Manufacturer details</a>}
        </section>
      ) : null}
      <div className="border-t border-black/10 pt-6">
        <h2 className="mb-4 text-lg font-semibold">Highlights</h2>
        <ul className="space-y-3">{product.features.map((feature) => <li key={feature} className="flex items-start gap-3 text-sm leading-6"><Check size={17} className="mt-1 shrink-0" />{feature}</li>)}</ul>
      </div>
      <div className="border-t border-black/10 pt-6">
        <h2 className="mb-3 text-lg font-semibold">Specifications</h2>
        <dl>{Object.entries(specifications).map(([label, value]) => <div key={label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-4 border-b border-black/[0.06] py-3 text-sm"><dt className="text-[#6E6E73]">{label}</dt><dd>{value}</dd></div>)}</dl>
      </div>
    </div>
  );
}
