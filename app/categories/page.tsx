import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Categories",
};

export default function CategoriesPage() {
  return (
    <Container className="py-8 md:py-12">
      <h1 className="font-display text-4xl md:text-5xl">Shop by Category</h1>
      <p className="mt-2 text-muted-foreground">Performance, outdoor, training, travel, and everyday carry.</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group overflow-hidden border border-border bg-white transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-5">
              <h2 className="font-display text-2xl group-hover:text-accent">{category.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
              <p className="mt-2 text-xs text-muted-foreground">{category.productCount} products</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
