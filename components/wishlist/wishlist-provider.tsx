"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import { products } from "@/data/products";

const key = "nexora-wishlist-v1";
const eventName = "nexora-wishlist-change";
let snapshot = "[]";
let storageAvailable = true;
function read() {
  if (storageAvailable) {
    try { snapshot = localStorage.getItem(key) ?? "[]"; } catch { storageAvailable = false; }
  }
  return snapshot;
}
function parse(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? [...new Set(value.filter((id): id is string =>
      typeof id === "string" && products.some((product) => product.id === id),
    ))] : [];
  } catch { return []; }
}
function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(eventName, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(eventName, listener);
  };
}
const WishlistContext = createContext<{ ids: string[]; toggle: (id: string) => void } | null>(null);
const subscribeHydration = () => () => {};

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const raw = useSyncExternalStore(subscribe, read, () => "[]");
  const ids = useMemo(() => parse(raw), [raw]);
  function toggle(id: string) {
    if (!products.some((product) => product.id === id)) return;
    const current = parse(read());
    snapshot = JSON.stringify(current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    try { localStorage.setItem(key, snapshot); } catch { storageAvailable = false; }
    window.dispatchEvent(new Event(eventName));
  }
  return <WishlistContext.Provider value={{ ids, toggle }}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const wishlist = useContext(WishlistContext);
  const hydrated = useSyncExternalStore(subscribeHydration, () => true, () => false);
  if (!wishlist) throw new Error("WishlistProvider is required");
  return hydrated ? wishlist : { ...wishlist, ids: [] };
}
