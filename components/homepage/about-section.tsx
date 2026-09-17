import Image from "next/image";
import Link from "next/link";
import { aboutSection } from "@/data/homepage";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section className="bg-background py-14 md:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[4/3]">
            <Image
              src={aboutSection.image}
              alt={aboutSection.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">The approach</p>
            <h2 className="font-display mt-3 text-4xl md:text-5xl">{aboutSection.title}</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{aboutSection.description}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {aboutSection.checklist.map((item) => (
                <li key={item} className="border-l-2 border-accent pl-4 text-sm text-foreground">
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" variant="outline" className="mt-8">
              <Link href={aboutSection.buttonLink}>{aboutSection.buttonText}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
