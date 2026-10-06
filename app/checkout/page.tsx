"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, Check, ShoppingBag } from "lucide-react";
import { CartLines, formatCartPrice, useCart } from "@/components/cart/cart-provider";
import { checkoutDraftKey, createDemoOrder, enquiryKey, orderEnquiry, readCustomer, type DemoOrder } from "@/lib/demo-orders";

const fields = [
  { name: "name", label: "Full name", autoComplete: "name", type: "text", maxLength: 120 },
  { name: "email", label: "Email address", autoComplete: "email", type: "email", maxLength: 254 },
  { name: "phone", label: "Phone number", autoComplete: "tel", type: "tel", maxLength: 30 },
  { name: "address", label: "Street address", autoComplete: "street-address", type: "text", maxLength: 300 },
  { name: "city", label: "City", autoComplete: "address-level2", type: "text", maxLength: 100 },
  { name: "postal", label: "Postal code", autoComplete: "postal-code", type: "text", maxLength: 12 },
];

export default function CheckoutPage() {
  const { items, count, subtotal, clearCart } = useCart();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const submitting = useRef(false);
  const [order, setOrder] = useState<DemoOrder | null>(null);
  const [error, setError] = useState("");
  const [draftWarning, setDraftWarning] = useState("");
  const hasItems = count > 0;

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(checkoutDraftKey) ?? "{}");
      if (!saved || typeof saved !== "object" || Array.isArray(saved)) return;
      for (const [key, value] of Object.entries(saved)) {
        const input = form.elements.namedItem(key);
        if ((input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) && typeof value === "string") input.value = value.slice(0, input.maxLength > 0 ? input.maxLength : 2000);
      }
    } catch { /* A missing or invalid local draft does not block checkout. */ }
  }, [hasItems]);

  useEffect(() => { if (order) confirmationRef.current?.focus(); }, [order]);

  function persistDraft() {
    if (!formRef.current) return;
    setError("");
    try { localStorage.setItem(checkoutDraftKey, JSON.stringify(readCustomer(new FormData(formRef.current)))); setDraftWarning(""); }
    catch { setDraftWarning("Browser storage is unavailable. Your delivery draft cannot be saved."); }
  }

  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setError("");
    try {
      const created = createDemoOrder(items, readCustomer(new FormData(event.currentTarget)), localStorage);
      setOrder(created);
      clearCart();
      try { localStorage.removeItem(checkoutDraftKey); } catch { /* The order is already safely stored. */ }
    } catch (cause) {
      setError(cause instanceof Error ? `Order not saved: ${cause.message}` : "Order could not be saved. Your cart is unchanged.");
      submitting.current = false;
    }
  }

  function contactToOrder() {
    try {
      const customer = formRef.current ? readCustomer(new FormData(formRef.current)) : undefined;
      const contact = order?.customer ?? customer;
      localStorage.setItem(enquiryKey, JSON.stringify({
        message: orderEnquiry(items, customer, order ?? undefined),
        name: contact?.name ?? "", email: contact?.email ?? "",
      }));
      router.push("/contact#order-enquiry");
    } catch { setError("Could not preserve your order enquiry. Please allow browser storage and try again."); }
  }

  return <main className="min-h-screen bg-[#F7F7F8] pb-16 pt-28 text-[#1D1D1F]">
    <div className="nexora-container">
      <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-[#6E6E73]"><ArrowLeft size={16} />Continue shopping</Link>
      <h1 className="mt-6 text-3xl font-semibold">Checkout</h1>
      <p className="mt-3 text-sm leading-6 text-[#6E6E73]">Demo checkout only. Orders and delivery details are stored in this browser, not sent to NEXORA. No payment is collected. Avoid entering sensitive information on a shared device.</p>
      {order ? <div ref={confirmationRef} tabIndex={-1} className="mt-10 border-t border-black/10 py-8 outline-none">
        <Check size={28} className="text-emerald-700" />
        <h2 className="mt-4 text-2xl font-semibold">Demo order saved locally</h2>
        <p className="mt-3 break-all text-sm">{order.id}</p>
        <p className="mt-2 text-sm text-[#6E6E73]">{order.timestamp} / No real order has been placed.</p>
        <ul className="mt-6 divide-y divide-black/10">{order.items.map((item) => <li key={item.key} className="py-3 text-sm"><p className="font-medium">{item.name} &times; {item.quantity}</p><p className="mt-1 text-[#6E6E73]">{[item.variants.color, item.variants.storage].filter(Boolean).join(" / ")} / {formatCartPrice(item.lineTotal)}</p></li>)}</ul>
        <p className="mt-4 font-semibold">Demo total: {formatCartPrice(order.totals.total)}</p>
        <p className="mt-2 text-xs text-[#86868B]">Demo delivery: LKR 0. Actual delivery and pricing must be confirmed.</p>
        <button type="button" onClick={contactToOrder} className="mt-6 rounded-full border border-black/15 px-6 py-3 text-sm font-medium">Contact to order</button>
      </div> : !hasItems ? <div className="py-20 text-center"><ShoppingBag size={40} className="mx-auto text-[#86868B]" /><h2 className="mt-5 text-xl font-semibold">Your bag is empty</h2><Link href="/shop" className="mt-6 inline-flex rounded-full bg-[#1D1D1F] px-6 py-3 text-sm text-white">Select products</Link></div> : <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
        <section>
          <h2 className="text-xl font-semibold">Delivery details</h2>
          <form ref={formRef} onChange={persistDraft} onSubmit={placeOrder} className="mt-6 grid gap-5 sm:grid-cols-2">
            {fields.map((field) => <label key={field.name} className="text-sm font-medium">{field.label}<input name={field.name} type={field.type} autoComplete={field.autoComplete} maxLength={field.maxLength} required className="mt-2 h-12 w-full rounded-lg border border-black/10 bg-white px-4 outline-none focus:border-black/40" /></label>)}
            <label className="text-sm font-medium sm:col-span-2">Order notes<textarea name="notes" rows={3} maxLength={2000} className="mt-2 w-full rounded-lg border border-black/10 bg-white p-4 outline-none focus:border-black/40" /></label>
            <p className="text-xs text-[#86868B] sm:col-span-2">Your draft is saved locally. Demo delivery is LKR 0; real delivery charges are not calculated.</p>
            {draftWarning && <p role="status" className="text-sm text-[#6E6E73] sm:col-span-2">{draftWarning}</p>}
            <button type="submit" className="h-12 rounded-full bg-[#1D1D1F] px-6 text-sm font-semibold text-white hover:bg-black sm:col-span-2">Place demo order</button>
          </form>
          <button type="button" onClick={contactToOrder} className="mt-4 inline-flex items-center justify-center rounded-full border border-black/15 px-6 py-3 text-sm font-medium">Contact to order</button>
        </section>
        <section className="border-t border-black/10 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"><h2 className="text-xl font-semibold">Order summary <span className="text-sm font-normal text-[#86868B]">({count} items)</span></h2><CartLines /><div className="flex justify-between border-t border-black/10 pt-5 text-lg font-semibold"><span>Subtotal</span><span>{formatCartPrice(subtotal)}</span></div><p className="mt-3 text-xs text-[#86868B]">Demo delivery: LKR 0. Demo total: {formatCartPrice(subtotal)}</p></section>
      </div>}
      {error && <p role="alert" className="mt-5 text-sm text-red-600">{error}</p>}
    </div>
  </main>;
}
