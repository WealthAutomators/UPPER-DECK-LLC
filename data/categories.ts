import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    slug: "performance",
    name: "Performance",
    image: "/categories/performance.jpg",
    description: "Training layers and kit for weekday sessions and weekend miles.",
    productCount: 4,
  },
  {
    id: "2",
    slug: "outdoor",
    name: "Outdoor",
    image: "/categories/outdoor.jpg",
    description: "Trail-ready packs, camp shelters, and kit for getting outside.",
    productCount: 7,
  },
  {
    id: "3",
    slug: "training",
    name: "Training",
    image: "/categories/training.jpg",
    description: "Mats, benches, and weights for the gym or the living room.",
    productCount: 5,
  },
  {
    id: "4",
    slug: "travel",
    name: "Travel",
    image: "/categories/travel.jpg",
    description: "Rucksacks, luggage, and carry-on bags that stay organized.",
    productCount: 5,
  },
  {
    id: "5",
    slug: "apparel",
    name: "Apparel",
    image: "/categories/apparel.jpg",
    description: "Hoodies, knits, shorts, and everyday layers with a performance cut.",
    productCount: 6,
  },
  {
    id: "6",
    slug: "footwear",
    name: "Footwear",
    image: "/categories/footwear.jpg",
    description: "Court sneakers, hiking boots, and daily trainers for the full week.",
    productCount: 5,
  },
  {
    id: "7",
    slug: "accessories",
    name: "Accessories",
    image: "/categories/accessories.jpg",
    description: "Bottles, towels, eyewear, and training tools that finish the kit.",
    productCount: 5,
  },
  {
    id: "8",
    slug: "everyday-carry",
    name: "Everyday Carry",
    image: "/categories/everyday-carry.jpg",
    description: "Wallets, packs, and compact tools for the commute and the trail.",
    productCount: 3,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
