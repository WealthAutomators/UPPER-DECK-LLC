"use client";

import { homepageSecondarySlugs, secondaryCollection } from "@/data/homepage";
import { getProductsBySlugs } from "@/data/products";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import Image from "next/image";
import Link from "next/link";

export function SecondaryCollection() {
  const products = getProductsBySlugs(homepageSecondarySlugs);

  return (
    <section className="bg-muted py-14 md:py-20">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="relative min-h-[360px] overflow-hidden bg-foreground lg:col-span-5">
            <Image
              src={secondaryCollection.image}
              alt={secondaryCollection.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                {secondaryCollection.eyebrow}
              </p>
              <h2 className="font-display mt-3 text-4xl text-white md:text-5xl">{secondaryCollection.title}</h2>
              <p className="mt-3 max-w-sm text-sm text-white/80">{secondaryCollection.description}</p>
              <Button asChild size="lg" className="mt-6 w-fit">
                <Link href={secondaryCollection.ctaLink}>{secondaryCollection.ctaText}</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-7">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
