import { products } from "@/data/products";
import type { CartItem } from "@/lib/cart-items";

export const checkoutDraftKey = "nexora-checkout-draft-v1";
export const ordersKey = "nexora-demo-orders-v1";
export const enquiryKey = "nexora-order-enquiry-v1";
export type Customer = {
  name: string; email: string; phone: string; address: string; city: string; postal: string; notes: string;
};

export function readCustomer(data: FormData): Customer {
  return Object.fromEntries(["name", "email", "phone", "address", "city", "postal", "notes"].map((key) =>
    [key, String(data.get(key) ?? "").trim()],
  )) as Customer;
}

export function validateCustomer(customer: Customer) {
  if (customer.name.length < 2 || customer.name.length > 120) return "Enter your full name (2-120 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email) || customer.email.length > 254) return "Enter a valid email address.";
  if (!/^[+\d\s()-]+$/.test(customer.phone) || !/^\d{7,15}$/.test(customer.phone.replace(/\D/g, ""))) return "Enter a valid phone number.";
  if (customer.address.length < 5 || customer.address.length > 300) return "Enter a street address (5-300 characters).";
  if (customer.city.length < 2 || customer.city.length > 100) return "Enter your city (2-100 characters).";
  if (!/^[\w -]{3,12}$/.test(customer.postal)) return "Enter a valid postal code (3-12 characters).";
  if (customer.notes.length > 2000) return "Keep order notes under 2,000 characters.";
  return "";
}

export function snapshotItems(items: CartItem[]) {
  return items.map((item) => {
    const product = products.find((product) => product.id === item.productId);
    if (!product || !product.inStock || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99 || !Number.isFinite(item.unitPrice) || item.unitPrice < 0) throw new Error("Check your cart before ordering.");
    if (product.colors?.length && !product.colors.some((variant) => variant.value === item.color && variant.available !== false)) throw new Error("A selected color is unavailable.");
    if (product.storage?.length && !product.storage.some((variant) => variant.value === item.storage && variant.available !== false)) throw new Error("A selected storage option is unavailable.");
    return {
      ...item, name: product.name, slug: product.slug,
      variants: {
        color: product.colors?.find((variant) => variant.value === item.color)?.label ?? item.color,
        storage: product.storage?.find((variant) => variant.value === item.storage)?.label ?? item.storage,
      },
      lineTotal: item.unitPrice * item.quantity,
    };
  });
}

export function createDemoOrder(items: CartItem[], customer: Customer, storage: Pick<Storage, "getItem" | "setItem">) {
  const error = validateCustomer(customer);
  if (error) throw new Error(error);
  if (!items.length) throw new Error("Your bag is empty.");
  const lines = snapshotItems(items);
  const subtotal = lines.reduce((sum, item) => sum + item.lineTotal, 0);
  const order = {
    id: `NEXORA-DEMO-${crypto.randomUUID()}`, timestamp: new Date().toISOString(), status: "demo-local" as const,
    items: lines, totals: { subtotal, delivery: 0, total: subtotal, currency: "LKR" }, customer: { ...customer },
  };
  const saved: unknown = JSON.parse(storage.getItem(ordersKey) ?? "[]");
  if (!Array.isArray(saved)) throw new Error("Saved demo orders could not be read. Your cart has not been cleared.");
  storage.setItem(ordersKey, JSON.stringify([...saved, order]));
  return order;
}

export type DemoOrder = ReturnType<typeof createDemoOrder>;

export function orderEnquiry(items: CartItem[], customer?: Customer, order?: DemoOrder) {
  const lines = order?.items ?? snapshotItems(items);
  const subtotal = lines.reduce((sum, item) => sum + item.lineTotal, 0);
  const contact = order?.customer ?? customer;
  return [
    order ? `Demo order: ${order.id}\nCreated: ${order.timestamp}` : "NEXORA cart enquiry",
    "Demo/local catalog. Please confirm real pricing, stock, delivery and payment.",
    ...lines.map((item) => `${item.name} | ${[item.variants.color, item.variants.storage].filter(Boolean).join(" / ") || "Standard"} | Qty ${item.quantity} | LKR ${item.unitPrice} each | LKR ${item.lineTotal}`),
    `Subtotal: LKR ${subtotal}\nDelivery: to be confirmed`,
    contact ? `Name: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone}\nAddress: ${contact.address}, ${contact.city}, ${contact.postal}\nNotes: ${contact.notes}` : "",
  ].filter(Boolean).join("\n\n");
}
