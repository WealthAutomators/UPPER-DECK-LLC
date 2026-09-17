import { company } from "@/data/company";
import { testimonials } from "@/data/testimonials";
import { PageHero, PageSection } from "@/components/ui/page-layout";
import { Container } from "@/components/ui/container";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={`About ${company.displayName}`}
        description={company.description}
        breadcrumbs={[{ label: "About" }]}
      />

      <Container className="pb-16">
        <div className="grid items-center gap-10 py-12 md:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src="/banners/about.jpg" alt={`About ${company.displayName}`} fill className="object-cover" sizes="50vw" />
          </div>
          <PageSection title="The approach">
            <p>
              UPPER DECK is a modern retail philosophy: movement first, utility always, and design
              that doesn&apos;t get in the way. The catalog covers training, outdoor days, travel,
              and everyday carry so the same store can kit a weekday session and a weekend trail.
            </p>
            <p className="mt-4">
              We don&apos;t chase every category. We focus on gear that earns a place in a bag —
              layers that work, packs that organize, and tools that hold up to regular use.
            </p>
          </PageSection>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Movement", desc: "Apparel and footwear cut for training, travel, and daily miles." },
            { title: "Utility", desc: "Packs, bottles, and carry pieces that stay organized under load." },
            { title: "Performance", desc: "Training tools and session kit without the gym-bro noise." },
            { title: "Design", desc: "Clean silhouettes, strong contrast, and no extra branding." },
          ].map(({ title, desc }) => (
            <div key={title} className="border border-border bg-white p-6">
              <h3 className="font-display text-xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <PageSection title="What customers say" className="mt-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {testimonials.map((t) => (
              <div key={t.id} className="border border-border bg-white p-6">
                <StarRating rating={t.rating} showCount={false} size="md" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
                <p className="mt-4 text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            ))}
          </div>
        </PageSection>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/shop">Shop the Gear</Link>
          </Button>
        </div>
      </Container>
    </>
  );
}
