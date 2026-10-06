import type { ProductCategory } from "@/types/product";

export interface Category {
  name: string;
  slug: ProductCategory;
  tagline: string;
  image: string;
}

export const categories = [
  {
    name: "Laptops",
    slug: "laptops",
    tagline: "Power meets portability",
    image: "/images/categories/laptops.png",
  },
  {
    name: "Smartphones",
    slug: "phones",
    tagline: "Connected beautifully",
    image: "/images/categories/phones.png",
  },
  {
    name: "Audio",
    slug: "audio",
    tagline: "Hear every detail",
    image: "/images/categories/audio.png",
  },
  {
    name: "Gaming",
    slug: "gaming",
    tagline: "Play without limits",
    image: "/images/categories/gaming.png",
  },
  {
    name: "Accessories",
    slug: "accessories",
    tagline: "Complete your setup",
    image: "/images/categories/accessories.png",
  },
] as const;