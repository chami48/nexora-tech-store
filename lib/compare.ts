import { products } from "@/data/products";

export const compareKey = "nexora-compare-v1";
export const compareLimit = 3;

export function parseCompareIds(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? [...new Set(value.filter((id): id is string =>
      typeof id === "string" && products.some((product) => product.id === id),
    ))].slice(0, compareLimit) : [];
  } catch { return []; }
}

export function addCompareId(ids: string[], id: string) {
  const current = parseCompareIds(JSON.stringify(ids));
  return current.includes(id) || current.length >= compareLimit || !products.some((product) => product.id === id)
    ? current : [...current, id];
}

export function removeCompareId(ids: string[], id: string) {
  return ids.filter((item) => item !== id);
}

export function createCompareStore(getStorage: () => Pick<Storage, "getItem" | "setItem">) {
  let snapshot = "[]";
  let storageAvailable = true;
  const listeners = new Set<() => void>();
  const read = () => {
    if (storageAvailable) {
      try { snapshot = JSON.stringify(parseCompareIds(getStorage().getItem(compareKey) ?? "[]")); }
      catch { storageAvailable = false; }
    }
    return snapshot;
  };
  const write = (ids: string[]) => {
    snapshot = JSON.stringify(parseCompareIds(JSON.stringify(ids)));
    if (storageAvailable) {
      try { getStorage().setItem(compareKey, snapshot); } catch { storageAvailable = false; }
    }
    listeners.forEach((listener) => listener());
  };
  return {
    read,
    subscribe: (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; },
    add: (id: string) => write(addCompareId(parseCompareIds(read()), id)),
    remove: (id: string) => write(removeCompareId(parseCompareIds(read()), id)),
    clear: () => write([]),
  };
}

export function hasDifferentValues(values: string[]) {
  return new Set(values.map((value) => value.trim().toLowerCase())).size > 1;
}
