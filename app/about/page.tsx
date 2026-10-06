import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Cpu, Headphones, Laptop, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Meet NEXORA: technology selected for work, creativity and everyday life.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#F5F5F7] pt-24 text-[#1D1D1F] lg:pt-28">
      <section className="nexora-container pb-12 pt-6 text-center sm:pb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#86868B]">Our collection. Your possibilities.</p>
        <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">About NEXORA</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6E6E73]">Technology belongs in your life, not in your way. We bring together laptops, phones, audio and everyday essentials with a focus on performance, design and the details that matter.</p>
        <Link href="/shop" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] px-6 py-3 text-sm font-medium text-white hover:bg-black">Explore the collection<ArrowRight size={16} /></Link>
      </section>
      <section className="bg-[#EAF3F8]">
        <div className="nexora-container">
          <div className="relative aspect-[16/9] max-h-[500px] w-full sm:aspect-[2/1]"><Image src="/images/spotlight/macbook13.jpg" alt="MacBook Air with a slim design and a blue display" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-contain" /></div>
        </div>
      </section>
      <section className="bg-white py-14 sm:py-20">
        <div className="nexora-container grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div><p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#86868B]">The NEXORA approach</p><h2 className="mt-4 text-3xl font-semibold leading-tight">Good technology.<br />Considered choices.</h2><p className="mt-5 max-w-lg text-base leading-7 text-[#6E6E73]">A device is more than a specification sheet. It is the work you finish, the ideas you explore and the moments you enjoy. Our collection puts those everyday experiences first.</p></div>
          <div className="divide-y divide-black/[0.07]">{[{ title: "Performance with purpose", text: "From everyday tasks to demanding creative work, explore devices suited to the way you use them." }, { title: "Design that earns its place", text: "Thoughtful materials, useful features and products that feel at home in your everyday setup." }, { title: "Details you can compare", text: "Product specifications, available options and prices together, so you can make a considered choice." }].map((item) => <div key={item.title} className="flex gap-4 py-5 first:pt-0"><Check size={19} className="mt-1 shrink-0" /><div><h3 className="font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#6E6E73]">{item.text}</p></div></div>)}</div>
        </div>
      </section>
      <section className="py-14 sm:py-20"><div className="nexora-container"><h2 className="text-2xl font-semibold">For every part of your day.</h2><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{[{ name: "Laptops", category: "laptops", Icon: Laptop, text: "Work, create and keep moving." }, { name: "Smartphones", category: "phones", Icon: Smartphone, text: "Your everyday, connected." }, { name: "Audio", category: "audio", Icon: Headphones, text: "Make room for better sound." }, { name: "Gaming", category: "gaming", Icon: Cpu, text: "Performance for your next level." }].map(({ name, category, Icon, text }) => <Link key={category} href={`/shop?category=${category}`} className="group border-t border-black/10 py-5"><Icon size={24} strokeWidth={1.5} /><h3 className="mt-4 flex items-center justify-between font-semibold">{name}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></h3><p className="mt-2 text-sm text-[#6E6E73]">{text}</p></Link>)}</div></div></section>
      <section className="border-t border-black/[0.07] bg-white py-12"><div className="nexora-container flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"><div><h2 className="text-2xl font-semibold">Find your next essential.</h2><p className="mt-2 text-sm text-[#6E6E73]">Explore the collection or get in touch with a question.</p></div><Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-medium hover:bg-[#F5F5F7]">Contact NEXORA<ArrowRight size={16} /></Link></div></section>
    </main>
  );
}
