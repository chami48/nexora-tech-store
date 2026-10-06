"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, PackageSearch } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { ProductGrid } from "@/components/product/product-grid";
import { products } from "@/data/products";
import type { ProductCategory } from "@/types/product";

type SortOption = "featured" | "price-low" | "price-high" | "rating" | "newest";

const categoryOptions: {
  label: string;
  value: ProductCategory;
}[] = [
  {
    label: "Laptops",
    value: "laptops",
  },
  {
    label: "Smartphones",
    value: "phones",
  },
  {
    label: "Audio",
    value: "audio",
  },
  {
    label: "Gaming",
    value: "gaming",
  },
  {
    label: "Accessories",
    value: "accessories",
  },
];

function isProductCategory(value: string | null): value is ProductCategory {
  return categoryOptions.some((category) => category.value === value);
}

export function ShopContent() {
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();

  const categoryFromUrl = searchParams.get("category");

  const [search, setSearch] = useState("");

  const [selectedCategories, setSelectedCategories] = useState<
    ProductCategory[]
  >(isProductCategory(categoryFromUrl) ? [categoryFromUrl] : []);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const [sort, setSort] = useState<SortOption>("featured");

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  /*
   * Keep the shop filter in sync when somebody enters from:
   *
   * /shop?category=laptops
   * /shop?category=phones
   * etc.
   */
  // useEffect(() => {
  //   if (isProductCategory(categoryFromUrl)) {
  //     setSelectedCategories([categoryFromUrl]);
  //   } else {
  //     setSelectedCategories([]);
  //   }
  // }, [categoryFromUrl]);

  /*
   * Prevent background scrolling while the mobile
   * filter drawer is open.
   */
  useEffect(() => {
    if (!mobileFiltersOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileFiltersOpen]);

  /*
   * Generate brands directly from product data.
   * This means adding a new brand to products.ts
   * automatically adds it to the filter.
   */
  const brands = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.brand))).sort();
  }, []);

  /*
   * Product count for each category.
   */
  const categoryCounts = useMemo(() => {
    return categoryOptions.reduce(
      (result, category) => {
        result[category.value] = products.filter(
          (product) => product.category === category.value,
        ).length;

        return result;
      },
      {} as Record<ProductCategory, number>,
    );
  }, []);

  /*
   * Product count for each brand.
   */
  const brandCounts = useMemo(() => {
    return brands.reduce(
      (result, brand) => {
        result[brand] = products.filter(
          (product) => product.brand === brand,
        ).length;

        return result;
      },
      {} as Record<string, number>,
    );
  }, [brands]);

  /*
   * Main filtering + sorting.
   */
  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.brand.toLowerCase().includes(normalizedSearch) ||
        product.tagline.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      const matchesAvailability = !inStockOnly || product.inStock;

      return (
        matchesSearch && matchesCategory && matchesBrand && matchesAvailability
      );
    });

    return [...result].sort((a, b) => {
      switch (sort) {
        case "price-low":
          return a.price - b.price;

        case "price-high":
          return b.price - a.price;

        case "rating":
          return b.rating - a.rating;

        case "newest":
          return Number(b.newArrival) - Number(a.newArrival);

        case "featured":
        default:
          return Number(b.featured) - Number(a.featured);
      }
    });
  }, [search, selectedCategories, selectedBrands, inStockOnly, sort]);

  const activeFilterCount =
    selectedCategories.length + selectedBrands.length + (inStockOnly ? 1 : 0);

  function toggleCategory(category: ProductCategory) {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  }

  function toggleBrand(brand: string) {
    setSelectedBrands((current) =>
      current.includes(brand)
        ? current.filter((item) => item !== brand)
        : [...current, brand],
    );
  }

  function clearFilters() {
    setSearch("");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setInStockOnly(false);
    setSort("featured");
  }

  const filterContent = (
    <div className="space-y-8">
      {/* CATEGORY */}
      <FilterSection title="Category">
        <div className="space-y-3">
          {categoryOptions.map((category) => (
            <FilterCheckbox
              key={category.value}
              label={category.label}
              count={categoryCounts[category.value]}
              checked={selectedCategories.includes(category.value)}
              onChange={() => toggleCategory(category.value)}
            />
          ))}
        </div>
      </FilterSection>

      {/* BRAND */}
      <FilterSection title="Brand">
        <div className="space-y-3">
          {brands.map((brand) => (
            <FilterCheckbox
              key={brand}
              label={brand}
              count={brandCounts[brand]}
              checked={selectedBrands.includes(brand)}
              onChange={() => toggleBrand(brand)}
            />
          ))}
        </div>
      </FilterSection>

      {/* AVAILABILITY */}
      <FilterSection title="Availability">
        <FilterCheckbox
          label="In stock only"
          count={products.filter((product) => product.inStock).length}
          checked={inStockOnly}
          onChange={() => setInStockOnly((current) => !current)}
        />
      </FilterSection>

      {/* RESET */}
      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={clearFilters}
          className="
            text-sm
            font-medium
            text-[#0066CC]
            transition-colors
            hover:text-[#004E9E]
          "
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <main className="min-h-screen bg-[#F7F7F8]">
        {/* ==================================================
            SHOP HEADER
        =================================================== */}
        <section
          className="
            border-b
            border-black/[0.06]
            bg-white
            h-16
            lg:h-[72px]
          "
        >
          <div className="nexora-container">
            {/* <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 18,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p
                className="
                  mb-3
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#86868B]
                "
              >
                NEXORA COLLECTION
              </p>

              <h1
                className="
                  text-[40px]
                  font-semibold
                  leading-none
                  tracking-[-0.045em]
                  text-[#1D1D1F]
                  sm:text-[52px]
                  lg:text-[62px]
                "
              >
                Shop technology.
              </h1>

              <p
                className="
                  mt-5
                  max-w-xl
                  text-[15px]
                  leading-7
                  text-[#6E6E73]
                  sm:text-base
                "
              >
                Discover laptops, smartphones, audio, gaming gear and everyday
                tech selected for performance, design and reliability.
              </p>
            </motion.div> */}
          </div>
        </section>

        {/* ==================================================
            SHOP CONTENT
        =================================================== */}
        <section className="py-10 sm:py-12 lg:py-16">
          <div className="nexora-container">
            <div
              className="
                grid
                gap-10
                lg:grid-cols-[230px_minmax(0,1fr)]
                xl:grid-cols-[250px_minmax(0,1fr)]
                xl:gap-14
              "
            >
              {/* DESKTOP SIDEBAR */}
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <div
                    className="
                      mb-7
                      flex
                      items-center
                      justify-between
                      border-b
                      border-black/[0.07]
                      pb-4
                    "
                  >
                    <h2
                      className="
                        text-sm
                        font-semibold
                        text-[#1D1D1F]
                      "
                    >
                      Filters
                    </h2>

                    {activeFilterCount > 0 && (
                      <span
                        className="
                          rounded-full
                          bg-[#1D1D1F]
                          px-2
                          py-0.5
                          text-[10px]
                          font-semibold
                          text-white
                        "
                      >
                        {activeFilterCount}
                      </span>
                    )}
                  </div>

                  {filterContent}
                </div>
              </aside>

              {/* PRODUCTS */}
              <div className="min-w-0">
                {/* TOOLBAR */}
                <div
                  className="
                    mb-8
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    gap-4
                    border-b
                    border-black/[0.06]
                    pb-5
                  "
                >
                  <div className="flex items-center gap-3">
                    {/* MOBILE FILTER BUTTON */}
                    <button
                      type="button"
                      onClick={() => setMobileFiltersOpen(true)}
                      className="
                        inline-flex
                        h-11
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-black/[0.08]
                        bg-white
                        px-4
                        text-sm
                        font-medium
                        text-[#1D1D1F]
                        shadow-sm
                        lg:hidden
                      "
                    >
                      <SlidersHorizontal size={16} strokeWidth={1.7} />
                      Filters
                      {activeFilterCount > 0 && (
                        <span
                          className="
                            flex
                            size-5
                            items-center
                            justify-center
                            rounded-full
                            bg-[#1D1D1F]
                            text-[10px]
                            text-white
                          "
                        >
                          {activeFilterCount}
                        </span>
                      )}
                    </button>

                    <p
                      className="
                        text-sm
                        text-[#6E6E73]
                      "
                    >
                      <span
                        className="
                          font-semibold
                          text-[#1D1D1F]
                        "
                      >
                        {filteredProducts.length}
                      </span>{" "}
                      {filteredProducts.length === 1 ? "product" : "products"}
                    </p>
                  </div>

                  <div className="relative order-last w-full min-w-0 sm:order-none sm:w-auto sm:flex-1">
                    <Search size={18} strokeWidth={1.7} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#86868B]" />
                    <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products, brands or categories..." aria-label="Search products" className="h-11 w-full rounded-full border border-black/[0.07] bg-[#F5F5F7] pl-12 pr-11 text-[14px] text-[#1D1D1F] outline-none transition-all placeholder:text-[#9A9A9F] focus:border-[#0066CC]/35 focus:bg-white focus:ring-4 focus:ring-[#0066CC]/[0.07]" />
                    {search && <button type="button" onClick={() => setSearch("")} aria-label="Clear search" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1D1D1F]"><X size={17} /></button>}
                  </div>

                  {/* SORT */}
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="product-sort"
                      className="
                        hidden
                        text-xs
                        text-[#86868B]
                        sm:block
                      "
                    >
                      Sort by
                    </label>

                    <select
                      id="product-sort"
                      value={sort}
                      onChange={(event) =>
                        setSort(event.target.value as SortOption)
                      }
                      className="
                        h-11
                        cursor-pointer
                        rounded-full
                        border
                        border-black/[0.08]
                        bg-white
                        px-4
                        pr-9
                        text-[13px]
                        font-medium
                        text-[#1D1D1F]
                        outline-none
                        transition
                        focus:border-[#0066CC]/40
                        focus:ring-4
                        focus:ring-[#0066CC]/[0.06]
                      "
                    >
                      <option value="featured">Featured</option>

                      <option value="newest">New arrivals</option>

                      <option value="rating">Highest rated</option>

                      <option value="price-low">Price: Low to high</option>

                      <option value="price-high">Price: High to low</option>
                    </select>
                  </div>
                </div>

                {/* ACTIVE FILTERS */}
                {(selectedCategories.length > 0 ||
                  selectedBrands.length > 0 ||
                  inStockOnly) && (
                  <div
                    className="
                      mb-8
                      flex
                      flex-wrap
                      gap-2
                    "
                  >
                    {selectedCategories.map((category) => (
                      <ActiveFilter
                        key={category}
                        label={
                          categoryOptions.find(
                            (item) => item.value === category,
                          )?.label ?? category
                        }
                        onRemove={() => toggleCategory(category)}
                      />
                    ))}

                    {selectedBrands.map((brand) => (
                      <ActiveFilter
                        key={brand}
                        label={brand}
                        onRemove={() => toggleBrand(brand)}
                      />
                    ))}

                    {inStockOnly && (
                      <ActiveFilter
                        label="In stock"
                        onRemove={() => setInStockOnly(false)}
                      />
                    )}
                  </div>
                )}

                {/* PRODUCT GRID */}
                {filteredProducts.length > 0 ? (
                  <ProductGrid products={filteredProducts} columns={3} />
                ) : (
                  <EmptyProducts onReset={clearFilters} />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ====================================================
          MOBILE FILTER DRAWER
      ===================================================== */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close filters"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() => setMobileFiltersOpen(false)}
              className="
                fixed
                inset-0
                z-[80]
                bg-black/30
                backdrop-blur-[2px]
                lg:hidden
              "
            />

            <motion.aside
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      x: "-100%",
                    }
              }
              animate={{
                x: 0,
              }}
              exit={{
                x: "-100%",
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                fixed
                inset-y-0
                left-0
                z-[90]
                flex
                w-[88%]
                max-w-[390px]
                flex-col
                bg-white
                shadow-[20px_0_60px_rgba(0,0,0,0.12)]
                lg:hidden
              "
            >
              {/* DRAWER HEADER */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-black/[0.07]
                  px-6
                  py-5
                "
              >
                <div className="flex items-center gap-3">
                  <h2
                    className="
                      text-lg
                      font-semibold
                      tracking-[-0.02em]
                      text-[#1D1D1F]
                    "
                  >
                    Filters
                  </h2>

                  {activeFilterCount > 0 && (
                    <span
                      className="
                        flex
                        size-6
                        items-center
                        justify-center
                        rounded-full
                        bg-[#1D1D1F]
                        text-[10px]
                        font-semibold
                        text-white
                      "
                    >
                      {activeFilterCount}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  aria-label="Close filters"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="
                    flex
                    size-10
                    items-center
                    justify-center
                    rounded-full
                    bg-[#F5F5F7]
                    text-[#1D1D1F]
                    transition
                    hover:bg-[#ECECEF]
                  "
                >
                  <X size={18} />
                </button>
              </div>

              {/* DRAWER CONTENT */}
              <div
                className="
                  flex-1
                  overflow-y-auto
                  px-6
                  py-7
                "
              >
                {filterContent}
              </div>

              {/* DRAWER FOOTER */}
              <div
                className="
                  border-t
                  border-black/[0.07]
                  bg-white
                  p-5
                "
              >
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="
                    flex
                    h-12
                    w-full
                    items-center
                    justify-center
                    rounded-full
                    bg-[#1D1D1F]
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-black
                  "
                >
                  Show {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "product" : "products"}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* =========================================================
   FILTER SECTION
========================================================= */

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        border-b
        border-black/[0.07]
        pb-7
      "
    >
      <h3
        className="
          mb-4
          text-[13px]
          font-semibold
          text-[#1D1D1F]
        "
      >
        {title}
      </h3>

      {children}
    </div>
  );
}

/* =========================================================
   CHECKBOX
========================================================= */

function FilterCheckbox({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className="
        group
        flex
        cursor-pointer
        items-center
        justify-between
        gap-4
      "
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="
            size-4
            cursor-pointer
            rounded
            border-black/20
            accent-[#1D1D1F]
          "
        />

        <span
          className="
            text-[13px]
            text-[#6E6E73]
            transition-colors
            group-hover:text-[#1D1D1F]
          "
        >
          {label}
        </span>
      </div>

      {typeof count === "number" && (
        <span
          className="
            text-[11px]
            text-[#A1A1A6]
          "
        >
          {count}
        </span>
      )}
    </label>
  );
}

/* =========================================================
   ACTIVE FILTER
========================================================= */

function ActiveFilter({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="
        inline-flex
        h-9
        items-center
        gap-2
        rounded-full
        border
        border-black/[0.07]
        bg-white
        px-3.5
        text-xs
        font-medium
        text-[#454548]
        shadow-sm
        transition
        hover:border-black/[0.12]
      "
    >
      {label}

      <X size={13} strokeWidth={1.8} className="text-[#86868B]" />
    </button>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyProducts({ onReset }: { onReset: () => void }) {
  return (
    <div
      className="
        flex
        min-h-[440px]
        flex-col
        items-center
        justify-center
        rounded-[28px]
        border
        border-black/[0.05]
        bg-white
        px-6
        text-center
      "
    >
      <div
        className="
          flex
          size-16
          items-center
          justify-center
          rounded-full
          bg-[#F2F4F6]
          text-[#6E6E73]
        "
      >
        <PackageSearch size={27} strokeWidth={1.4} />
      </div>

      <h2
        className="
          mt-6
          text-[24px]
          font-semibold
          tracking-[-0.035em]
          text-[#1D1D1F]
        "
      >
        No products found.
      </h2>

      <p
        className="
          mt-3
          max-w-sm
          text-sm
          leading-6
          text-[#86868B]
        "
      >
        Try changing your search or removing some of the selected filters.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="
          mt-6
          h-11
          rounded-full
          bg-[#1D1D1F]
          px-6
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-black
        "
      >
        Reset filters
      </button>
    </div>
  );
}
