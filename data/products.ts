import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "macbook-air-m4",
    slug: "macbook-air-m4",
    name: "MacBook Air M4",
    brand: "Apple",
    category: "laptops",
    tagline: "Supercharged by M4.",
    description:
      "A remarkably thin and capable laptop designed for everyday work, creativity and entertainment.",
    longDescription: [
      "The 13-inch MacBook Air with M4 combines a fanless design with a 10-core CPU and a 13.6-inch Liquid Retina display. The display offers a 2560-by-1664 resolution, 500-nit brightness, P3 wide color and True Tone. Its 1.24 kg aluminum body makes it easy to carry between work, classes and home.",
      "A 12MP Center Stage camera with Desk View supports video calls, while the four-speaker system and three-microphone array handle everyday listening and conversations. MagSafe 3 keeps charging separate from the two Thunderbolt 4 ports, which support external displays and compatible accessories. Wi-Fi 6E and Bluetooth 5.3 provide wireless connectivity.",
      "Apple rates battery life at up to 18 hours of video streaming or 15 hours of wireless web use; actual results depend on your settings and workload. The listed base configuration has 16GB unified memory and a 256GB SSD. Confirm the selected storage configuration before ordering.",
    ],
    manufacturerUrl: "https://support.apple.com/en-us/122209",
    price: 399900,
    rating: 4.9,
    reviewCount: 128,
    image: "/images/products/macbook-m4.png",
    gallery: [
      "/images/products/macbook-m4.png",
      "/images/spotlight/macbook13.jpg",
    ],
    badge: "New",
    inStock: true,
    featured: true,
    newArrival: true,
    colors: [
      { label: "Silver", value: "#E3E4E5" },
      { label: "Midnight", value: "#2E3642" },
    ],
    storage: [
      { label: "256GB", value: "256gb", price: 399900, specifications: { Storage: "256GB SSD" } },
      { label: "512GB", value: "512gb", price: 459900, specifications: { Storage: "512GB SSD" } },
      { label: "1TB", value: "1tb", price: 519900, specifications: { Storage: "1TB SSD" } },
    ],
    features: [
      "Apple M4 chip",
      "Up to 18 hours battery life",
      "13.6-inch Liquid Retina display",
      "MagSafe charging",
    ],
    specifications: {
      Chip: "Apple M4",
      Display: "13.6-inch Liquid Retina",
      Memory: "16GB unified memory",
      Storage: "256GB SSD",
      Camera: "12MP Center Stage",
      Wireless: "Wi-Fi 6E and Bluetooth 5.3",
    },
  },

  {
    id: "iphone-16-pro",
    slug: "iphone-16-pro",
    name: "iPhone 16 Pro",
    brand: "Apple",
    category: "phones",
    tagline: "Built for Apple Intelligence.",
    description:
      "A premium smartphone with powerful performance, an advanced camera system and refined titanium design.",
    longDescription: [
      "iPhone 16 Pro pairs the A18 Pro chip with a 6.3-inch Super Retina XDR OLED display. ProMotion supports adaptive refresh rates up to 120Hz, and the Always-On display keeps essential information visible. Its titanium design combines a textured matte glass back with a Ceramic Shield front.",
      "The camera system includes a 48MP Fusion camera, a 48MP Ultra Wide camera and a 5x Telephoto camera. Camera Control gives direct access to camera functions, and supported modes include 4K Dolby Vision video recording. USB-C supports charging and compatible data connections. Available storage, finishes and included accessories should be confirmed for the specific unit before ordering.",
    ],
    manufacturerUrl: "https://support.apple.com/en-us/121031",
    price: 429900,
    rating: 4.8,
    reviewCount: 96,
    image: "/images/products/iphone16pro.png",
    gallery: ["/images/products/iphone16pro.png"],
    badge: "Popular",
    inStock: true,
    featured: true,
    newArrival: true,
    features: [
      "A18 Pro chip",
      "Pro camera system",
      "Super Retina XDR display",
      "Titanium design",
    ],
    specifications: {
      Chip: "A18 Pro",
      Display: "Super Retina XDR",
      Camera: "Pro camera system",
      Material: "Titanium",
    },
  },

  {
    id: "sony-wh1000xm5",
    slug: "sony-wh1000xm5",
    name: "WH-1000XM5",
    brand: "Sony",
    category: "audio",
    tagline: "Your world. Nothing else.",
    description:
      "Premium wireless headphones designed for immersive listening with advanced noise cancellation.",
    longDescription: [
      "Sony WH-1000XM5 over-ear headphones combine active noise cancellation with a lightweight design and 30mm drivers. Ambient Sound mode lets you hear your surroundings without removing the headphones, while supported Bluetooth codecs include SBC, AAC and LDAC.",
      "Multipoint connectivity supports switching between two paired devices, such as a phone and a laptop. Sony specifies up to 30 hours of music playback with noise cancellation enabled and up to 40 hours with it disabled. Actual battery life varies with listening conditions and settings. USB-C charging and a wired audio connection provide additional flexibility when travelling or working.",
    ],
    manufacturerUrl: "https://www.sony.com/electronics/support/wireless-headphones-bluetooth-headphones/wh-1000xm5/specifications",
    price: 119900,
    originalPrice: 129900,
    rating: 4.9,
    reviewCount: 214,
    image: "/images/products/WH-1000XM5.png",
    gallery: ["/images/products/WH-1000XM5.png"],
    badge: "Best Seller",
    inStock: true,
    featured: true,
    features: [
      "Advanced noise cancellation",
      "Wireless audio",
      "Premium comfort",
      "Long battery life",
    ],
    specifications: {
      Type: "Wireless headphones",
      Connectivity: "Bluetooth",
      Feature: "Noise cancellation",
      Charging: "USB-C",
    },
  },

  {
    id: "asus-rog-zephyrus-g14",
    slug: "asus-rog-zephyrus-g14",
    name: "ROG Zephyrus G14",
    brand: "ASUS",
    category: "gaming",
    tagline: "Performance without limits.",
    description:
      "A compact gaming laptop combining powerful performance with a refined portable design.",
    longDescription: [
      "The ROG Zephyrus G14 family brings gaming-focused hardware to a compact 14-inch laptop format. It is designed for people who need a portable machine for both games and creative work, with dedicated graphics and configuration-dependent display, processor and memory options.",
      "G14 specifications differ significantly between model years and regional configurations. Confirm the exact model number, processor, GPU, display, RAM and SSD with NEXORA before ordering. This listing does not yet identify a specific hardware configuration, so specifications from a newer G14 should not be assumed to apply to this unit.",
    ],
    manufacturerUrl: "https://rog.asus.com/laptops/rog-zephyrus/rog-zephyrus-g14-2025/spec/",
    price: 549900,
    rating: 4.7,
    reviewCount: 72,
    image: "/images/products/ROG Zephyrus G14.png",
    gallery: ["/images/products/ROG Zephyrus G14.png"],
    badge: "Limited",
    inStock: true,
    featured: true,
    features: [
      "High-performance processor",
      "Dedicated graphics",
      "High refresh-rate display",
      "Premium compact chassis",
    ],
    specifications: {
      Type: "Gaming laptop",
      Display: "High refresh-rate display",
      Graphics: "Dedicated GPU",
      Connectivity: "Wi-Fi and Bluetooth",
    },
  },

  {
    id: "logitech-mx-master-3s",
    slug: "logitech-mx-master-3s",
    name: "MX Master 3S",
    brand: "Logitech",
    category: "accessories",
    tagline: "Precision meets comfort.",
    description:
      "A premium productivity mouse designed for precise control and comfortable everyday use.",
    longDescription: [
      "Logitech MX Master 3S is an ergonomic wireless productivity mouse with an 8,000 DPI optical sensor that can track on glass. Quiet Clicks reduce click noise, while the MagSpeed scroll wheel supports precise line-by-line movement and fast scrolling through long documents.",
      "Bluetooth Low Energy and a compatible Logi Bolt receiver provide connection options. Easy-Switch supports pairing with up to three devices, and Logi Options+ enables supported button customisation and workflows. The mouse charges over USB-C. Software features, receiver inclusion and operating-system compatibility should be checked for the selected package.",
    ],
    manufacturerUrl: "https://www.logitech.com/en-us/shop/p/mx-master-3s",
    price: 34900,
    rating: 4.8,
    reviewCount: 183,
    image: "/images/products/logitech-mx-master-3s.webp",
    gallery: ["/images/products/logitech-mx-master-3s.webp"],
    inStock: true,
    featured: true,
    features: [
      "Precision tracking",
      "Quiet clicks",
      "Ergonomic design",
      "Multi-device connectivity",
    ],
    specifications: {
      Type: "Wireless mouse",
      Connectivity: "Bluetooth / Wireless",
      Charging: "USB-C",
      Use: "Productivity",
    },
  },

  {
    id: "airpods-pro",
    slug: "airpods-pro",
    name: "AirPods Pro",
    brand: "Apple",
    category: "audio",
    tagline: "Immersive by design.",
    description:
      "Compact premium earbuds with active noise cancellation and immersive wireless audio.",
    longDescription: [
      "AirPods Pro combine an in-ear fit with Active Noise Cancellation and a Transparency listening mode. The compact charging case makes them easy to carry, while supported Apple devices provide convenient pairing and access to compatible spatial-audio features.",
      "Features, battery ratings, charging connectors and case capabilities vary by AirPods Pro generation. This listing does not yet specify the generation, so confirm the model and charging case before ordering. Spatial Audio and other software features also depend on the connected device and the content being played.",
    ],
    manufacturerUrl: "https://support.apple.com/airpods",
    price: 89900,
    rating: 4.8,
    reviewCount: 246,
    image: "/images/products/airpods-pro.webp",
    gallery: ["/images/products/airpods-pro.webp"],
    badge: "Popular",
    inStock: true,
    featured: false,
    newArrival: true,
    features: [
      "Active Noise Cancellation",
      "Transparency mode",
      "Spatial audio",
      "Wireless charging",
    ],
    specifications: {
      Type: "Wireless earbuds",
      Feature: "Active Noise Cancellation",
      Charging: "Wireless / USB-C",
      Connectivity: "Bluetooth",
    },
  },

  // Sample catalog entries with matching gallery assets from DummyJSON.
  {
    "id": "apple-macbook-pro-14-inch-space-grey",
    "slug": "apple-macbook-pro-14-inch-space-grey",
    "name": "MacBook Pro 14-inch M1 Pro",
    "brand": "Apple",
    "category": "laptops",
    "tagline": "A portable workspace for creative projects.",
    "description": "A 14-inch MacBook Pro option for people looking for a compact Apple notebook for work and creative projects. Sample catalog listing; price and availability are illustrative.",
    "longDescription": [
      "A 14-inch MacBook Pro option for people looking for a compact Apple notebook for work and creative projects.",
      "This is a sample catalog entry, not a confirmed offer. Confirm the exact model, condition, configuration, accessories, warranty and availability with NEXORA before ordering. The displayed LKR price is for demonstration only."
    ],
    "price": 489900,
    "rating": 0,
    "reviewCount": 0,
    "image": "/images/products/apple-macbook-pro-14-inch-space-grey-1.webp",
    "gallery": [
      "/images/products/apple-macbook-pro-14-inch-space-grey-1.webp",
      "/images/products/apple-macbook-pro-14-inch-space-grey-2.webp",
      "/images/products/apple-macbook-pro-14-inch-space-grey-3.webp"
    ],
    "inStock": true,
    "featured": false,
    "features": [
      "Multiple product views",
      "Contact NEXORA for configuration"
    ],
    "specifications": {
      "Brand": "Apple",
      "Model": "MacBook Pro 14-inch M1 Pro",
      "Listing status": "Sample catalog entry",
      "Price status": "Illustrative LKR price"
    }
  },

  {
    "id": "asus-zenbook-pro-dual-screen-laptop",
    "slug": "asus-zenbook-pro-dual-screen-laptop",
    "name": "Zenbook Pro Duo",
    "brand": "ASUS",
    "category": "laptops",
    "tagline": "More room for your workflow.",
    "description": "A dual-screen Zenbook option for keeping reference material and everyday applications within reach. Sample catalog listing; price and availability are illustrative.",
    "longDescription": [
      "A dual-screen Zenbook option for keeping reference material and everyday applications within reach.",
      "This is a sample catalog entry, not a confirmed offer. Confirm the exact model, condition, configuration, accessories, warranty and availability with NEXORA before ordering. The displayed LKR price is for demonstration only."
    ],
    "price": 459900,
    "rating": 0,
    "reviewCount": 0,
    "image": "/images/products/asus-zenbook-pro-dual-screen-laptop-1.webp",
    "gallery": [
      "/images/products/asus-zenbook-pro-dual-screen-laptop-1.webp",
      "/images/products/asus-zenbook-pro-dual-screen-laptop-2.webp",
      "/images/products/asus-zenbook-pro-dual-screen-laptop-3.webp"
    ],
    "inStock": true,
    "featured": false,
    "features": [
      "Multiple product views",
      "Contact NEXORA for configuration"
    ],
    "specifications": {
      "Brand": "ASUS",
      "Model": "Zenbook Pro Duo",
      "Listing status": "Sample catalog entry",
      "Price status": "Illustrative LKR price"
    }
  },

  {
    "id": "huawei-matebook-x-pro",
    "slug": "huawei-matebook-x-pro",
    "name": "MateBook X Pro",
    "brand": "Huawei",
    "category": "laptops",
    "tagline": "Work wherever inspiration takes you.",
    "description": "A MateBook X Pro notebook option for a portable work setup and everyday productivity. Sample catalog listing; price and availability are illustrative.",
    "longDescription": [
      "A MateBook X Pro notebook option for a portable work setup and everyday productivity.",
      "This is a sample catalog entry, not a confirmed offer. Confirm the exact model, condition, configuration, accessories, warranty and availability with NEXORA before ordering. The displayed LKR price is for demonstration only."
    ],
    "price": 329900,
    "rating": 0,
    "reviewCount": 0,
    "image": "/images/products/huawei-matebook-x-pro-1.webp",
    "gallery": [
      "/images/products/huawei-matebook-x-pro-1.webp",
      "/images/products/huawei-matebook-x-pro-2.webp",
      "/images/products/huawei-matebook-x-pro-3.webp"
    ],
    "inStock": true,
    "featured": false,
    "features": [
      "Multiple product views",
      "Contact NEXORA for configuration"
    ],
    "specifications": {
      "Brand": "Huawei",
      "Model": "MateBook X Pro",
      "Listing status": "Sample catalog entry",
      "Price status": "Illustrative LKR price"
    }
  },

  {
    "id": "lenovo-yoga-920",
    "slug": "lenovo-yoga-920",
    "name": "Yoga 920",
    "brand": "Lenovo",
    "category": "laptops",
    "tagline": "A flexible approach to everyday work.",
    "description": "A convertible Yoga notebook option for switching between typing, viewing and touch-oriented tasks. Sample catalog listing; price and availability are illustrative.",
    "longDescription": [
      "A convertible Yoga notebook option for switching between typing, viewing and touch-oriented tasks.",
      "This is a sample catalog entry, not a confirmed offer. Confirm the exact model, condition, configuration, accessories, warranty and availability with NEXORA before ordering. The displayed LKR price is for demonstration only."
    ],
    "price": 219900,
    "rating": 0,
    "reviewCount": 0,
    "image": "/images/products/lenovo-yoga-920-1.webp",
    "gallery": [
      "/images/products/lenovo-yoga-920-1.webp",
      "/images/products/lenovo-yoga-920-2.webp",
      "/images/products/lenovo-yoga-920-3.webp"
    ],
    "inStock": true,
    "featured": false,
    "features": [
      "Multiple product views",
      "Contact NEXORA for configuration"
    ],
    "specifications": {
      "Brand": "Lenovo",
      "Model": "Yoga 920",
      "Listing status": "Sample catalog entry",
      "Price status": "Illustrative LKR price"
    }
  },

  {
    "id": "new-dell-xps-13-9300-laptop",
    "slug": "new-dell-xps-13-9300-laptop",
    "name": "XPS 13 9300",
    "brand": "Dell",
    "category": "laptops",
    "tagline": "A compact companion for busy days.",
    "description": "An XPS 13 notebook option for people who prefer a compact laptop for everyday work and travel. Sample catalog listing; price and availability are illustrative.",
    "longDescription": [
      "An XPS 13 notebook option for people who prefer a compact laptop for everyday work and travel.",
      "This is a sample catalog entry, not a confirmed offer. Confirm the exact model, condition, configuration, accessories, warranty and availability with NEXORA before ordering. The displayed LKR price is for demonstration only."
    ],
    "price": 299900,
    "rating": 0,
    "reviewCount": 0,
    "image": "/images/products/new-dell-xps-13-9300-laptop-1.webp",
    "gallery": [
      "/images/products/new-dell-xps-13-9300-laptop-1.webp",
      "/images/products/new-dell-xps-13-9300-laptop-2.webp",
      "/images/products/new-dell-xps-13-9300-laptop-3.webp"
    ],
    "inStock": true,
    "featured": false,
    "features": [
      "Multiple product views",
      "Contact NEXORA for configuration"
    ],
    "specifications": {
      "Brand": "Dell",
      "Model": "XPS 13 9300",
      "Listing status": "Sample catalog entry",
      "Price status": "Illustrative LKR price"
    }
  },

  {
    "id": "iphone-13-pro",
    "slug": "iphone-13-pro",
    "name": "iPhone 13 Pro",
    "brand": "Apple",
    "category": "phones",
    "tagline": "An everyday connection to your world.",
    "description": "An iPhone 13 Pro option for communication, photography and familiar Apple applications. Sample catalog listing; price and availability are illustrative.",
    "longDescription": [
      "An iPhone 13 Pro option for communication, photography and familiar Apple applications.",
      "This is a sample catalog entry, not a confirmed offer. Confirm the exact model, condition, configuration, accessories, warranty and availability with NEXORA before ordering. The displayed LKR price is for demonstration only."
    ],
    "price": 239900,
    "rating": 0,
    "reviewCount": 0,
    "image": "/images/products/iphone-13-pro-1.webp",
    "gallery": [
      "/images/products/iphone-13-pro-1.webp",
      "/images/products/iphone-13-pro-2.webp",
      "/images/products/iphone-13-pro-3.webp"
    ],
    "inStock": true,
    "featured": false,
    "features": [
      "Multiple product views",
      "Contact NEXORA for configuration"
    ],
    "specifications": {
      "Brand": "Apple",
      "Model": "iPhone 13 Pro",
      "Listing status": "Sample catalog entry",
      "Price status": "Illustrative LKR price"
    }
  },

  {
    "id": "oppo-f19-pro-plus",
    "slug": "oppo-f19-pro-plus",
    "name": "F19 Pro+",
    "brand": "OPPO",
    "category": "phones",
    "tagline": "Stay connected throughout your day.",
    "description": "An OPPO F19 Pro+ smartphone option for everyday messaging, photography and entertainment. Sample catalog listing; price and availability are illustrative.",
    "longDescription": [
      "An OPPO F19 Pro+ smartphone option for everyday messaging, photography and entertainment.",
      "This is a sample catalog entry, not a confirmed offer. Confirm the exact model, condition, configuration, accessories, warranty and availability with NEXORA before ordering. The displayed LKR price is for demonstration only."
    ],
    "price": 99900,
    "rating": 0,
    "reviewCount": 0,
    "image": "/images/products/oppo-f19-pro-plus-1.webp",
    "gallery": [
      "/images/products/oppo-f19-pro-plus-1.webp",
      "/images/products/oppo-f19-pro-plus-2.webp",
      "/images/products/oppo-f19-pro-plus-3.webp"
    ],
    "inStock": true,
    "featured": false,
    "features": [
      "Multiple product views",
      "Contact NEXORA for configuration"
    ],
    "specifications": {
      "Brand": "OPPO",
      "Model": "F19 Pro+",
      "Listing status": "Sample catalog entry",
      "Price status": "Illustrative LKR price"
    }
  },

  {
    "id": "realme-c35",
    "slug": "realme-c35",
    "name": "C35",
    "brand": "Realme",
    "category": "phones",
    "tagline": "Everyday essentials in your pocket.",
    "description": "A Realme C35 smartphone option for calls, messaging and everyday mobile applications. Sample catalog listing; price and availability are illustrative.",
    "longDescription": [
      "A Realme C35 smartphone option for calls, messaging and everyday mobile applications.",
      "This is a sample catalog entry, not a confirmed offer. Confirm the exact model, condition, configuration, accessories, warranty and availability with NEXORA before ordering. The displayed LKR price is for demonstration only."
    ],
    "price": 54900,
    "rating": 0,
    "reviewCount": 0,
    "image": "/images/products/realme-c35-1.webp",
    "gallery": [
      "/images/products/realme-c35-1.webp",
      "/images/products/realme-c35-2.webp",
      "/images/products/realme-c35-3.webp"
    ],
    "inStock": true,
    "featured": false,
    "features": [
      "Multiple product views",
      "Contact NEXORA for configuration"
    ],
    "specifications": {
      "Brand": "Realme",
      "Model": "C35",
      "Listing status": "Sample catalog entry",
      "Price status": "Illustrative LKR price"
    }
  },

  {
    "id": "samsung-galaxy-s10",
    "slug": "samsung-galaxy-s10",
    "name": "Galaxy S10",
    "brand": "Samsung",
    "category": "phones",
    "tagline": "A familiar Galaxy experience.",
    "description": "A Galaxy S10 smartphone option for people looking for Samsung applications and everyday mobile connectivity. Sample catalog listing; price and availability are illustrative.",
    "longDescription": [
      "A Galaxy S10 smartphone option for people looking for Samsung applications and everyday mobile connectivity.",
      "This is a sample catalog entry, not a confirmed offer. Confirm the exact model, condition, configuration, accessories, warranty and availability with NEXORA before ordering. The displayed LKR price is for demonstration only."
    ],
    "price": 89900,
    "rating": 0,
    "reviewCount": 0,
    "image": "/images/products/samsung-galaxy-s10-1.webp",
    "gallery": [
      "/images/products/samsung-galaxy-s10-1.webp",
      "/images/products/samsung-galaxy-s10-2.webp",
      "/images/products/samsung-galaxy-s10-3.webp"
    ],
    "inStock": true,
    "featured": false,
    "features": [
      "Multiple product views",
      "Contact NEXORA for configuration"
    ],
    "specifications": {
      "Brand": "Samsung",
      "Model": "Galaxy S10",
      "Listing status": "Sample catalog entry",
      "Price status": "Illustrative LKR price"
    }
  },

  {
    "id": "vivo-x21",
    "slug": "vivo-x21",
    "name": "X21",
    "brand": "Vivo",
    "category": "phones",
    "tagline": "Keep your everyday moments close.",
    "description": "A Vivo X21 smartphone option for communication, mobile photography and everyday entertainment. Sample catalog listing; price and availability are illustrative.",
    "longDescription": [
      "A Vivo X21 smartphone option for communication, mobile photography and everyday entertainment.",
      "This is a sample catalog entry, not a confirmed offer. Confirm the exact model, condition, configuration, accessories, warranty and availability with NEXORA before ordering. The displayed LKR price is for demonstration only."
    ],
    "price": 69900,
    "rating": 0,
    "reviewCount": 0,
    "image": "/images/products/vivo-x21-1.webp",
    "gallery": [
      "/images/products/vivo-x21-1.webp",
      "/images/products/vivo-x21-2.webp",
      "/images/products/vivo-x21-3.webp"
    ],
    "inStock": true,
    "featured": false,
    "features": [
      "Multiple product views",
      "Contact NEXORA for configuration"
    ],
    "specifications": {
      "Brand": "Vivo",
      "Model": "X21",
      "Listing status": "Sample catalog entry",
      "Price status": "Illustrative LKR price"
    }
  },
];

export const featuredProducts = products.filter(
  (product) => product.featured,
);

export const newArrivalProducts = products.filter(
  (product) => product.newArrival,
);

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
