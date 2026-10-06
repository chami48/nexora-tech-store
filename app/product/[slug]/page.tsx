import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductGrid } from "@/components/product/product-grid";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug((await params).slug);
  return { title: product?.name ?? "Product not found", description: product?.description };
}

export default async function ProductPage({ params }: Props) {
  const product = getProductBySlug((await params).slug);
  if (!product) notFound();
  const related = products.filter((item) => item.id !== product.id && item.category === product.category);
  return (
    <main className="bg-white pb-16 pt-28 text-[#1D1D1F]">
      <div className="nexora-container">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-sm text-[#6E6E73]"><Link href="/shop">Shop</Link><span>/</span><Link href={`/shop?category=${product.category}`}>{product.category}</Link><span>/</span><span>{product.name}</span></nav>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>
        {related.length > 0 && <section className="mt-16 border-t border-black/10 pt-10"><h2 className="mb-8 text-2xl font-semibold">Related products</h2><ProductGrid products={related} /></section>}
      </div>
    </main>
  );
}
