"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { editorialFeature } from "@/data/homepage";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function EditorialFeature() {
  return (
    <section className="bg-foreground py-14 text-white md:py-20">
      <Container>
        <div className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          <motion.div
            className="relative min-h-[420px] overflow-hidden lg:col-span-7 lg:min-h-[640px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={editorialFeature.image}
              alt={editorialFeature.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </motion.div>

          <div className="flex flex-col justify-between gap-6 lg:col-span-5">
            <div className="flex flex-1 flex-col justify-center bg-graphite px-6 py-10 md:px-10">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">{editorialFeature.eyebrow}</p>
              <h2 className="font-display mt-4 text-4xl leading-none md:text-5xl">{editorialFeature.title}</h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
                {editorialFeature.description}
              </p>
              <Button asChild size="lg" className="mt-8 w-fit">
                <Link href={editorialFeature.ctaLink}>{editorialFeature.ctaText}</Link>
              </Button>
            </div>
            <div className="relative min-h-[220px] overflow-hidden lg:min-h-[240px]">
              <Image
                src={editorialFeature.secondaryImage}
                alt="Outdoor performance gear"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
