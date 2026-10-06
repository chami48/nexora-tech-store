"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import { compareLimit, createCompareStore, parseCompareIds } from "@/lib/compare";
import { CompareDock } from "./compare-dock";

const store = createCompareStore(() => localStorage);
function subscribe(listener: () => void) {
  const unsubscribe = store.subscribe(listener);
  window.addEventListener("storage", listener);
  return () => { unsubscribe(); window.removeEventListener("storage", listener); };
}
const CompareContext = createContext<{
  ids: string[]; add: (id: string) => void; remove: (id: string) => void; clear: () => void;
} | null>(null);
const subscribeHydration = () => () => {};

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const raw = useSyncExternalStore(subscribe, store.read, () => "[]");
  const ids = useMemo(() => parseCompareIds(raw), [raw]);
  return <CompareContext.Provider value={{ ids, add: store.add, remove: store.remove, clear: store.clear }}>
    {children}
    <CompareDock />
  </CompareContext.Provider>;
}

export function useCompare() {
  const compare = useContext(CompareContext);
  const hydrated = useSyncExternalStore(subscribeHydration, () => true, () => false);
  if (!compare) throw new Error("CompareProvider is required");
  const ids = hydrated ? compare.ids : [];
  return { ...compare, ids, full: ids.length >= compareLimit };
}
