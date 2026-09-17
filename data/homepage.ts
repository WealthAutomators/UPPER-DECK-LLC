import { Feature, HeroSlide, PromoBanner } from "@/types";

export const heroSlides: HeroSlide[] = [
  {
    id: "1",
    image: "/hero/hero-1.jpg",
    headline: "Built for the next move.",
    description:
      "Performance layers, outdoor kit, and everyday carry — assembled for training days, trail days, and everything in between.",
    ctaText: "Shop the Gear",
    ctaLink: "/shop",
    secondaryCtaText: "New Arrivals",
    secondaryCtaLink: "/new-arrivals",
  },
];

export const features: Feature[] = [
  {
    id: "1",
    icon: "truck",
    title: "Free Shipping $75+",
    description: "Standard delivery in 3–5 business days on qualifying orders.",
  },
  {
    id: "2",
    icon: "shield",
    title: "Secure Checkout",
    description: "Demo checkout is encrypted and built for a straightforward flow.",
  },
  {
    id: "3",
    icon: "rotate",
    title: "30-Day Returns",
    description: "Send unused items back in original packaging within 30 days.",
  },
  {
    id: "4",
    icon: "headphones",
    title: "Direct Support",
    description: "Email the team with order questions and we will follow up.",
  },
  {
    id: "5",
    icon: "star",
    title: "Utility First",
    description: "Catalog built around movement, outdoor use, and daily carry.",
  },
];

export const dealsEndTime = new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString();

export const homepageDealsSlugs = [
  "ridge-softshell",
  "storm-packable-shell",
  "cabin-backpack",
  "approach-hiking-shoe",
  "field-sunglasses",
] as const;

export const homepageBestsellerSlugs = [
  "weekender-duffel",
  "studio-grip-mat",
  "heavyweight-hoodie",
  "trail-28-pack",
  "court-trainer",
  "summit-bottle",
  "lined-training-joggers",
  "insulated-camp-mug",
] as const;

export const homepageFeaturedSlugs = [
  "ridge-softshell",
  "trail-28-pack",
  "weekender-duffel",
  "heavyweight-hoodie",
  "court-trainer",
  "cast-iron-kettlebell",
  "everyday-commute-bag",
  "tempo-knit-tee",
] as const;

export const homepageNewArrivalSlugs = [
  "storm-packable-shell",
  "merino-long-sleeve",
  "approach-hiking-shoe",
  "everyday-commute-bag",
  "packing-cube-trio",
  "daily-knit-trainer",
  "weighted-speed-rope",
  "compact-camp-tent",
] as const;

export const homepageSecondarySlugs = [
  "weekender-duffel",
  "cabin-backpack",
  "packing-cube-trio",
  "travel-bottle-set",
  "packable-day-sack",
] as const;

export const promotionalBanner: PromoBanner = {
  id: "1",
  title: "Free shipping on orders $75+",
  description: "Standard delivery on qualifying orders. New season gear, packed and ready to move.",
  buttonText: "Shop All Gear",
  buttonLink: "/shop",
  image: "/banners/featured.jpg",
};

export const aboutSection = {
  title: "Movement, utility, no extra noise.",
  description:
    "UPPER DECK is built around gear you actually use: training kit, outdoor layers, travel bags, and everyday carry. We focus on clean design, practical construction, and a catalog that covers the week — not a single sport.",
  checklist: [
    "Performance apparel and footwear",
    "Outdoor and travel systems that pack down",
    "Training tools for gym and home",
    "Everyday carry that stays out of the way",
  ],
  buttonText: "Read the Approach",
  buttonLink: "/about",
  image: "/banners/about.jpg",
};

export const editorialFeature = {
  eyebrow: "Outdoor",
  title: "Built for the outdoors.",
  description:
    "Packs, camp shelters, and trail footwear for days that start on pavement and end on dirt. Built to haul, pack, and keep moving.",
  ctaText: "Shop Outdoor",
  ctaLink: "/categories/outdoor",
  image: "/banners/editorial.jpg",
  secondaryImage: "/banners/editorial-detail.jpg",
};

export const secondaryCollection = {
  eyebrow: "Travel",
  title: "Travel essentials",
  description: "Rucksacks, luggage, and carry-on bags for short trips and long weekends.",
  ctaText: "Shop Travel",
  ctaLink: "/categories/travel",
  image: "/banners/travel.jpg",
};

export const featuredCollection = {
  title: "Featured Gear",
  description: "A cross-section of the catalog — training, trail, travel, and daily wear.",
  bannerImage: "/banners/featured.jpg",
  categorySlug: "performance",
};

export const bestSellerTabs = [
  { label: "All", slug: "all" },
  { label: "Performance", slug: "performance" },
  { label: "Outdoor", slug: "outdoor" },
  { label: "Training", slug: "training" },
  { label: "Travel", slug: "travel" },
];

export const newsletter = {
  title: "Get the drop.",
  description: "New gear, new arrivals, and seasonal picks delivered to your inbox.",
  placeholder: "Enter your email",
  buttonText: "Subscribe",
};

export const utilityStrip = {
  items: [
    "Free shipping on orders $75+",
    "New season gear is in",
    "30-day returns",
  ],
};

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];
