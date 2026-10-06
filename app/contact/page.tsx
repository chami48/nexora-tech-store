import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Phone, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact NEXORA about products, availability, delivery and order enquiries.",
};

export default function ContactPage() {
  const email = "nexoratech@gmail.com";
  const phone = "+94741663031";
  return (
    <main className="min-h-screen bg-[#F5F5F7] pb-16 pt-28 text-[#1D1D1F] lg:pt-32">
      <div className="nexora-container">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#86868B]">Let&apos;s talk technology</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">Contact NEXORA</h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-[#6E6E73]">A question about your next device? Get in touch about products, availability, delivery or an existing order.</p>
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <section className="border-t border-black/10 pt-6"><h2 className="text-xl font-semibold">Your enquiry</h2><ContactForm email={email} /></section>
          <aside className="border-t border-black/10 pt-6"><h2 className="text-xl font-semibold">How can we help?</h2><div className="mt-6 space-y-6"><div><h3 className="text-sm font-semibold">Choosing a product</h3><p className="mt-2 text-sm leading-6 text-[#6E6E73]">Tell us what you need, your preferred model and any options you are considering.</p></div><div><h3 className="text-sm font-semibold">An existing order</h3><p className="mt-2 text-sm leading-6 text-[#6E6E73]">Include your order reference and the product name so your enquiry has the right context.</p></div>{email && <a href={`mailto:${email}`} className="flex items-center gap-3 break-all text-sm"><Mail size={18} className="shrink-0" />{email}</a>}{phone && <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-3 text-sm"><Phone size={18} />{phone}</a>}<Link href="/shop" className="inline-flex items-center gap-2 text-sm font-medium">Browse products<ArrowRight size={16} /></Link></div></aside>
        </div>
        <a href="https://wa.me/94741663031" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-700"><MessageCircle size={18} />Chat on WhatsApp<ArrowRight size={16} /></a>
        <section className="mt-16 border-t border-black/10 pt-8"><h2 className="text-2xl font-semibold">Before you get in touch</h2><div className="mt-5 max-w-3xl divide-y divide-black/10">{[{ question: "How do I check product availability?", answer: "Each product page shows its current listed availability. Include the model and your preferred options in your enquiry to confirm before ordering." }, { question: "How do I ask about delivery?", answer: "Choose Delivery as your enquiry topic and include your city. Delivery availability and charges need to be confirmed before placing an order." }, { question: "Where can I compare product details?", answer: "Open a product page to see its highlights, specifications, price and available options." }].map(({ question, answer }) => <details key={question} className="group py-5"><summary className="cursor-pointer text-sm font-semibold">{question}</summary><p className="mt-3 text-sm leading-6 text-[#6E6E73]">{answer}</p></details>)}</div></section>
      </div>
    </main>
  );
}
