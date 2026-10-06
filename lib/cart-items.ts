import { products } from "@/data/products";
import { getProductPrice } from "@/lib/product-options";

export type CartItem = { key: string; productId: string; quantity: number; unitPrice: number; color?: string; storage?: string };

export function parseCartItems(raw: string): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item) => {
      if (!item || typeof item !== "object" || typeof item.key !== "string" || typeof item.productId !== "string" || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99 || (item.color !== undefined && typeof item.color !== "string") || (item.storage !== undefined && typeof item.storage !== "string")) return [];
      const product = products.find((product) => product.id === item.productId);
      if (!product) return [];
      return [{
        key: item.key, productId: item.productId, quantity: item.quantity,
        color: item.color, storage: item.storage,
        unitPrice: Number.isFinite(item.unitPrice) && item.unitPrice >= 0 ? item.unitPrice : getProductPrice(product, item.storage),
      }];
    });
  } catch { return []; }
}
