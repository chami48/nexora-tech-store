import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CartProvider } from "@/components/cart/cart-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NEXORA | Online Store for Premium Technology",
    template: "%s | NEXORA",
  },

  description:
    "Discover premium laptops, smartphones, audio, gaming gear and technology accessories at NEXORA.",

  applicationName: "NEXORA",

  keywords: [
    "NEXORA",
    "technology",
    "electronics",
    "laptops",
    "smartphones",
    "audio",
    "gaming",
    "tech accessories",
  ],

  authors: [
    {
      name: "NEXORA",
    },
  ],

  creator: "NEXORA",
  publisher: "NEXORA",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    siteName: "NEXORA",
    title: "NEXORA — Technology, Beautifully Selected",
    description:
      "Premium technology, thoughtfully curated for the way you work, create and play.",
  },

  twitter: {
    card: "summary_large_image",
    title: "NEXORA — Technology, Beautifully Selected",
    description:
      "Premium technology, thoughtfully curated for the way you work, create and play.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F5F7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=null;try{t=localStorage.getItem('nexora-theme')}catch(e){}var d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light'})()` }} />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <CartProvider>
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>

        <div className="flex-1">{children}</div>

        <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
