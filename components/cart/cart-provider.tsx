"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { products } from "@/data/products";
import type { Product } from "@/types/product";

type CartItem = { key: string; productId: string; quantity: number; color?: string; storage?: string };
type Options = { color?: string; storage?: string };
const storageKey = "nexora-cart-v1";
const listeners = new Set<() => void>();
let snapshot = "[]";
let storageAvailable = true;

function readSnapshot() {
  if (storageAvailable) {
    try { snapshot = localStorage.getItem(storageKey) ?? "[]"; } catch { storageAvailable = false; }
  }
  return snapshot;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => { listeners.delete(listener); window.removeEventListener("storage", listener); };
}

function parseItems(raw: string): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is CartItem => {
      if (!item || typeof item !== "object") return false;
      return typeof item.key === "string" && typeof item.productId === "string" && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99 && products.some((product) => product.id === item.productId);
    });
  } catch { return []; }
}

function writeItems(items: CartItem[]) {
  snapshot = JSON.stringify(items);
  if (storageAvailable) {
    try { localStorage.setItem(storageKey, snapshot); } catch { storageAvailable = false; }
  }
  listeners.forEach((listener) => listener());
}

export function formatCartPrice(value: number) {
  return new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(value);
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  openCart: () => void;
  addToCart: (product: Product, options?: Options) => void;
  buyNow: (product: Product, options?: Options) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
};
const CartContext = createContext<CartContextValue | null>(null);
const subscribeHydration = () => () => {};
const clientHydrated = () => true;
const serverHydrated = () => false;

export function useCart() {
  const cart = useContext(CartContext);
  // A delayed Suspense boundary must hydrate with the server's empty cart.
  const hydrated = useSyncExternalStore(subscribeHydration, clientHydrated, serverHydrated);
  if (!cart) throw new Error("CartProvider is required");
  return hydrated ? cart : { ...cart, items: [], count: 0, subtotal: 0 };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const raw = useSyncExternalStore(subscribe, readSnapshot, () => "[]");
  const items = useMemo(() => parseItems(raw), [raw]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + products.find((product) => product.id === item.productId)!.price * item.quantity, 0);

  function add(product: Product, options?: Options) {
    if (!product.inStock) return false;
    const color = options?.color ?? product.colors?.find((variant) => variant.available !== false)?.value;
    const storage = options?.storage ?? product.storage?.find((variant) => variant.available !== false)?.value;
    const key = JSON.stringify([product.id, color, storage]);
    const current = parseItems(readSnapshot());
    const existing = current.find((item) => item.key === key);
    writeItems(existing ? current.map((item) => item.key === key ? { ...item, quantity: Math.min(99, item.quantity + 1) } : item) : [...current, { key, productId: product.id, quantity: 1, color, storage }]);
    return true;
  }

  const value: CartContextValue = {
    items, count, subtotal,
    openCart: () => setOpen(true),
    addToCart: (product, options) => { if (add(product, options)) setOpen(true); },
    buyNow: (product, options) => { if (add(product, options)) { setOpen(false); router.push("/checkout"); } },
    updateQuantity: (key, quantity) => { if (Number.isInteger(quantity) && quantity >= 1 && quantity <= 99) writeItems(parseItems(readSnapshot()).map((item) => item.key === key ? { ...item, quantity } : item)); },
    removeItem: (key) => writeItems(parseItems(readSnapshot()).filter((item) => item.key !== key)),
  };

  return <CartContext.Provider value={value}>{children}{open && <CartDrawer onClose={() => setOpen(false)} />}</CartContext.Provider>;
}

