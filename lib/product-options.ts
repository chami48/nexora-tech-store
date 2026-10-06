import type { Product } from "@/types/product";

export function getProductPrice(product: Product, storage?: string) {
  return product.storage?.find((variant) => variant.value === storage)?.price ?? product.price;
}

export function getProductSpecifications(product: Product, storage?: string) {
  const variant = product.storage?.find((variant) => variant.value === storage);
  return {
    ...product.specifications,
    ...(variant ? { Storage: variant.label } : {}),
    ...variant?.specifications,
  };
}
