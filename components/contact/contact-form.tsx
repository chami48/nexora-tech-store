"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { products } from "@/data/products";
import { enquiryKey } from "@/lib/demo-orders";

export function ContactForm({ email }: { email: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (window.location.hash !== "#order-enquiry") return;
    try {
      const enquiry: unknown = JSON.parse(localStorage.getItem(enquiryKey) ?? "null");
      const topic = formRef.current?.elements.namedItem("topic");
      if (!enquiry || typeof enquiry !== "object") return;
      for (const [key, value] of Object.entries(enquiry)) {
        if (!["message", "name", "email"].includes(key)) continue;
        const input = formRef.current?.elements.namedItem(key);
        if (typeof value === "string" && (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement)) input.value = value;
      }
      if (topic instanceof HTMLSelectElement) topic.value = "Order enquiry";
    } catch { /* The form can still be completed manually. */ }
  }, []);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setError("");
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const sender = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !message) { setError("Enter your name and message."); return; }
    const topic = String(data.get("topic") ?? "Product enquiry");
    const product = String(data.get("product") ?? "");
    const body = `Name: ${name}\nEmail: ${sender}\nTopic: ${topic}\nProduct: ${product || "Not selected"}\n\n${message}`;
    if (email) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(`NEXORA - ${topic}`)}&body=${encodeURIComponent(body)}`;
      setStatus("Enquiry prepared in your email app. Send it there to contact NEXORA.");
    } else {
      try { await navigator.clipboard.writeText(body); setStatus("Enquiry copied."); }
      catch { setError("Could not copy your enquiry. Please try again."); }
    }
  }

  const inputClass = "mt-2 h-12 w-full rounded-lg border border-black/10 bg-white px-4 text-sm outline-none focus:border-black/40 focus:ring-2 focus:ring-black/5";
  return <form id="order-enquiry" ref={formRef} onSubmit={submit} onChange={() => { setStatus(""); setError(""); }} className="mt-6 space-y-5">
    <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-medium">Your name<input name="name" autoComplete="name" required maxLength={120} className={inputClass} /></label><label className="text-sm font-medium">Email address<input name="email" type="email" autoComplete="email" required maxLength={254} className={inputClass} /></label></div>
    <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-medium">Topic<select name="topic" className={inputClass}><option>Product enquiry</option><option>Order enquiry</option><option>Delivery</option><option>Returns &amp; warranty</option><option>Other</option></select></label><label className="text-sm font-medium">Product <span className="font-normal text-[#86868B]">(optional)</span><select name="product" className={inputClass}><option value="">Select a product</option>{products.map((product) => <option key={product.id}>{product.name}</option>)}</select></label></div>
    <label className="block text-sm font-medium">Message<textarea name="message" required maxLength={16000} rows={5} className="mt-2 w-full resize-y rounded-lg border border-black/10 bg-white p-4 text-sm outline-none focus:border-black/40 focus:ring-2 focus:ring-black/5" /></label>
    <div className="flex flex-wrap items-center gap-4"><button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-6 text-sm font-medium text-white hover:bg-black">{email ? "Email enquiry" : "Copy enquiry"}{email ? <ArrowUpRight size={17} /> : <Copy size={17} />}</button>{status && <p role="status" className="flex items-center gap-2 text-sm text-emerald-700"><Check size={16} className="shrink-0" />{status}</p>}</div>
    {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
  </form>;
}
