import { Benefits } from "@/components/home/benefits";
import { BrandStrip } from "@/components/home/brand-strip";
import { Categories } from "@/components/home/categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Hero } from "@/components/home/hero";
import { NewArrivals } from "@/components/home/new-arrivals";
import { Newsletter } from "@/components/home/newsletter";
import { ProductSpotlight } from "@/components/home/product-spotlight";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <Benefits />

      <Categories />

      <FeaturedProducts />

      <ProductSpotlight />

      <NewArrivals />

      <BrandStrip />

      <Newsletter />
    </main>
  );
}
