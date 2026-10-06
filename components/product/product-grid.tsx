import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/product-card";

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
}

export function ProductGrid({
  products,
  columns = 4,
}: ProductGridProps) {
  const desktopColumns =
    columns === 3
      ? "lg:grid-cols-3"
      : "lg:grid-cols-4";

  return (
    <div
      className={`
        grid
        grid-cols-1
        gap-x-5
        gap-y-12
        sm:grid-cols-2
        ${desktopColumns}
        lg:gap-x-6
        lg:gap-y-14
      `}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}