import Link from "next/link";
import { promotionalBanner } from "@/data/homepage";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function PromotionalBanner() {
  return (
    <section className="bg-white py-8 md:py-12">
      <Container>
        <div className="relative overflow-hidden bg-foreground px-6 py-12 text-center md:px-16 md:py-16">
          <div className="absolute left-0 top-0 h-full w-1.5 bg-accent" />
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Offer</p>
          <h2 className="font-display mt-3 text-4xl text-white md:text-6xl">{promotionalBanner.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/75">{promotionalBanner.description}</p>
          <Button asChild size="lg" className="mt-8">
            <Link href={promotionalBanner.buttonLink}>{promotionalBanner.buttonText}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
