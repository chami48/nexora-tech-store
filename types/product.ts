export type ProductCategory =
  | "laptops"
  | "phones"
  | "audio"
  | "gaming"
  | "accessories";

export type ProductBadge =
  | "New"
  | "Popular"
  | "Best Seller"
  | "Limited";

export interface ProductVariant {
  label: string;
  value: string;
  available?: boolean;
  price?: number;
  specifications?: Record<string, string>;
}

export interface Product {
  id: string;
  slug: string;

  name: string;
  brand: string;
  category: ProductCategory;

  tagline: string;
  description: string;
  longDescription?: string[];
  manufacturerUrl?: string;

  price: number;
  originalPrice?: number;

  rating: number;
  reviewCount: number;

  image: string;
  gallery: string[];

  badge?: ProductBadge;

  inStock: boolean;
  featured?: boolean;
  newArrival?: boolean;

  colors?: ProductVariant[];
  storage?: ProductVariant[];

  features: string[];

  specifications: Record<string, string>;
}