export function CartLines() {
  const { items, updateQuantity, removeItem } = useCart();
  return <div className="divide-y divide-black/[0.07]">{items.map((item) => {
    const product = products.find((product) => product.id === item.productId)!;
    const variants = [product.colors?.find((variant) => variant.value === item.color)?.label, product.storage?.find((variant) => variant.value === item.storage)?.label].filter(Boolean).join(" / ");
    return <div key={item.key} className="flex gap-4 py-6">
      <div className="relative size-24 shrink-0 rounded-lg bg-[#F5F5F7]"><Image src={product.image} alt={product.name} fill sizes="96px" className="object-contain p-2" /></div>
      <div className="min-w-0 flex-1"><p className="text-xs text-[#86868B]">{product.brand}</p><p className="mt-1 text-sm font-semibold">{product.name}</p>{variants && <p className="mt-1 text-xs text-[#6E6E73]">{variants}</p>}<p className="mt-2 text-sm font-medium">{formatCartPrice(product.price * item.quantity)}</p>
        <div className="mt-3 flex items-center justify-between gap-3"><div className="flex h-9 items-center rounded-full border border-black/10"><button type="button" aria-label={`Decrease ${product.name} quantity`} disabled={item.quantity === 1} onClick={() => updateQuantity(item.key, item.quantity - 1)} className="flex size-9 items-center justify-center disabled:opacity-30"><Minus size={14} /></button><span className="w-6 text-center text-sm" aria-live="polite">{item.quantity}</span><button type="button" aria-label={`Increase ${product.name} quantity`} disabled={item.quantity === 99} onClick={() => updateQuantity(item.key, item.quantity + 1)} className="flex size-9 items-center justify-center disabled:opacity-30"><Plus size={14} /></button></div><button type="button" aria-label={`Remove ${product.name}`} onClick={() => removeItem(item.key)} className="flex size-9 items-center justify-center text-[#86868B] hover:text-red-600"><Trash2 size={16} /></button></div>
      </div>
    </div>;
  })}</div>;
}

function CartDrawer({ onClose }: { onClose: () => void }) {
  const { count, subtotal, addToCart } = useCart();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const dialog = dialogRef.current;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = overflow; };
  }, []);
  return <dialog ref={dialogRef} aria-label="Shopping bag" onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} className="fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-full max-w-[480px] overflow-hidden bg-white p-0 text-[#1D1D1F] shadow-2xl backdrop:bg-black/30 backdrop:backdrop-blur-sm">
    <motion.div initial={reduceMotion ? false : { x: "100%" }} animate={{ x: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="flex h-full flex-col">
      <div className="flex shrink-0 items-center justify-between border-b border-black/[0.07] px-6 py-5"><div><h2 className="text-xl font-semibold">Your bag <span className="ml-2 text-sm font-normal text-[#86868B]">({count})</span></h2><p className="mt-1 text-xs text-[#86868B]">Thoughtfully selected. Ready for you.</p></div><button type="button" autoFocus aria-label="Close shopping bag" onClick={onClose} className="flex size-10 items-center justify-center rounded-full hover:bg-[#F5F5F7]"><X size={20} /></button></div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6">{count ? <CartLines /> : <div className="py-8"><div className="py-8 text-center"><ShoppingBag size={40} strokeWidth={1.2} className="mx-auto text-[#86868B]" /><h3 className="mt-5 text-xl font-semibold">Your bag is empty</h3><p className="mt-2 text-sm text-[#6E6E73]">Find something worth bringing home.</p><Link href="/shop" onClick={onClose} className="mt-5 inline-flex items-center gap-2 text-sm font-medium">Explore the collection<ArrowRight size={16} /></Link></div><h3 className="mt-5 border-t border-black/10 pt-6 text-sm font-semibold">Selected for you</h3>{products.filter((product) => product.inStock).slice(0, 3).map((product) => <div key={product.id} className="flex items-center gap-3 py-4"><div className="relative size-16 shrink-0 rounded-lg bg-[#F5F5F7]"><Image src={product.image} alt={product.name} fill sizes="64px" className="object-contain p-2" /></div><div className="min-w-0 flex-1"><p className="text-sm font-medium">{product.name}</p><p className="mt-1 text-xs text-[#6E6E73]">{formatCartPrice(product.price)}</p></div><button type="button" aria-label={`Add ${product.name} to cart`} onClick={() => addToCart(product)} className="flex size-9 items-center justify-center rounded-full border border-black/10"><Plus size={16} /></button></div>)}</div>}</div>
      {count > 0 && <div className="shrink-0 border-t border-black/[0.07] bg-white p-6"><div className="flex justify-between text-base font-semibold"><span>Subtotal</span><span>{formatCartPrice(subtotal)}</span></div><p className="mt-2 text-xs text-[#86868B]">Delivery is confirmed before placing your order.</p><Link href="/checkout" onClick={onClose} className="mt-5 flex h-12 items-center justify-center gap-3 rounded-full bg-[#1D1D1F] text-sm font-semibold text-white hover:bg-black">Checkout now<ArrowRight size={17} /></Link><button type="button" onClick={onClose} className="mt-3 w-full py-2 text-sm text-[#6E6E73]">Continue shopping</button></div>}
    </motion.div>
  </dialog>;
}
