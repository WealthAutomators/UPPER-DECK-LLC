# UPPER DECK LLC

A production-quality ecommerce storefront for UPPER DECK — a modern sporting and lifestyle retailer — built with Next.js App Router, TypeScript, and Tailwind CSS.

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** (Radix primitives)
- **Lucide Icons**
- **Framer Motion**
- **Embla Carousel**
- **React Context** (cart, wishlist, recently viewed)
- **localStorage** persistence (no backend)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # Production build
npm run start   # Start production server
```

## Customizing Content

| What to change | Where |
|---|---|
| Company name, contact | `data/company.ts` |
| Brand colors | `styles/theme.ts` + `app/globals.css` |
| Navigation & footer links | `data/navigation.ts` |
| Categories | `data/categories.ts` |
| Products | `data/products.ts` |
| Homepage content | `data/homepage.ts` |
| Testimonials | `data/testimonials.ts` |
| Logo | `public/logo/` |
| Hero images | `public/hero/` |
| Banners | `public/banners/` |
| Category images | `public/categories/` |
| Product images | `public/products/` |

Download catalog photography from Unsplash (no API key required for curated photo IDs):

```bash
npm run images:unsplash
```

## Features

- Full homepage with performance hero, category tiles, editorial feature, carousels, and brand story
- Working cart with add/remove/quantity and localStorage persistence
- Working wishlist with localStorage persistence
- Live search filtering in navbar and shop page
- Quick view modal on product cards
- Product detail page with gallery, specs, related products
- Shop page with sidebar filters, sorting, and pagination
- Demo checkout and account login
- Fully responsive (mobile, tablet, desktop)

## Checkout

Use coupon code `SAVE10` on the cart page for a 10% discount.

## Brand Colors

- **Primary:** Near-black `#0B0D10`
- **Accent:** Electric cobalt `#1E6BFF`
- **Background:** Cool gray `#F4F5F7`
